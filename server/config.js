// config.js
import dotenv from 'dotenv';
dotenv.config();
export const config = {
  PORT: process.env.PORT || 8080,
  DB_CONECT: process.env.DB_CONECT || '' 
}