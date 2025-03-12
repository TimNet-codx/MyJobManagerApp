import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import DataParser from 'datauri/parser.js';

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const uploadPath = path.join(__dirname, '../public/uploads');

    
// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//      // set the directory where uploaded files will be stored
//      cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       const fileName = file.originalname;
//       // set the name of the uploaded file
//       cb(null, fileName);
//     },
// });

// const upload = multer({storage});

// export default upload;

// We change the  above because it don't work free Render when deploy it

// We change the  above because it don't work free Render and  when deploy it
// For file upload or picture upload : i.e image upload

const storage = multer.memoryStorage();
const upload = multer({storage});

const parser = new DataParser();

export const formatImage = (file) => {
//  console.log(file);
const fileExtension = path.extname(file.originalname).toString();
return parser.format(fileExtension, file.buffer).content;
};

export default upload;