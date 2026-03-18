import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { DiagnosticInputSchema, DiagnosticResultSchema } from '@/lib/diagnostic/types';
import type { DiagnosticInput, DiagnosticResult } from '@/lib/diagnostic/types';
import { buildPrompt } from '@/lib/diagnostic/prompt';
import { getFallbackResult } from '@/lib/diagnostic/fallback';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export const maxDuration = 15;

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: 'Trop de diagnostics effectués. Réessayez dans une heure.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate input
    const parsed = DiagnosticInputSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: 'Données invalides', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const input: DiagnosticInput = parsed.data;

    let result: DiagnosticResult;

    try {
      const { system, user } = buildPrompt(input);

      const { object } = await generateObject({
        model: google('gemini-2.5-flash'),
        schema: DiagnosticResultSchema,
        system,
        prompt: user,
        temperature: 0.7,
      });

      result = object;
    } catch (aiError) {
      console.error('AI generation failed, using fallback:', aiError);
      result = getFallbackResult(input);
    }

    return Response.json(result);
  } catch (error) {
    console.error('Diagnostic API error:', error);
    return Response.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
