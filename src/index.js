import express from 'express';
import dotenv from 'dotenv';
import contactsRoutes from './routes/contactsRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());


app.use('/contacts', contactsRoutes);


app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
