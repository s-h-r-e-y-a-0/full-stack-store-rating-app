import express from 'express';
import * as storesController from '../controllers/storesController.js';

const router = express.Router();

router.get('/', storesController.getAllStores);
router.get('/:id', storesController.getStoreById);
router.post('/', storesController.createStore);
router.put('/:id', storesController.updateStore);
router.delete('/:id', storesController.deleteStore);

export default router;
