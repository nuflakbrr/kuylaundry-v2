const express = require('express');
const moment = require('moment');
const auth = require('../auth');
const member = require('../models/index').member;
const petugas = require('../models/index').petugas;
const outlet = require('../models/index').outlet;
const transaksi = require('../models/index').transaksi;
const detail_transaksi = require('../models/index').detail_transaksi;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', auth, async (req, res) => {
  await transaksi.findAll({
    include: ["member", "petugas", "outlet", "detail_transaksi"]
  })
  .then(result => res.json({ data: result }))
  .catch(error => res.json({ message: error.message }));
});

app.get('/:id', auth, async (req, res) => {
  let param = { id_transaksi: req.params.id };

  await transaksi.findAll({ where: param, include: ["member", "petugas", "outlet", "detail_transaksi", "paket"] })
  .then(result => res.json({ data: result }))
  .catch(error => res.json({ message: error.message }));
});

app.get('/member/:id', auth, async (req, res) => {
  let param = { id_member: req.params.id };

  await transaksi.findAll({ where: param, include: ["member", "petugas", "outlet", "detail_transaksi", "paket"] })
  .then(result => res.json({ data: result }))
  .catch(error => res.json({ message: error.message }));
});

app.post('/', async (req, res) => {
  let data = {
    id_member: req.body.id_member,
    id_petugas: req.body.id_petugas,
    id_outlet: req.body.id_outlet,
    tgl_transaksi: req.body.tgl_transaksi,
    // tgl_transaksi: moment().format('YYYY-MM-DD'),
    tgl_batas: req.body.tgl_batas,
    tgl_bayar: req.body.tgl_bayar,
    status_pembayaran: req.body.status_pembayaran,
    status_pengerjaan: req.body.status_pengerjaan,
  };

  await transaksi.create(data)
  .then(result => {
    res.json({ message: "Data has been inserted", data: result })

    if(result) {
      let data_detail = {
        id_transaksi: result.id_transaksi,
        id_paket: req.body.id_paket,
        qty: req.body.qty,
      };

      detail_transaksi.create(data_detail)
    }
  })
  .catch(error => res.json({ message: error.message }));
});

app.put('/', auth, async (req, res) => {
  let param = { id_transaksi: req.body.id_transaksi };
  let data = {
    tgl_transaksi: req.body.tgl_transaksi,
    tgl_batas: req.body.tgl_batas,
    tgl_bayar: req.body.tgl_bayar,
    status_pembayaran: req.body.status_pembayaran,
    status_pengerjaan: req.body.status_pengerjaan,
  };

  await transaksi.update(data, { where: param })
  .then(result => res.json({ message: "Data has been updated", data: result }))
  .catch(error => res.json({ message: error.message }));
});

app.delete('/:id', auth, async (req, res) => {
  let param = { id_transaksi: req.params.id };

  await detail_transaksi.destroy({ where: param })
  .then(result => {
    res.json({ message: "Data has been deleted" })

    result ? transaksi.destroy({ where: param }) : null
  })
  .catch(error => res.json({ message: error.message }));
});

module.exports = app;
