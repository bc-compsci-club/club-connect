import fs from 'fs';
import { v4 as uuid } from 'uuid';
import Multer from 'multer';

import { UPLOADED_FILES_DEST } from '../app';

// Options for saving uploaded files to the server
export const multerImageOptions: Multer.DiskStorageOptions = {
  destination: (req, file, cb) => {
    // Create destination folder if it doesn't exist
    if (!fs.existsSync(UPLOADED_FILES_DEST)) {
      fs.mkdirSync(UPLOADED_FILES_DEST);
    }

    cb(null, UPLOADED_FILES_DEST);
  },
  filename: (req, file, cb) => {
    let fileExtension: '.jpg' | '.png' | '';
    switch (file.mimetype) {
      case 'image/jpeg':
        fileExtension = '.jpg';
        break;
      case 'image/png':
        fileExtension = '.png';
        break;
      default:
        fileExtension = '';
    }

    const constructedFileName = file.fieldname + '_' + uuid() + fileExtension;
    cb(null, constructedFileName);
  },
};
