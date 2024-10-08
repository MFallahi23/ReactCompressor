import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "url";
import compressOneImage from "./compressOneImage.js";
import deleteAllCompressedFiles from "./deleteCompressed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compressImages = async (userId) => {
  try {
    console.log("CompressImages");
    const downloadDirPath = path.resolve(
      __dirname,
      `../images/downloaded/downloaded${userId}`
    );
    const compressDirPath = path.resolve(
      __dirname,
      `../images/compressed/compressed${userId}`
    );
    await fs.mkdir(compressDirPath, { recursive: true });
    await deleteAllCompressedFiles(userId);
    let sumOriginalSizes = 0;
    let sumOPtimizedSizes = 0;
    let compressionErrors = [];
    for (const file of await fs.readdir(downloadDirPath)) {
      try {
        const { originalSize, optimizedSize, error } = await compressOneImage(
          file,
          downloadDirPath,
          compressDirPath
        );
        sumOriginalSizes += originalSize;
        sumOPtimizedSizes += optimizedSize;
        if (Object.keys(error).length !== 0) {
          compressionErrors.push(error);
        }
      } catch (error) {
        console.error(`Error compressing file ${file}:`, error);
      }
    }
    return [sumOriginalSizes, sumOPtimizedSizes, compressionErrors];
  } catch (error) {
    console.error(error);
  }
};

export default compressImages;
