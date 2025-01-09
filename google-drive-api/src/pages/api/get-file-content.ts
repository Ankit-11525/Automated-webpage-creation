import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import xlsx from 'xlsx'; // To parse Excel files
import { Readable } from 'stream';
type Section = {
    heading: string;
    subheading: string;
    description: string;
    images: string[];
};
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
interface RowData {
    heading: string;
    description: string;
    images: string[];
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { folderName, fileName } = req.query;

    try {
        const folderResult = await drive.files.list({
            q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
            fields: 'files(id)',
        });

        const folderFiles = folderResult?.data?.files;
        if (!folderFiles || folderFiles.length === 0) {
            return res.status(404).json({ error: 'Folder not found' });
        }

        const folderId = folderFiles[0]?.id;

        // Find the file ID for the given Excel file (e.g., project1.xlsx or Google Sheets)
        const fileResult = await drive.files.list({
            q: `name = '${fileName}' and '${folderId}' in parents`,
            fields: 'files(id, name, mimeType)',
        });

        const fileFiles = fileResult?.data?.files;
        if (!fileFiles || fileFiles.length === 0) {
            return res.status(404).json({ error: 'File not found' });
        }

        const file = fileFiles[0];
        const fileId = file?.id;
        if (!fileId) return res.status(404).json({ error: 'File not found' });

        // Check the MIME type to handle Google Sheets or .xlsx files
        let fileBuffer: Buffer;
        if (file.mimeType === 'application/vnd.google-apps.spreadsheet') {
            // If it's a Google Sheet, export it as .xlsx
            const exportResult = await drive.files.export(
                { fileId, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
                { responseType: 'arraybuffer' }
            );
            fileBuffer = Buffer.from(new Uint8Array(exportResult.data as ArrayBuffer));
        } else if (file.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // If it's a .xlsx file, download it as stream
            const fileStream = await drive.files.get(
                { fileId, alt: 'media' },
                { responseType: 'stream' }
            );
            fileBuffer = await streamToBuffer(fileStream.data as Readable);
        } else {
            return res.status(400).json({ error: 'Unsupported file type' });
        }

        // Now we can use xlsx to read the buffer for both cases
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const data: (string | number)[][] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        const filteredData = data.filter((row: (string | number)[]) => row.length > 0);
        const arrtojson: RowData[] = [];
        // Transpose the row-wise data into column-wise data
        const columnWiseData: (string | number)[][] = filteredData[0].map((_, colIndex) =>
            filteredData.map(row => row[colIndex])
        );
        filteredData.map((row: (string | number)[]) => {
            const heading = row[0] as string;
            const description = row[1] as string;
            const images = row.slice(2).map(item => item as string);
            arrtojson.push({
                heading,
                description,
                images,
            });
        });
        const transformResponse = (data: (string | number)[][]): Section[] => {
            return data.map(row => ({
                heading: row[1] as string,
                subheading: row[0] as string,
                description: row[2] as string,
                images: row.slice(3, 7).filter(Boolean) as string[] // Only include non-undefined image URLs
            }));
        };

        const transformedData = transformResponse(columnWiseData);
        res.status(200).json(transformedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve file content' });
    }
}

// Helper function to convert stream to buffer
async function streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk: Buffer) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}
