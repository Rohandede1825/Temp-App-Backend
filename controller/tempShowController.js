import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

    // Read and parse the JSON file
    const fileContent = await readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Validate JSON structure
    if (!data.temperatures || !Array.isArray(data.temperatures)) {
      return res.status(400).json({ message: 'Invalid JSON format. Expected { "temperatures": [...] }' });
    }

    res.status(200).json({ temperatures: data.temperatures });
  } catch (error) {
    res.status(500).json({ message: 'Error processing file', error });
  }
};
