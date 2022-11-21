const express = require('express');
const cors = require('cors');
const app = express();

const petugas = require('./routes/petugas');
const member = require('./routes/member');
const outlet = require('./routes/outlet');
const paket = require('./routes/paket');
const transaksi = require('./routes/transaksi');

app.use(cors());
app.use('/laundry/petugas', petugas);
app.use('/laundry/member', member);
app.use('/laundry/outlet', outlet);
app.use('/laundry/paket', paket);
app.use('/laundry/transaksi', transaksi);

app.listen(8000, () => console.log('Server run on port 8000'));