import { Request, Response } from 'express';
import {
  createGeometryLiteral,
  calculateCentroidLiteral,
  calculateAreaLiteral,
} from '../utils/middlewares/geometryCalcs';
import polygonService from '../services/polygonService';
import sequelize from '../utils/config/config';

interface RequestWithUserId extends Request {
  userId?: number;
}

const createPolygon = async (req: RequestWithUserId, res: Response) => {
  const transaction = await sequelize.transaction();
  try {
    const { feats } = req.body;

    if (!feats || feats.length === 0) {
      return res.status(400).json({ error: 'Nenhum polígono fornecido' });
    }

    const feature = feats[0];

    if (!feature.properties || !feature.properties.name) {
      return res.status(400).json({ error: 'Nome do polígono não fornecido' });
    }
    if (!feature.geometry) {
      return res.status(400).json({ error: 'Geometria do polígono não fornecida' });
    }

    const name = feature.properties.name;
    const properties = feature.properties;

    // Chama as funções de cálculo
    const geometryLiteral = createGeometryLiteral(feature.geometry);

    // Cria o polígono com `geom`, `name`, `properties` e `userId`
    const polygon = await polygonService.createPolygon({
      geom: geometryLiteral,
      name,
      properties,
      userId: req.userId,
    }, { transaction }); // Inclui a transação na criação

    const centroid = calculateCentroidLiteral(geometryLiteral);
    const area = calculateAreaLiteral(geometryLiteral);

    await polygon.update(
      { centroid, area },
      { transaction }
    );

    // Confirma a transação se tudo estiver correto
    await transaction.commit();
    res.status(201).json(polygon);
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Erro desconhecido');
    res.status(500).json({ error: 'Erro ao criar polígono' });
  }
};

export default {
  createPolygon,
};
