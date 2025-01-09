import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import xlsx from 'xlsx'; // To parse Excel files
import { Readable } from 'stream';
const CLIENT_ID = process.env.PUBLIC_NEXT_CLIENT_ID;
const CLIENT_SECRET = process.env.PUBLIC_NEXT_CLIENT_SECRET;
const REDIRECT_URI = process.env.PUBLIC_NEXT_REDIRECT_URI;
const REFRESH_TOKEN = process.env.PUBLIC_NEXT_REFRESH_TOKEN;
interface Project {
    heading: string;
    description: string;
    category: string;
    image: string
}
interface Quality {
    heading: string;
    description: string;
    image: string
}
interface HeroSection {
    heading: string;
    description: string;
    image: string
}
interface AboutMeSection {
    heading: string;
    description1: string;
    description2: string;
    quote: string;
    images: string[]
}
interface Portfoliosection {
    heading: string;
    description: string;
}
interface HiringSection {
    heading: string;
    description: string;
}
interface PortFolioData {
    "HeroSection": HeroSection;
    "AboutMeSection": AboutMeSection;
    "Portfoliosection": Portfoliosection;
    "ProjectArray": Project[];
    "HiringSection": HiringSection;
    "QualityArray": Quality[]
}
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
        const { id } = req.query;
        const FOLDER_ID = id;
        const response = await drive.files.list({
            q: `'${FOLDER_ID}' in parents and (name contains 'mainpage' and (mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' or mimeType='application/vnd.google-apps.spreadsheet'))`,
            fields: 'files(id, name,mimeType)',
        });

        const files = response.data.files;

        if (files && files.length === 1) {
            const file = files[0];
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
            }
            else {
                return res.status(400).json({ error: 'Unsupported file type' });
            }

            // Now we can use xlsx to read the buffer for both cases
            const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const data: (string | number)[][] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
            const filteredData = data.slice(0, 36);
            const portfolioData: PortFolioData = {
                HeroSection: {
                    heading: String(filteredData[0][0]),
                    description: String(filteredData[1][0]),
                    image: String(filteredData[2][0]),
                },
                AboutMeSection: {
                    heading: String(filteredData[3][0]),
                    description1: String(filteredData[4][0]),
                    description2: String(filteredData[5][0]),
                    quote: String(filteredData[6][0]),
                    images: [String(filteredData[7][0]), String(filteredData[8][0]), String(filteredData[9][0]), String(filteredData[10][0])],
                },
                Portfoliosection: {
                    heading: String(filteredData[11][0]),
                    description: String(filteredData[12][0]),
                },
                ProjectArray: [
                    {
                        heading: String(filteredData[13][0]),
                        description: String(filteredData[14][0]),
                        category: String(filteredData[15][0]),
                        image: String(filteredData[16][0]),
                    },
                    {
                        heading: String(filteredData[17][0]),
                        description: String(filteredData[18][0]),
                        category: String(filteredData[19][0]),
                        image: String(filteredData[20][0]),
                    },
                    {
                        heading: String(filteredData[21][0]),
                        description: String(filteredData[22][0]),
                        category: String(filteredData[23][0]),
                        image: String(filteredData[24][0]),
                    },
                ],
                HiringSection: {
                    heading: String(filteredData[25][0]),
                    description: String(filteredData[26][0]),
                },
                QualityArray: [
                    {
                        heading: String(filteredData[27][0]),
                        description: String(filteredData[28][0]),
                        image: String(filteredData[29][0]),
                    },
                    {
                        heading: String(filteredData[30][0]),
                        description: String(filteredData[31][0]),
                        image: String(filteredData[32][0]),
                    },
                    {
                        heading: String(filteredData[33][0]),
                        description: String(filteredData[34][0]),
                        image: String(filteredData[35][0]),
                    },
                ],
            };
            res.status(200).json(portfolioData);
        } else if (files && files.length > 1) {
            // Handle the case where multiple files are found
            res.status(400).json({ message: 'More than one file found matching the criteria.(multiple mainpage)' });
        } else {
            // No files found
            res.status(404).json({ message: 'No files found ending with "mainpage".' });
        }
    } catch (error: unknown) {
        // Handle errors safely
        if (error instanceof Error) {
            res.status(500).json({ error: `Failed to retrieve file: ${error.message}` });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
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

