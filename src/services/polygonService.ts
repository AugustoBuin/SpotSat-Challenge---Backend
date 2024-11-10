import Polygon from '../models/Polygon';
import sequelize from '../config/config';

interface PolygonData {
    geom: object;
    name?: string;
    properties?: object;
    centroid?: object;
    area?: number;
    userId: number;
}

const createPolygon = async (data: Partial<PolygonData>) => {
    return await Polygon.create(data);
};

const getAllPolygons = async () => {
    return await Polygon.findAll({ order: [['createdAt', 'DESC']] });
};

const getPolygonById = async (id: string) => {
    return await Polygon.findByPk(id);
};

const getPolygonsWithinPolygon = async (polygonId: string) => {
    // Busca polígonos dentro de outro polígono com PostGIS
    const polygon = await Polygon.findByPk(polygonId);
    if (!polygon) return null;

    return await Polygon.findAll({
        where: sequelize.literal(`ST_Within(geom, '${polygon.geom}')`)
    });
};

const searchPolygonsByRadius = async (latitude: number, longitude: number, radius: number) => {
    return await Polygon.findAll({
        where: sequelize.literal(`ST_DWithin(geom, ST_MakePoint(${longitude}, ${latitude})::geography, ${radius * 1000})`)
    });
};

const updatePolygon = async (id: string, data: Partial<Polygon>) => {
    const polygon = await Polygon.findByPk(id);
    if (!polygon) return null;
    await polygon.update(data);
    return polygon;
};

const deletePolygon = async (id: string) => {
    const polygon = await Polygon.findByPk(id);
    if (!polygon) return null;
    await polygon.destroy();
    return true;
};

export default {
    createPolygon,
    getAllPolygons,
    getPolygonById,
    getPolygonsWithinPolygon,
    searchPolygonsByRadius,
    updatePolygon,
    deletePolygon,
};
