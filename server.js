import express from 'express';
import * as dotenv from 'dotenv';
const app = express();
dotenv.config();
//import { nanoid } from 'nanoid';
import morgan from 'morgan';

// Router
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';


// DB
import mongoose from 'mongoose';

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// Cookie
import cookieParser from 'cookie-parser';

// Public and Upload
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Cloudinary To  Store Image And Vidoe
import cloudinary from 'cloudinary';

// Security
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';



// Connection to the Cloud For free
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Public and Upload
const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.get('/', (req, res) => {
//     res.send('Hello World');
//   });
//   app.get('/api/v1/test', (req, res) => {
//     res.json({ msg: 'test route' });
//   });
 // Public and Upload

 // For Developing
//  app.use(express.static(path.resolve(__dirname, './public')));
 // Replace with this for production

 app.use(express.static(path.resolve(__dirname, '../client/dist')));

  app.use(cookieParser());
  app.use(express.json());
  //app.use(morgan('dev'));
  app.use(helmet());
  app.use(mongoSanitize());

  

// Router reference
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

// Access Point For Developing is has been remve : public 
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './public/assets', 'index.html'));
// });
// Access Point Replace with this for production

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});


 

  // Not Found Middleware
  app.use('*', (req, res) => {
   res.status(404).json({msg: 'not found'});
  });

  //Error Middleware
  // app.use((err, req, res, next) => {
  //  console.log(err);
  //  res.status(500).json({msg: 'something went wrong'});
  // });
  app.use(errorHandlerMiddleware);





  app.get('/api/v1/jobs', (req, res) => {
    res.status(200).json({ jobs });
  });

  
 

const port = process.env.PORT || 5200;

try { 
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

  