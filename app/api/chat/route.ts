import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages, generateObject } from 'ai';
import { z } from 'zod';
import { createLead } from '@/lib/airtable';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export const maxDuration = 30;

const SYSTEM_PROMPT = `Tu es Lucio, l'agent conversationnel d'Hoptisens, une agence d'automatisation et d'IA générative.
Ton but est d'accueillir les visiteurs, d'un ton chaleureux et léger, avec une légère pointe d'humour, et surtout de comprendre leurs besoins et de qualifier leur profil.
Guide la conversation avec ces questions séquentielles (pose-les l'une après l'autre, pas toutes en même temps) :
1. Quel est le secteur d'activité de votre entreprise et votre rôle ? (Essaye aussi d'obtenir le nom de la société)
2. Quels sont les principaux processus que vous trouvez chronophages ou répétitifs aujourd'hui ?
3. Avez-vous déjà essayé d'intégrer des outils d'automatisation ou de l'IA (comme Make ou ChatGPT) dans votre quotidien ?
4. Quel serait le bénéfice attendu pour vous si ces processus étaient optimisés ?

Une fois ces informations recueillies, propose une recommandation parmi nos 5 profils types (ex: besoin de Lead Gen, besoin d'un Sprint IA, etc.) et demande poliment leurs coordonnées (Prénom, Nom et Email) pour qu'un expert Hoptisens prenne le relais.
Garde un ton bienveillant et concis.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
    }

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      temperature: 0.7,
      onFinish: async ({ text, usage }) => {
        // Extraction logic triggered after the response is generated
        try {
          // Comprehensive transcription
          const transcription = messages
            .map((m: any) => `${m.role === 'user' ? 'Client' : 'Lucio'}: ${m.content}`)
            .join('\n') + `\nLucio: ${text}`;

          // Check if we have an email in the last few messages to avoid redundant extractions
          const hasEmail = transcription.toLowerCase().match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/);

          if (hasEmail) {
            console.log('Lead detected, extracting data...');
            const { object: leadInfo } = await generateObject({
              model: google('gemini-2.5-flash'),
              schema: z.object({
                firstName: z.string(),
                lastName: z.string().optional(),
                email: z.string().email(),
                companyName: z.string().optional(),
                mainQuestion: z.string().optional(),
              }),
              prompt: `Extrais les informations suivantes de cette transcription de chat pour remplir un CRM. 
              Si une information est manquante, laisse-la vide ou null (sauf l'email).
              
              Transcription:
              ${transcription}`,
            });

            if (leadInfo.email) {
              await createLead({
                firstName: leadInfo.firstName,
                lastName: leadInfo.lastName,
                email: leadInfo.email,
                company: leadInfo.companyName,
                questions: leadInfo.mainQuestion,
                transcription: transcription
              });
              console.log('Lead successfully saved to Airtable:', leadInfo.email);
            }
          }
        } catch (error) {
          console.error('Error during lead extraction/saving:', error);
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
