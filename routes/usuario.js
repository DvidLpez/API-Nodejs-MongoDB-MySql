
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');
// var SEED = require('../config/config').SEED;


var app = express();

var Usuario = require('../models/usuario');

// listar usuarios
app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
    
        .exec(

            (err, usuarios) => {

                if (err) {

                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar usuarios',
                        errors: err
                    });
                }

                return res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            }
        );       
});




// actualizar usuarios
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById( id, ( err, usuario)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });
        }

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                mensaje: `El usuario con el {$id} no existe `,
                errors: {message: 'No existe un usuario con ese ID'}
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save( ( err, usuarioUpdated )=>{

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioUpdated.password = ':-)';

            res.status(201).json({
                ok: true,
                usuario: usuarioUpdated
            });


        });

    });

});

// crear usuarios
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save( (err, userSave) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuarios',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: userSave,
            usuarioToken: req.usuario
        });



    });

});

// eliminar usuarios
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

        var id = req.params.id;

        Usuario.findByIdAndRemove(id, ( err, usuarioDelete) => {

            if (err) {

                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar usuarios',
                    errors: err
                });
            }

            if (!usuarioDelete) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese ID',
                    errors: {message: 'No existe ese ID'}
                });
            }

            res.status(200).json({
                ok: true,
                usuario: usuarioDelete
            });


        });
});

module.exports = app;
