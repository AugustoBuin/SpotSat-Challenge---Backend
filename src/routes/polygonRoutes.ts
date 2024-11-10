import { Router } from 'express';
import polygonController from '../controllers/polygonController';
import authenticate from '../utils/middlewares/authenticate';

const router = Router();

router.get('/', authenticate, polygonController.getAllPolygons);
router.get('/:id', authenticate, polygonController.getPolygonById);
router.get('/:id/interests', authenticate, polygonController.getPolygonsWithinPolygon);
router.get('/search', authenticate, polygonController.searchPolygonsByRadius);
router.post('/', authenticate, polygonController.createPolygon);
router.put('/:id', authenticate, polygonController.updatePolygon);
router.delete('/:id', authenticate, polygonController.deletePolygon);

export default router;
