import {Sequelize} from 'sequelize';
import {MYSQL_DATABASE} from "../Loaders/config";

let connection;

export const sqlConnection = async () => {
  try {
    if (connection) {
      return connection;
    }
    connection = new Sequelize(MYSQL_DATABASE.db_name, MYSQL_DATABASE.username, MYSQL_DATABASE.password,{
      dialect: 'postgres',
      host: MYSQL_DATABASE.address,
      port: 5432,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: false,
    });
    await connection.authenticate()
    console.log("db conncted")
    return connection;
  } catch (error) {
    throw error;
  }
};
