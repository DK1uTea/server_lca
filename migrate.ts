import dotenv from 'dotenv';
dotenv.config();

const config = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/living_companion_app',
  collection: 'migrations',
  migrationsPath: './migrations',
  templatePath: './migrations/template.ts',
  autosync: true,
};

export default config;
