import path from 'path';
import axios from 'axios';
import { Storage } from '@google-cloud/storage';

import { ImageProcessorOptions } from '../types';
import { UPLOADED_FILES_DEST } from '../app';

interface ImageProcessorRequest extends ImageProcessorOptions {
  inputFileGcs: string;
  outputFileGcs: string;
}

const storage = new Storage();
const bucket = storage.bucket(
  process.env.GOOGLE_CLOUD_STORAGE_BUCKET as string
);

/**
 * Uploads a submitted form file to a Google Cloud Storage bucket.
 * @param file The file to upload.
 * @param destination The directory to upload the file to on the bucket (without the file name).
 * @return The path to the file on the bucket.
 */
export const uploadFileToBucket = async (
  file: Express.Multer.File,
  destination: string
): Promise<string> => {
  const localFile = path.join(UPLOADED_FILES_DEST, file.filename);
  const destinationFile = path.join(destination, file.filename);

  await bucket.upload(localFile, {
    destination: destinationFile,
  });

  return destinationFile;
};

/**
 * Uploads a submitted form file to a Google Cloud Storage bucket and makes it public.
 * @param file The file to upload.
 * @param destination The directory to upload the file to on the bucket (without the file name).
 * @return The public URL to the processed image.
 */
export const uploadFileToBucketAndPublicize = async (
  file: Express.Multer.File,
  destination: string
): Promise<string> => {
  const destinationFile = path.join(destination, file.filename);

  // Upload the file to the bucket
  await uploadFileToBucket(file, destination);

  // Make the uploaded file publicly accessible
  await bucket.file(destinationFile).makePublic();

  // Return file location
  return bucket.file(destinationFile).publicUrl();
};

/**
 * Uploads a submitted form image to Google Cloud Storage, processes it, makes it public, and returns the public GCS URL.
 * @param image The submitted image file to upload and process.
 * @param destination The directory to upload the file to on the bucket (without the file name).
 * @param options The options for the image processor.
 * @return The public URL to the processed image.
 */
export const processImageAndPublicize = async (
  image: Express.Multer.File,
  destination: string,
  options: ImageProcessorOptions
): Promise<string> => {
  const localFile = path.join(UPLOADED_FILES_DEST, image.filename);
  const inputFileGcs = path.join(
    process.env.GCS_IMAGE_PROCESSOR_INPUT_DIR as string,
    image.filename
  );
  const outputFileGcs = path.join(destination, image.filename);

  // Upload local image file to GCS input folder for the function to process
  await bucket.upload(localFile, {
    destination: path.join(inputFileGcs),
  });

  // Process the image via the image processor cloud function
  const imageProcessorOptions: ImageProcessorRequest = {
    inputFileGcs: inputFileGcs,
    outputFileGcs: outputFileGcs,
    ...options,
  };

  // Run the function
  await axios.post(
    process.env.IMAGE_PROCESSOR_ENDPOINT as string,
    imageProcessorOptions
  );

  // Make the processed image publicly accessible
  await bucket.file(outputFileGcs).makePublic();

  // Return banner location in database
  return bucket.file(outputFileGcs).publicUrl();
};
