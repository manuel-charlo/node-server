const express = require('express');
const Usuario = require('../models/usuario');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const app = express();


const { verificaToken } = require('../middlewares/autenticacion');
const { verificaAdmin_Role } = require('../middlewares/autenticacion');

app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {


                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo

                })
            })

        })


});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {


    let id = req.params.id;
    let body = _.pick(res.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })



});


app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {


    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });


});

app.delete('/usuario/:id', verificaToken, (req, res) => {



    let identificador = req.params.id;

    let body = _.pick(res.body, ['estado']);

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(identificador, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (usuarioBorrado == null) {
            return res.status(400).json({
                ok: false,

                err: {
                    message: 'usuario no encontrado'
                }
            });

        }


        res.json({
            ok: true,

            usuario: usuarioBorrado
        })


    });

});

module.exports = app;