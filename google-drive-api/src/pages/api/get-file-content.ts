import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import xlsx from 'xlsx'; // To parse Excel files
import { GaxiosPromise } from 'gaxios';
import { Readable } from 'stream';

const CLIENT_ID = process.env.PUBLIC_NEXT_CLIENT_ID;
const CLIENT_SECRET = process.env.PUBLIC_NEXT_CLIENT_SECRET;
const REDIRECT_URI = process.env.PUBLIC_NEXT_REDIRECT_URI;

const REFRESH_TOKEN = process.env.PUBLIC_NEXT_REFRESH_TOKEN;

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
    const { folderName, fileName } = req.query; // folderName: uname, fileName: project1.xlsx

    try {
        // First, find the folder ID for the given folderName
        const folderResult = await drive.files.list({
            q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
            fields: 'files(id)',
        });

        const folderFiles = folderResult?.data?.files;
        if (!folderFiles || folderFiles.length === 0) {
            return res.status(404).json({ error: 'Folder not found' });
        }

        const folderId = folderFiles[0]?.id;

        // Find the file ID for the given Excel file (e.g., project1.xlsx)
        const fileResult = await drive.files.list({
            q: `name = '${fileName}' and '${folderId}' in parents`,
            fields: 'files(id, name)',
        });

        const fileFiles = fileResult?.data?.files;
        if (!fileFiles || fileFiles.length === 0) {
            return res.status(404).json({ error: 'File not found' });
        }

        const fileId = fileFiles[0]?.id;
        if (!fileId) return res.status(404).json({ error: 'File not found' });
        // Get the file content (as stream)
        const file = await drive.files.get(
            { fileId, alt: 'media' },
            { responseType: 'stream' } // Ensure we use 'stream' here
        );

        // Convert the stream data into a buffer
        const fileBuffer = await streamToBuffer(file.data as Readable);

        // Now we can use xlsx to read the buffer
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve file content' });
    }
}

// Helper function to convert stream to buffer
async function streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: any[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}
