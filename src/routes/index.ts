import { Router } from 'express';
import polygonRoutes from './polygonRoutes'
// import userRoutes

const router = Router();

router.use('/polygons', polygonRoutes); // Rotas para polígonos
// router.use('', userRoutes);       // Rotas para usuários

export default router;
