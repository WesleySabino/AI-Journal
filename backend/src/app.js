import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
import articleRoutes from './routes/articleRoutes.js';
app.use('/api/articles', articleRoutes);

// Test Database Connection and Sync Models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    await sequelize.sync();
    console.log('Models synchronized...');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
