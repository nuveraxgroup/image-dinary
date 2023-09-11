import { logger } from "firebase-functions";

export const tempOriginalFileDeleted = (path: string) => {
    logger.log(`Deleted temporary original file: '${path}'`);
};

export const errorDeleting = (err: Error) => {
    logger.warn("Error when deleting files", err);
};

export const error = (err: Error) => {
    logger.error("Error when modify image", err);
};

export const createdTempDir = (dir: string) => {
    logger.log("Created temporal directory", dir);
};
export const downloadingFile = (filePath: string) => {
    logger.log("Start file download", filePath);
};
export const downloadedOriginalFileAt = (dir: string) => {
    logger.log("Downloaded original file at location", dir);
};
export const imageChanges = (change: string) => {
    logger.log(`Changes made to image:`, change);
};
