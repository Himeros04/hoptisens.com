import Airtable from 'airtable';

if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
  throw new Error('Missing required Airtable env vars: AIRTABLE_API_KEY and AIRTABLE_BASE_ID');
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export const prospectsTable = base(process.env.AIRTABLE_TABLE_NAME || 'INPUTS');
export const diagnosticsTable = base(process.env.AIRTABLE_DIAGNOSTICS_TABLE || 'Diagnostics');

interface AirtableFields {
  [key: string]: string | number | boolean | readonly string[] | undefined;
  'First Name': string;
  'Last Name': string;
  'Email': string;
  'Company': string;
  'Status': string;
  'Source': 'Lucio' | 'Forms' | 'AutoDiag';
  'Questions'?: string;
  'Transcription'?: string;
  'Message'?: string;
  'Categorie'?: string[];
}

export interface ProspectData {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  questions?: string;
  transcription?: string;
  categorie?: string[];
  message?: string;
  source: 'Lucio' | 'Forms' | 'AutoDiag';
  chatId?: string;
}

function buildFields(data: ProspectData): AirtableFields {
  const fields: AirtableFields = {
    'First Name': data.firstName || '',
    'Last Name': data.lastName || '',
    'Email': data.email || '',
    'Company': data.company || '',
    'Status': 'New',
    'Source': data.source,
  };
  if (data.questions) fields['Questions'] = data.questions;
  if (data.transcription) fields['Transcription'] = data.transcription;
  if (data.message) fields['Message'] = data.message;
  if (data.categorie && data.categorie.length > 0) {
    fields['Categorie'] = data.categorie;
  }
  return fields;
}

export async function createLead(data: ProspectData) {
  try {
    const record = await prospectsTable.create([{ fields: buildFields(data) }]);
    return record;
  } catch (error) {
    console.error('Error creating Airtable lead:', error);
    throw error;
  }
}

export async function updateLead(recordId: string, data: Partial<ProspectData>) {
  try {
    const fields: Partial<AirtableFields> = {};
    if (data.firstName) fields['First Name'] = data.firstName;
    if (data.lastName) fields['Last Name'] = data.lastName;
    if (data.email) fields['Email'] = data.email;
    if (data.company) fields['Company'] = data.company;
    if (data.questions) fields['Questions'] = data.questions;
    if (data.transcription) fields['Transcription'] = data.transcription;
    if (data.message) fields['Message'] = data.message;
    if (data.categorie && data.categorie.length > 0) {
      fields['Categorie'] = data.categorie;
    }
    const record = await prospectsTable.update([{ id: recordId, fields }]);
    return record;
  } catch (error) {
    console.error('Error updating Airtable lead:', error);
    throw error;
  }
}

// === DIAGNOSTICS TABLE =====================================================

interface DiagnosticFields {
  [key: string]: string | number | boolean | readonly string[] | undefined;
  'ID temporaire': string;
  'Statut': 'En cours' | 'Terminé' | 'Abandonné';
  'Source': 'AutoDiag';
  'Étape actuelle'?: string;
  'Date début'?: string;
  'Rôle'?: string;
  'Rôle (autre)'?: string;
  'Secteur'?: string;
  'Secteur (autre)'?: string;
  'Taille entreprise'?: string;
  'Département'?: string;
  'Outils'?: readonly string[];
  'Autres outils'?: string;
  'Processus'?: readonly string[];
  'Processus prioritaire'?: string;
  'Description processus'?: string;
  'Maturité IA'?: string;
  'Horizon temporel'?: string;
  'Email'?: string;
  'Prénom'?: string;
  'Entreprise'?: string;
  'Résultats du diagnostic'?: string;
  'Point d\'entrée recommandé'?: string;
  'Date fin'?: string;
  'Durée (secondes)'?: number;
}

export interface DiagnosticData {
  tempId: string;
  currentStep: number;
  role?: string;
  roleOther?: string;
  sector?: string;
  sectorOther?: string;
  companySize?: string;
  department?: string;
  tools?: string[];
  toolsOther?: string;
  painPoints?: string[];
  priorityPainPoint?: string;
  painPointDescription?: string;
  maturity?: string;
  timeHorizon?: string;
  email?: string;
  firstName?: string;
  company?: string;
  results?: string;
  recommendedEntry?: string;
  status?: string;
  startTime?: string;
  endTime?: string;
  durationSeconds?: number;
}

