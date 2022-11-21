const express = require('express');
const auth = require('../auth');
const paket = require('../models/index').paket;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', auth, async (req, res) => {
    await paket.findAll()
    .then(result => res.json({ data: result }))
    .catch(error => res.json({ message: error.message }));
});

app.get('/:id', auth, async (req, res) => {
    let param = { id_paket: req.params.id };
    
    await paket.findOne({ where: param })
    .then(result => res.json({ data: result }))
    .catch(error => res.json({ message: error.message }));  
});

app.post('/', async (req, res) => {
    let data = {
        nama_paket: req.body.nama_paket,
        harga: req.body.harga
    }

    await paket.create(data)
    .then(result => res.json({ message: "Data has been inserted", data: result }))
    .catch(error => res.json({ message: error.message }));
});

app.put('/', auth, async (req, res) => {
  let param = { id_paket: req.body.id_paket };
  let data = {
    nama_paket: req.body.nama_paket,
    harga: req.body.harga
  }

  await paket.update(data, { where: param })
  .then(result => res.json({ message: "Data has been updated", data: result }))
  .catch(error => res.json({ message: error.message }));
});

app.delete('/:id', auth, async (req, res) => {
  let param = { id_paket: req.params.id };

  await paket.destroy({ where: param })
  .then(result => res.json({ message: "Data has been deleted" }))
  .catch(error => res.json({ message: error.message }));
});

module.exports = app;
