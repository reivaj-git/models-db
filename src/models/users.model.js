import { DataTypes } from "sequelize";
import db from "../utils/database.js";

// modelo en singular y tabla en plural
const User  = db.define('users', {
  // definir todos los atributos / columnas de la tabla
  //id, username, email, password
  id: {
    //tipo de dato
    type: DataTypes.INTEGER,
    // llave primaria
    primaryKey: true,
    // autoincrement
    autoIncrement: true,
  },
  username: {
    //username varchar(30) [not null]
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(20),
    allowNull: false,
  }
})

export default User;