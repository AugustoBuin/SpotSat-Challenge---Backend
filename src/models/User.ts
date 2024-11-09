import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Polygon from './Polygon';
@Table({
    tableName: 'users',
    timestamps: true, // Cria automaticamente `createdAt` e `updatedAt`
})

class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @HasMany(() => Polygon)
    polygons!: Polygon[];

}

export default User;
