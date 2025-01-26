import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { getAllContacts, getContactById } from './controllers/contactsController.js';

export const startServer = () => {
  const logger = pino({ transport: { target: 'pino-pretty' } });
  const app = express();

  app.use(cors());
  app.use(pinoHttp({ logger }));
  app.use(express.json());


  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);


  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });


  app.use((err, req, res, next) => {
    logger.error(err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
