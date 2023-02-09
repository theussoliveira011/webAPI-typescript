import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router: Express = express();

// Logging
router.use(morgan('dev'));

// parse the element
router.use(express.urlencoded({ extended: false }));

// take cara of data json
router.use(express.json());

// ruler for the api
router.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
      return res.status(200).json({});
  }
  next();
});

// ROUTES
router.use('/', routes);

// error handling
router.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(400).json({
    message: error.message
  });
});

// Server
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;

// server listen
httpServer.listen(PORT, () => {
  console.log(`The server is running in http:localhost:${PORT}`);
});