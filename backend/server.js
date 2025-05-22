import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import softwareRoutes from './routes/software.routes.js';
import requestRoutes from './routes/request.routes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://accessmanagementsystem.vercel.app',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
  }
}

connectToDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});