export async function createDiagnostic(data: DiagnosticData): Promise<string | null> {
  try {
    const fields: DiagnosticFields = {
      'ID temporaire': data.tempId,
      'Statut': (data.status || 'En cours') as 'En cours' | 'Terminé' | 'Abandonné',
      'Source': 'AutoDiag',
    };
    
    if (data.currentStep) (fields as Record<string, unknown>)['Étape actuelle'] = String(data.currentStep);
    if (data.role) fields['Rôle'] = data.role;
    if (data.roleOther) fields['Rôle (autre)'] = data.roleOther;
    if (data.sector) fields['Secteur'] = data.sector;
    if (data.sectorOther) fields['Secteur (autre)'] = data.sectorOther;
    if (data.companySize) fields['Taille entreprise'] = data.companySize;
    if (data.department) fields['Département'] = data.department;
    
    console.log('Creating with fields:', JSON.stringify(fields, null, 2));
    
    const record = await diagnosticsTable.create([{ fields } as never]);
    return record[0]?.id || null;
  } catch (error) {
    console.error('Error creating diagnostic:', error);
    const errMsg = error instanceof Error ? error.message : JSON.stringify(error);
    throw new Error(`Airtable error: ${errMsg}`);
  }
}

export async function updateDiagnostic(tempId: string, data: Partial<DiagnosticData>): Promise<boolean> {
  try {
    console.log('Update diagnostic called with tempId:', tempId);
    
    const fields: Record<string, unknown> = {};
    
    if (data.currentStep !== undefined) fields['Étape actuelle'] = String(data.currentStep);
    if (data.status) fields['Statut'] = data.status as 'En cours' | 'Terminé' | 'Abandonné';
    if (data.role) fields['Rôle'] = data.role;
    if (data.roleOther) fields['Rôle (autre)'] = data.roleOther;
    if (data.sector) fields['Secteur'] = data.sector;
    if (data.sectorOther) fields['Secteur (autre)'] = data.sectorOther;
    if (data.companySize) fields['Taille entreprise'] = data.companySize;
    if (data.department) fields['Département'] = data.department;
    if (data.tools && data.tools.length > 0) fields['Outils'] = data.tools.join(', ');
    if (data.toolsOther) fields['Autres outils'] = data.toolsOther;
    if (data.painPoints && data.painPoints.length > 0) fields['Processus'] = data.painPoints.join(', ');
    if (data.priorityPainPoint) fields['Processus prioritaire'] = data.priorityPainPoint;
    if (data.painPointDescription) fields['Description processus'] = data.painPointDescription;
    if (data.maturity) fields['Maturité IA'] = data.maturity;
    if (data.timeHorizon) fields['Horizon temporel'] = data.timeHorizon;
    if (data.email) fields['Email'] = data.email;
    if (data.firstName) fields['Prénom'] = data.firstName;
    if (data.company) fields['Entreprise'] = data.company;
    if (data.durationSeconds !== undefined) fields['Durée (secondes)'] = data.durationSeconds;

    console.log('Looking for record with tempId:', tempId);
    
    // Find record by temp ID
    const records = await diagnosticsTable.select({
      filterByFormula: `{ID temporaire} = '${tempId}'`,
      maxRecords: 1,
    }).firstPage();

    console.log('Found records:', records.length);

    if (records.length === 0) {
      console.warn('Diagnostic not found for update:', tempId);
      return false;
    }

    console.log('Updating record:', records[0].id, 'with fields:', JSON.stringify(fields));
    
    await diagnosticsTable.update([{ id: records[0].id, fields } as never]);
    console.log('Update successful');
    return true;
  } catch (error) {
    console.error('Error updating diagnostic:', error);
    const errMsg = error instanceof Error ? error.message : JSON.stringify(error);
    throw new Error(`Airtable update error: ${errMsg}`);
  }
}
