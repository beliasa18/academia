import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: 'inova_fit',
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: 'postgres',
});

try {
  sequelize.authenticate();
  console.log('Conectado ao banco com sucesso');
} catch (error) {
  console.log('Erro ao conectar com o banco: ' + error.message);
}

export default sequelize;