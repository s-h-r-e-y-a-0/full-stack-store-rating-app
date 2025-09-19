import express from 'express';
import bodyParser from 'body-parser'; // you can also just use express.json()
import usersRoutes from './routes/users.js';
import storesRoutes from './routes/stores.js';
import ratingsRoutes from './routes/ratings.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // or: app.use(express.json())

// Routes
app.use('/users', usersRoutes);
app.use('/stores', storesRoutes);
app.use('/ratings', ratingsRoutes);

// Error handler (last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
