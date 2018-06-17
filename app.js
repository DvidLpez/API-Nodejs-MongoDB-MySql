// Inicializar variable app, será la variable principal para luego definir rutas, ...
var express = require('express');
var app = express();



// Conexion a la bbdd con MongoDB
// =================================
var mongoose = require('mongoose');
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', ( err, res) =>{

    if (err) throw err;

    console.log('Base de datos MongoDB: \x1b[32m%s\x1b[0m', 'Online' )
})
// =================================



// Conexion a la bbdd con MySql
// =================================
// var mysql = require('mysql');
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "esadmin"
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log('Base de datos MYSQL: \x1b[32m%s\x1b[0m', 'Online' );
// });
// =================================







// rutas
// next se utiliza para middleware
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok:true,
        mensaje:'Petición realizada correctamente'
    })
});


// escuchar peticiones
app.listen(3000, ()=>{

    // COLORES EN EL TERMINAL
    // Reset = "\x1b[0m"
    // Bright = "\x1b[1m"
    // Dim = "\x1b[2m"
    // Underscore = "\x1b[4m"
    // Blink = "\x1b[5m"
    // Reverse = "\x1b[7m"
    // Hidden = "\x1b[8m"
    // FgBlack = "\x1b[30m"
    // FgRed = "\x1b[31m"
    // FgGreen = "\x1b[32m"
    // FgYellow = "\x1b[33m"
    // FgBlue = "\x1b[34m"
    // FgMagenta = "\x1b[35m"
    // FgCyan = "\x1b[36m"
    // FgWhite = "\x1b[37m"
    // BgBlack = "\x1b[40m"
    // BgRed = "\x1b[41m"
    // BgGreen = "\x1b[42m"
    // BgYellow = "\x1b[43m"
    // BgBlue = "\x1b[44m"
    // BgMagenta = "\x1b[45m"
    // BgCyan = "\x1b[46m"
    // BgWhite = "\x1b[47m"

    // uso
    // console.log('Node/Express: \x1b[36m%s\x1b[0m', 'online');


    console.log('Express server - Puerto 3000 -: \x1b[32m%s\x1b[0m','Online');
})