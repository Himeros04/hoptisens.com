import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { DiagnosticInputSchema, DiagnosticResultSchema } from '@/lib/diagnostic/types';
import type { DiagnosticInput, DiagnosticResult } from '@/lib/diagnostic/types';
import { buildPrompt } from '@/lib/diagnostic/prompt';
import { getFallbackResult } from '@/lib/diagnostic/fallback';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export const maxDuration = 10;

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
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: 'Trop de diagnostics effectués. Réessayez dans une heure.' },
        { status: 429 }
      );
    }

    const body = await req.json();

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

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);

      try {
        const { object } = await generateObject({
          model: google('gemini-2.5-flash'),
          schema: DiagnosticResultSchema,
          system,
          prompt: user,
          temperature: 0.7,
          abortSignal: controller.signal,
        });
        clearTimeout(timer);
        result = object;
      } catch (aiError) {
        clearTimeout(timer);
        console.error('AI generation failed, using fallback:', aiError instanceof Error ? aiError.message : aiError);
        result = getFallbackResult(input);
      }
    } catch (outerError) {
      console.error('Diagnostic processing error:', outerError instanceof Error ? outerError.message : outerError);
      result = getFallbackResult(input);
    }

    return Response.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Diagnostic API error:', errorMessage);
    return Response.json(
      { error: 'Erreur interne du serveur', details: errorMessage },
      { status: 500 }
    );
  }
}
