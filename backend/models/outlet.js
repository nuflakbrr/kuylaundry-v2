'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi, {
        foreignKey: 'id_outlet',
        as: 'transaksi'
      });
    }
  }
  outlet.init({
    id_outlet: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_outlet: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_telp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'outlet',
    tableName: 'outlet'
  });
  return outlet;
};