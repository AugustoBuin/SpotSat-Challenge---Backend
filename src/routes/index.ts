import { Router } from 'express';
import polygonRoutes from './polygonRoutes'
import userRoutes from './userRoutes'
import authRoutes from './authRoutes'

const router = Router();

router.use('/polygons', polygonRoutes);
router.use('/users', userRoutes);
router.use('/', authRoutes);

export default router;
