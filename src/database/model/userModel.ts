import { Table,Column,Model,DataType, PrimaryKey, AllowNull } from "sequelize-typescript";
import { Role } from "../../config/interface";

@Table({
    tableName : "User",
    modelName : "User",
    timestamps : true
})

class User extends Model{
    @Column({
        primaryKey : true,
        type : DataType.UUID,
        defaultValue : DataType.UUIDV4
    })
    declare id : string
    @Column({
        type : DataType.STRING,
    })
    declare username : string

    @Column({
        type : DataType.STRING
    })
    declare password : string

    @Column({
        type : DataType.STRING,
        unique : true,
        allowNull : false
    })
    declare email : string

    @Column({
        type : DataType.ENUM(Role.institute,Role.student,Role.teacher,Role.superAdmin),
        defaultValue : Role.student
    })
    declare role : string

    @Column({
        type : DataType.STRING
    })
    declare currentInstituteNumber : string

}

export default User;