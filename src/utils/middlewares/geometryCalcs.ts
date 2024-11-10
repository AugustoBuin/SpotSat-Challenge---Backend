import { Sequelize } from 'sequelize';
import sequelize from '../config/config';

/**
 * Converte a geometria GeoJSON para uma expressão SQL literal de PostGIS.
 * @param geom A geometria em formato GeoJSON.
 * @returns Um literal SQL de PostGIS para uso com Sequelize.
 */
export const createGeometryLiteral = (geom: object) => {
    return Sequelize.literal(`
    ST_Transform(
      ST_SetSRID(
        ST_GeomFromGeoJSON('${JSON.stringify(geom)}'), 
        4326
      ), 
      5880
    )
  `);
};

/**
 * Calcula o centróide como um literal SQL.
 * @param geometryLiteral A expressão SQL de geometria.
 * @returns Um literal SQL para o centróide.
 */
export const calculateCentroidLiteral = (geometryLiteral: any) => {
    return Sequelize.literal(`ST_AsGeoJSON(ST_Centroid(${geometryLiteral.val}))`);
};

/**
 * Calcula a área em hectares como um literal SQL.
 * @param geometryLiteral A expressão SQL de geometria.
 * @returns Um literal SQL para a área em hectares.
 */
export const calculateAreaLiteral = (geometryLiteral: any) => {
    return Sequelize.literal(`ST_Area(${geometryLiteral.val}) / 10000`);
};
