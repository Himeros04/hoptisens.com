import Airtable from 'airtable';

if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
  throw new Error('Missing required Airtable env vars: AIRTABLE_API_KEY and AIRTABLE_BASE_ID');
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export const prospectsTable = base(process.env.AIRTABLE_TABLE_NAME || 'Prospects');

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
