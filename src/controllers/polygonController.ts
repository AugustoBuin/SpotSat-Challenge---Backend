import { Request, Response } from 'express';
import polygonService from '../services/polygonService';
import Polygon from '../models/Polygon';
import { Sequelize } from 'sequelize';
import { console } from 'inspector';


const createPolygon = async (req: Request, res: Response) => {
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

    console.log("User ID:", req.userId); // Verifique se userId está definido
    if (!req.userId) {
      return res.status(400).json({ error: 'userId não encontrado. Verifique a autenticação.' });
    }

    // Chama as funções de cálculo
    // const geometryLiteral = Sequelize.literal(`
    //   ST_Transform(
    //     ST_SetSRID(
    //       ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}'), 
    //       4326
    //     ), 
    //     5880
    //   )
    // `);
    const geometryLiteral = Sequelize.literal(`ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(feature.geometry)}'), 4326)`);

    // Log para verificar `geometryLiteral`
    console.log("Geometry Literal:", geometryLiteral);
    if (!geometryLiteral) {
      return res.status(400).json({ error: 'Geometria inválida para o polígono' });
    }

    const centroid = Sequelize.literal(`ST_AsGeoJSON(ST_Centroid(${geometryLiteral.val}))`);
    const area = Sequelize.literal(`ST_Area(${geometryLiteral.val}) / 10000`);

    const polygon = await Polygon.create({
      geom: geometryLiteral,
      name,
      properties,
      centroid,
      area,
      userId: req.userId,
    });


    res.status(201).json(polygon);
  } catch (error) {
    console.error("Erro ao criar polígono:", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Erro desconhecido ao criar polígono' });
    }
  }
};

// Lista todos os polígonos ordenados
const getAllPolygons = async (req: Request, res: Response) => {
  try {
    const polygons = await polygonService.getAllPolygons();
    res.status(200).json(polygons);
    console.log("Polígonos listados!")
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar polígonos' });
  }
};

// Retorna um polígono específico pelo ID
const getPolygonById = async (req: Request, res: Response) => {
  try {
    const polygon = await polygonService.getPolygonById(req.params.id);
    if (!polygon) return res.status(404).json({ error: 'Polígono não encontrado' });
    res.status(200).json(polygon);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar polígono' });
  }
};

// Busca polígonos dentro de outro polígono pelo ID
const getPolygonsWithinPolygon = async (req: Request, res: Response) => {
  try {
    const polygons = await polygonService.getPolygonsWithinPolygon(req.params.id);
    res.status(200).json(polygons);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar polígonos' });
  }
};

// Busca polígonos próximos a um ponto e dentro de um raio
const searchPolygonsByRadius = async (req: Request, res: Response) => {
  const { latitude, longitude, radius } = req.query;
  try {
    const polygons = await polygonService.searchPolygonsByRadius(Number(latitude), Number(longitude), Number(radius));
    res.status(200).json(polygons);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar polígonos por raio' });
  }
};

// Atualiza um polígono
const updatePolygon = async (req: Request, res: Response) => {
  try {
    const updatedPolygon = await polygonService.updatePolygon(req.params.id, req.body);
    if (!updatedPolygon) return res.status(404).json({ error: 'Polígono não encontrado' });
    res.status(200).json(updatedPolygon);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar polígono' });
  }
};

// Deleta um polígono
const deletePolygon = async (req: Request, res: Response) => {
  try {
    const deleted = await polygonService.deletePolygon(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Polígono não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar polígono' });
  }
};

export default {
  getAllPolygons,
  getPolygonById,
  getPolygonsWithinPolygon,
  searchPolygonsByRadius,
  createPolygon,
  updatePolygon,
  deletePolygon
};
