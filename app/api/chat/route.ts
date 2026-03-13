import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SYSTEM_PROMPT = `Tu es Lucio, l'agent conversationnel d'Hoptisens, une agence d'automatisation et d'IA générative.
Ton but est d'accueillir les visiteurs, d'un ton chaleureux et léger, avec une légère pointe d'humour, et surtout de comprendre leurs besoins et de qualifier leur profil.
Guide la conversation avec ces 4 questions séquentielles (pose-les l'une après l'autre, pas toutes en même temps) :
1. Quel est le secteur d'activité de votre entreprise et votre rôle ?
2. Quels sont les principaux processus que vous trouvez chronophages ou répétitifs aujourd'hui ?
3. Avez-vous déjà essayé d'intégrer des outils d'automatisation ou de l'IA (comme Make ou ChatGPT) dans votre quotidien ?
4. Quel serait le bénéfice attendu pour vous si ces processus étaient optimisés ?

Une fois ces informations recueillies, propose une recommandation parmi nos 5 profils types (ex: besoin de Lead Gen, besoin d'un Sprint IA, etc.) et demande poliment leurs coordonnées (email) pour qu'un expert Hoptisens prenne le relais.
Garde un ton bienveillant et concis.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('models/gemini-2.5-flash'),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), { status: 500 });
  }
}
