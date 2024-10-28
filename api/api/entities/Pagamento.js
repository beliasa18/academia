import { DataTypes } from "sequelize";
import sequelize from "../config/conexaoDb.js";
import Aluno from "./Aluno.js";

const Pagamento = sequelize.define('pagamento', {
  servico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  metodo_pagamento: {
    type: DataTypes.STRING,
  },
  data_vencimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_pagamento: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
  freezeTableName: true,
});

Aluno.hasMany(Pagamento, {
  foreignKey: 'id_aluno',
});
Pagamento.belongsTo(Aluno, {
  foreignKey: 'id_aluno',
});

export default Pagamento;
