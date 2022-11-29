const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '!@#$%^&*()_+';
const auth = require('../auth');
const member = require('../models/index').member;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', auth, async (req, res) => {
    await member.findAll()
    .then(result => res.json({ data: result }))
    .catch(error => res.json({ message: error.message }));
});

app.get('/:id', auth, async (req, res) => {
    let param = { id_member: req.params.id };
    
    await member.findOne({ where: param })
    .then(result => res.json({ data: result }))
    .catch(error => res.json({ message: error.message }));  
});

app.post('/', async (req, res) => {
    let data = {
        nama_member: req.body.nama_member,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        no_telp: req.body.no_telp,
        password: md5(req.body.password),
        level: "member"
    }

    await member.create(data)
    .then(result => res.json({ message: "Data has been inserted", data: result }))
    .catch(error => res.json({ message: error.message }));
});

app.put('/', auth, async (req, res) => {
  let param = { id_member: req.body.id_member };
  let data = {
    nama_member: req.body.nama_member,
    alamat: req.body.alamat,
    jenis_kelamin: req.body.jenis_kelamin,
    no_telp: req.body.no_telp,
    password: md5(req.body.password)
  }

  await member.update(data, { where: param })
  .then(result => res.json({ message: "Data has been updated", data: result }))
  .catch(error => res.json({ message: error.message }));
});

app.delete('/:id', auth, async (req, res) => {
  let param = { id_member: req.params.id };

  await member.destroy({ where: param })
  .then(result => res.json({ message: "Data has been deleted" }))
  .catch(error => res.json({ message: error.message }));
});

app.post('/member', async (req, res) => {
    let param = {
        no_telp: req.body.no_telp,
        password: md5(req.body.password),
        level: "member"
    }

    await member.findOne({ where: param })
    .then(result => {
      if (result) {
        let payload = JSON.stringify(result);
        let token = jwt.sign(payload, SECRET_KEY);
        res.json({ logged: true, data: result, token: token });
      } else {
        res.json({ logged: false, message: "Invalid username or password" });
      }
    })
    .catch(error => res.json({ message: error.message }));
});

module.exports = app;
