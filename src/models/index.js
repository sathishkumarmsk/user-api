import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

const sequelize = new Sequelize(
  'user-app',
  'null',
  'null', {
    dialect: 'sqlite',
    storage: './db.sqlite',
    define: {
      underscored: true,
      freezeTableName: true,
    },
  },
);

const db = {};

const basename = path.basename(__filename);

fs.readdirSync(path.join(__dirname))
  .filter(
    (file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    // eslint-disable-next-line
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;