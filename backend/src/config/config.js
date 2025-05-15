export default {
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'segredo_dev',
  DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/finance-app'
};
