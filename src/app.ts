import express from 'express';
import http from 'http';
// import bodyParesr from 'body-parser';
const bodyParser = require('body-parser');
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import router from './routes';
import { AppDataSource } from './db/appDataSource';

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', 'true');
//   // Other CORS headers...
//   next();
// });

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', router);

const server = http.createServer(app);

const SERVER_PORT = process.env.SERVER_PORT;

server.listen(8000, () => {
    console.log(`Server running on http://localhost:${SERVER_PORT}`);
})

const __init = async () => {
  try {
    await AppDataSource.initialize();

    console.log("Data Source has been initialized!")
  }
  catch (error) {
    console.log('Error connecting to the database', error)
  }

    // try {
    //     const connection = await createConnection({
    //       type: 'mysql',
    //       host: process.env.DB_HOST,
    //       port: Number(process.env.DB_PORT),
    //       username: process.env.DB_USER,
    //       password: process.env.DB_PASS,
    //       database: process.env.DB_NAME,
    //       synchronize: true,
    //       logging: true,
    //       entities: Entities,
    //     });
    
    //     console.log('Connected to MySQL');
    //   } catch (error) {
    //     console.error('Error connecting to MySQL:', error);
    //   }
}

__init();
