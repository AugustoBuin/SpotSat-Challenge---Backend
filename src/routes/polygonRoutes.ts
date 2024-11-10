import { Router } from 'express';
import polygonController from '../controllers/polygonController';

const router = Router();

// Rota para criação de um novo polígono
router.post('/polygons', polygonController.createPolygon);

export default router;
