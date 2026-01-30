const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET no definido');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI no definido');
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/health', (req, res) => {
  res.json({ success: true, status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
});
