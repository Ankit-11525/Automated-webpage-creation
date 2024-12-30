import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

const CLIENT_ID = process.env.PUBLIC_NEXT_CLIENT_ID;
const CLIENT_SECRET = process.env.PUBLIC_NEXT_CLIENT_SECRET;
const REDIRECT_URI = process.env.PUBLIC_NEXT_REDIRECT_URI;

const REFRESH_TOKEN = process.env.PUBLIC_NEXT_REFRESH_TOKEN;
const FOLDER_ID=process.env.PUBLIC_NEXT_FOLDER_ID;
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {id} = req.query; 
    console.log("folderId : ",id)
    const result = await drive.files.list({
      q: `'${id}' in parents and mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'`,
      fields: 'files(id, name)',
    });
    

    res.status(200).json(result.data.files);
  } catch (error) {
    res.status(500).json({ error: `Failed to list files ${error}` });
  }
}
