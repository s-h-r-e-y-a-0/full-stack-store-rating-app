import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: { stores: true, ratings: true },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid user id' });

    const user = await prisma.user.findUnique({
      where: { id },
      include: { stores: true, ratings: true },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role, // must match Prisma enum (ADMIN, USER, OWNER)
      },
    });

    // omit password in response
    const { password: _, ...safeUser } = newUser;
    res.status(201).json(safeUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid user id' });

    const { name, email, password, address, role } = req.body;
    const data = {};

    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (address !== undefined) data.address = address;
    if (role !== undefined) data.role = role;
    if (password) data.password = await bcrypt.hash(password, 10);

    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    const { password: _, ...safeUser } = updated;
    res.json(safeUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid user id' });

    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
