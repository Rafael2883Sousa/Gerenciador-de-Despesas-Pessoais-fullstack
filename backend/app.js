import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

export default app;