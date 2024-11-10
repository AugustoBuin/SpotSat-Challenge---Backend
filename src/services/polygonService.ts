import { Transaction } from 'sequelize';
import Polygon from '../models/Polygon';

interface PolygonData {
    geom: object;
    name?: string;
    properties?: object;
    centroid?: object;
    area?: number;
    userId: number;
}

const createPolygon = async (data: Partial<PolygonData>, options?: { transaction?: Transaction }) => {
    return await Polygon.create(data);
};

export default {
    createPolygon,
};
