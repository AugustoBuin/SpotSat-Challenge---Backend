import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './User';

@Table({
    tableName: 'Polygons',
    timestamps: true,
})
class Polygon extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name!: string; // Nome do polígono, para facilitar pesquisas

    @Column({
        type: DataType.JSONB, // Para armazenar propriedades adicionais como estilo
        allowNull: true,
    })
    properties!: object;

    @Column({
        type: DataType.GEOMETRY('POLYGON', 4326), // EPSG:4326 para latitude/longitude
        allowNull: false,
    })
    geom!: object;

    @Column({
        type: DataType.GEOMETRY('POINT', 4326), // Centróide também com EPSG:4326
        allowNull: true,
    })
    centroid!: object;

    @Column({
        type: DataType.FLOAT, // Área em hectares
        allowNull: true,
    })
    area!: number;

    // Chave estrangeira para associar o polígono ao usuário
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    // Associação com o modelo User
    @BelongsTo(() => User)
    user!: User;

}

export default Polygon;
