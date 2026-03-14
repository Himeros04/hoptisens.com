import Airtable from 'airtable';

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('Missing AIRTABLE_API_KEY');
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('Missing AIRTABLE_BASE_ID');
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export const prospectsTable = base(process.env.AIRTABLE_TABLE_NAME || 'Prospects');

export interface ProspectData {
  firstName: string;
  lastName?: string;
  email: string;
  company?: string;
  questions?: string;
  transcription: string;
}

export async function createLead(data: ProspectData) {
  try {
    const record = await prospectsTable.create([
      {
        fields: {
          'First Name': data.firstName,
          'Last Name': data.lastName || '',
          'Email': data.email,
          'Company': data.company || '',
          'Questions': data.questions || '',
          'Transcription': data.transcription,
          'Status': 'New',
        },
      },
    ]);
    return record;
  } catch (error) {
    console.error('Error creating Airtable lead:', error);
    throw error;
  }
}
