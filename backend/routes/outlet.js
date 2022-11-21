const express = require('express');
const auth = require('../auth');
const outlet = require('../models/index').outlet;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', auth, async (req, res) => {
    await outlet.findAll()
    .then(result => res.json({ data: result }))
    .catch(error => res.json({ message: error.message }));
});

app.get('/:id', auth, async (req, res) => {
    let param = { id_outlet: req.params.id };
    
    await outlet.findOne({ where: param })
    .then(result => res.json({ data: result }))
    .catch(error => res.json({ message: error.message }));  
});

app.post('/', async (req, res) => {
    let data = {
        nama_outlet: req.body.nama_outlet,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp
    }

    await outlet.create(data)
    .then(result => res.json({ message: "Data has been inserted", data: result }))
    .catch(error => res.json({ message: error.message }));
});

app.put('/', auth, async (req, res) => {
  let param = { id_outlet: req.body.id_outlet };
  let data = {
    nama_outlet: req.body.nama_outlet,
    alamat: req.body.alamat,
    no_telp: req.body.no_telp
  }

  await outlet.update(data, { where: param })
  .then(result => res.json({ message: "Data has been updated", data: result }))
  .catch(error => res.json({ message: error.message }));
});

app.delete('/:id', auth, async (req, res) => {
  let param = { id_outlet: req.params.id };

  await outlet.destroy({ where: param })
  .then(result => res.json({ message: "Data has been deleted" }))
  .catch(error => res.json({ message: error.message }));
});

module.exports = app;
