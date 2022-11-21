'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.member, {
        foreignKey: 'id_member',
        as: 'member'
      });
      
      this.belongsTo(models.petugas, {
        foreignKey: 'id_petugas',
        as: 'petugas'
      });

      this.belongsTo(models.outlet, {
        foreignKey: 'id_outlet',
        as: 'outlet'
      });
    }
  }
  transaksi.init({
    id_transaksi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_member: DataTypes.INTEGER,
    id_petugas: DataTypes.INTEGER,
    id_outlet: DataTypes.INTEGER,
    tgl: DataTypes.DATE,
    tgl_batas: DataTypes.DATE,
    tgl_bayar: DataTypes.DATE,
    status_pembayaran: DataTypes.STRING,
    status_pengerjaan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi'
  });
  return transaksi;
};