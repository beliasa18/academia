import { DataTypes } from "sequelize";
import sequelize from "../config/conexaoDb.js";
import Aluno from "./Aluno.js";

const EntradaSaida = sequelize.define('entrada_saida', {
  entrada_saida: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_hora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

Aluno.hasMany(EntradaSaida, {
  foreignKey: 'id_aluno',
});
EntradaSaida.belongsTo(Aluno, {
  foreignKey: 'id_aluno',
});

export default EntradaSaida;
