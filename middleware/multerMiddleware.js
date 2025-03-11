import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadPath = path.join(__dirname, '../public/uploads');

    
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
     // set the directory where uploaded files will be stored
     cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname;
      // set the name of the uploaded file
      cb(null, fileName);
    },
});

const upload = multer({storage});

export default upload;