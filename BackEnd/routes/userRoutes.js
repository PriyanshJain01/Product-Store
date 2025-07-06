import express from 'express';
import { getUser, createUser } from '../controllers/userController.js';

const router=express.Router();

router.get('/:username', getUser);
router.post('/', createUser);

export default router;