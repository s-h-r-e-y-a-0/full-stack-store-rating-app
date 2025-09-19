import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllStores = async (req, res, next) => {
  try {
    const stores = await prisma.store.findMany({
      include: { owner: true, ratings: true },
    });
    res.json(stores);
  } catch (err) {
    next(err);
  }
};

export const getStoreById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid store id' });

    const store = await prisma.store.findUnique({
      where: { id },
      include: { owner: true, ratings: true },
    });

    if (!store) return res.status(404).json({ error: 'Store not found' });
    res.json(store);
  } catch (err) {
    next(err);
  }
};

export const createStore = async (req, res, next) => {
  try {
    const { name, email, address, ownerId } = req.body;
    if (!name || !email || !address || ownerId === undefined) {
      return res.status(400).json({ error: 'Missing fields (name, email, address, ownerId required)' });
    }

    const created = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId: Number(ownerId),
      },
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateStore = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid store id' });

    const { name, email, address } = req.body;
    const data = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (address !== undefined) data.address = address;

    const updated = await prisma.store.update({
      where: { id },
      data,
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteStore = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid store id' });

    await prisma.store.delete({ where: { id } });
    res.json({ message: 'Store deleted' });
  } catch (err) {
    next(err);
  }
};
