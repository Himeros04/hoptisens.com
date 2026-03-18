import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages, generateObject } from 'ai';
import { z } from 'zod';
import { createLead, updateLead } from '@/lib/airtable';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export const maxDuration = 30;

// In-memory map: chatId -> Airtable record ID (lives for the duration of the server process)
const chatRecordMap = new Map<string, string>();

const SYSTEM_PROMPT = `Tu es Lucio, l'agent conversationnel d'Hoptisens, une agence d'automatisation et d'IA générative.
Ton but est d'accueillir les visiteurs, d'un ton chaleureux et léger, avec une légère pointe d'humour, et surtout de comprendre leurs besoins et de qualifier leur profil.
Guide la conversation avec ces questions séquentielles (pose-les l'une après l'autre, pas toutes en même temps) :
1. Quel est le secteur d'activité de votre entreprise et votre rôle ? (Essaye aussi d'obtenir le nom de la société)
2. Quels sont les principaux processus que vous trouvez chronophages ou répétitifs aujourd'hui ?
3. Avez-vous déjà essayé d'intégrer des outils d'automatisation ou de l'IA (comme Make ou ChatGPT) dans votre quotidien ?
4. Quel serait le bénéfice attendu pour vous si ces processus étaient optimisés ?

Une fois ces informations recueillies, propose une recommandation parmi nos 5 profils types (ex: besoin de Lead Gen, besoin d'un Sprint IA, etc.) et demande poliment leurs coordonnées (Prénom, Nom et Email) pour qu'un expert Hoptisens prenne le relais.

Après avoir recueilli les coordonnées, propose à l'utilisateur de prendre directement rendez-vous avec Hadrien, le fondateur d'Hoptisens, via ce lien Calendly : https://calendly.com/hadrien-hoptisens/30min
Formule-le de façon naturelle, par exemple : "Si vous souhaitez en discuter directement, vous pouvez réserver un créneau avec Hadrien, notre fondateur : [lien]. Sinon, notre équipe commerciale reviendra vers vous très rapidement pour vous proposer des créneaux."
Inclus toujours le lien complet dans ta réponse pour que l'utilisateur puisse cliquer dessus.
Garde un ton bienveillant et concis.
`;

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
    }

    const modelMessages = await convertToModelMessages(messages);

    // Count user messages to decide when to start extracting
    const userMessageCount = messages.filter((m: any) => m.role === 'user').length;

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      temperature: 0.7,
      onFinish: async ({ text }) => {
        // Start extracting after the first user message
        if (userMessageCount < 1 || !chatId) return;

        try {
          const transcription = messages
            .map((m: any) => {
              const t = m.parts?.find((p: any) => p.type === 'text')?.text ?? m.content ?? '';
              return `${m.role === 'user' ? 'Client' : 'Lucio'}: ${t}`;
            })
            .join('\n') + `\nLucio: ${text}`;

          const { object: leadInfo } = await generateObject({
            model: google('gemini-2.5-flash'),
            schema: z.object({
              firstName: z.string().optional(),
              lastName: z.string().optional(),
              email: z.string().optional(),
              companyName: z.string().optional(),
              sector: z.string().optional(),
              mainQuestion: z.string().optional(),
            }),
            prompt: `Extrais les informations du prospect à partir de cette transcription de chat.
Retourne UNIQUEMENT les informations explicitement mentionnées par le client (pas par Lucio).
Si une information n'a pas été mentionnée, retourne null pour ce champ.

Transcription:
${transcription}`,
          });

          const existingRecordId = chatRecordMap.get(chatId);

          if (existingRecordId) {
            // Update existing record with new info
            await updateLead(existingRecordId, {
              firstName: leadInfo.firstName,
              lastName: leadInfo.lastName,
              email: leadInfo.email,
              company: leadInfo.companyName,
              questions: [leadInfo.sector, leadInfo.mainQuestion].filter(Boolean).join(' | '),
              transcription,
              source: 'Lucio',
            });
            console.log(`[Lucio] Updated lead ${existingRecordId} (session ${chatId})`);
          } else {
            // Create new record
            const record = await createLead({
              firstName: leadInfo.firstName,
              lastName: leadInfo.lastName,
              email: leadInfo.email,
              company: leadInfo.companyName,
              questions: [leadInfo.sector, leadInfo.mainQuestion].filter(Boolean).join(' | '),
              transcription,
              source: 'Lucio',
            });
            // Store the record ID for future updates
            const recordId = (record as any)?.[0]?.id;
            if (recordId) {
              chatRecordMap.set(chatId, recordId);
              console.log(`[Lucio] Created lead ${recordId} (session ${chatId})`);
            }
          }
        } catch (error) {
          console.error('Error during progressive lead extraction:', error);
        }
      },
      onError: ({ error }) => {
        console.error('streamText error:', error);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat request", details: String(error) }), { status: 500 });
  }
}
