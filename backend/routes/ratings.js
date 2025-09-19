import express from 'express';
import {
  getAllRatings,
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
  getRatingsByStore,
  getRatingsByUser,
} from '../controllers/ratingsController.js';

const router = express.Router();

// Get all ratings
router.get('/', getAllRatings);

// Create rating
router.post('/', createRating);

// Get ratings by store (keep before :id route to avoid conflicts)
router.get('/store/:storeId', getRatingsByStore);

// Get ratings by user (keep before :id route to avoid conflicts)
router.get('/user/:userId', getRatingsByUser);

// Get rating by ID
router.get('/:id', getRatingById);

// Update rating
router.put('/:id', updateRating);

// Delete rating
router.delete('/:id', deleteRating);

export default router;
