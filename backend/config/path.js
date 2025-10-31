import path from 'path';
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const projectRoot = path.resolve(__dirname, '../../');
const collectionsPath = path.resolve(
  projectRoot,
  process.env.COLLECTIONS_PATH || "backend/assets/collections"
);

export const PATHS = {
  root: projectRoot,
  collections: collectionsPath,
};
