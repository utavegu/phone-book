// Знаю, что у Неста есть свой конфиг, но при использовании композа это оверинжинеринг

const serverExternalPort = process.env.SERVER_EXTERNAL_PORT || 5000;
const clientExternalPort = process.env.CLIENT_EXTERNAL_PORT || 3000;
const mongoServiceName = process.env.MONGODB_SERVICE_NAME || 'mongo';
const mongoInternalPort = process.env.MONGODB_INTERNAL_PORT || 27017;
const mongoDbLogin = process.env.MONGODB_LOGIN || 'root';
const mongoDbPassword = process.env.MONGODB_PASSWORD || 'example';
const dbName = process.env.DB_NAME || 'phone-book';

export {
  serverExternalPort,
  clientExternalPort,
  mongoServiceName,
  mongoInternalPort,
  mongoDbLogin,
  mongoDbPassword,
  dbName,
};
