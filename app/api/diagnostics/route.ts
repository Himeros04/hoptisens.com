import { createDiagnostic, updateDiagnostic, type DiagnosticData } from '@/lib/airtable';
import { z } from 'zod';

const DiagnosticCreateSchema = z.object({
  tempId: z.string().min(1),
  currentStep: z.number().min(1).max(5),
  role: z.string().optional(),
  roleOther: z.string().optional(),
  sector: z.string().optional(),
  sectorOther: z.string().optional(),
  companySize: z.string().optional(),
  department: z.string().optional(),
  startTime: z.string().optional(),
});

const DiagnosticUpdateSchema = z.object({
  tempId: z.string().min(1),
  currentStep: z.number().min(1).max(5).optional(),
  role: z.string().optional(),
  roleOther: z.string().optional(),
  sector: z.string().optional(),
  sectorOther: z.string().optional(),
  companySize: z.string().optional(),
  department: z.string().optional(),
  tools: z.array(z.string()).optional(),
  toolsOther: z.string().optional(),
  painPoints: z.array(z.string()).optional(),
  priorityPainPoint: z.string().optional(),
  painPointDescription: z.string().optional(),
  maturity: z.string().optional(),
  timeHorizon: z.string().optional(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  company: z.string().optional(),
  results: z.string().optional(),
  recommendedEntry: z.string().optional(),
  status: z.string().optional(),
  endTime: z.string().optional(),
  durationSeconds: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = DiagnosticCreateSchema.safeParse(body);
    
    if (!parsed.success) {
      return Response.json(
        { error: 'Données invalides', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data: DiagnosticData = {
      ...parsed.data,
      startTime: parsed.data.startTime || new Date().toISOString(),
      status: 'En cours',
    };

    console.log('Creating diagnostic with data:', JSON.stringify(data));

    const recordId = await createDiagnostic(data);

    if (!recordId) {
      return Response.json(
        { error: 'Erreur lors de la création du diagnostic' },
        { status: 500 }
      );
    }

    return Response.json({ success: true, tempId: parsed.data.tempId });
  } catch (error) {
    console.error('Diagnostic create error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { error: `Erreur: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const parsed = DiagnosticUpdateSchema.safeParse(body);
    
    if (!parsed.success) {
      return Response.json(
        { error: 'Données invalides', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await updateDiagnostic(parsed.data.tempId, parsed.data);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Diagnostic update error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { error: `Erreur: ${errorMessage}` },
      { status: 500 }
    );
  }
}