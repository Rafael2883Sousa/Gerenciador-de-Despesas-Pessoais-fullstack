import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro de conexão ao MongoDB:', error.message);
    process.exit(1);
  }
};