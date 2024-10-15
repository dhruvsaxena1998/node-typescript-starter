import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve __dirname for ES modules
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
