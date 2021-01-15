require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use(require('./routes/usuario'));


mongoose.connect(process.env.urlBD, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('base de datos en línea');
    });


app.listen(process.env.PORT, () => {
    console.log('Estoy escuchando');
});