import { DataTypes } from "sequelize";
import sequelize from "../config/conexaoDb.js";

const Administrativo = sequelize.define('administrativo', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_documento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  n_documento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_admissao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

export default Administrativo;
