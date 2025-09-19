import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ Get all ratings
const getAllRatings = async (req, res) => {
  try {
    const ratings = await prisma.rating.findMany();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a rating
const createRating = async (req, res) => {
  try {
    const { userId, storeId, value } = req.body;

    if (!userId || !storeId || !value) {
      return res.status(400).json({ error: 'userId, storeId, and value are required' });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if store exists
    const store = await prisma.store.findUnique({ where: { id: Number(storeId) } });
    if (!store) return res.status(404).json({ error: 'Store not found' });

    // Create rating
    const rating = await prisma.rating.create({
      data: { userId: Number(userId), storeId: Number(storeId), value: Number(value) },
    });

    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get rating by ID
const getRatingById = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await prisma.rating.findUnique({ where: { id: Number(id) } });
    if (!rating) return res.status(404).json({ error: 'Rating not found' });
    res.json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update rating
const updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const rating = await prisma.rating.update({
      where: { id: Number(id) },
      data: { value: Number(value) },
    });

    res.json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete rating
const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.rating.delete({ where: { id: Number(id) } });
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get ratings by store
const getRatingsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const ratings = await prisma.rating.findMany({
      where: { storeId: Number(storeId) },
    });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get ratings by user
const getRatingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratings = await prisma.rating.findMany({
      where: { userId: Number(userId) },
    });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllRatings,
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
  getRatingsByStore,
  getRatingsByUser,
};

