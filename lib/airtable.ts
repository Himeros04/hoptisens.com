import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY || 'missing' }).base(
  process.env.AIRTABLE_BASE_ID || 'missing'
);

export const prospectsTable = base(process.env.AIRTABLE_TABLE_NAME || 'Prospects');

export interface ProspectData {
  firstName: string;
  lastName?: string;
  email: string;
  company?: string;
  questions?: string;
  transcription?: string;
  categorie?: string[];
  message?: string;
  source: 'Lucio' | 'Forms';
}

export async function createLead(data: ProspectData) {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    throw new Error('Missing Airtable configuration (AIRTABLE_API_KEY or AIRTABLE_BASE_ID).');
  }
  try {
    const fields: any = {
      'First Name': data.firstName,
      'Last Name': data.lastName || '',
      'Email': data.email,
      'Company': data.company || '',
      'Status': 'New',
      'Source': data.source,
    };

    if (data.questions) fields['Questions'] = data.questions;
    if (data.transcription) fields['Transcription'] = data.transcription;
    if (data.message) fields['Message'] = data.message;
    if (data.categorie && data.categorie.length > 0) {
      fields['Categorie'] = data.categorie; // Airtable handles array for multi-select
    }

    const record = await prospectsTable.create([
      {
        fields: fields,
      },
    ]);
    return record;
  } catch (error) {
    console.error('Error creating Airtable lead:', error);
    throw error;
  }
}
