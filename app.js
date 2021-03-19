const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPaser = require('body-parser');


// const Auth = require('./middleware/auth');
const Login = require('./middleware/login');
const Users = require('./routes/users');
const Cliente = require('./routes/clientes');
const Servers = require('./routes/servers');



app.use(morgan('dev'));
app.use(bodyPaser.urlencoded({ extended: false })); // Apenas dados simples
app.use(bodyPaser.json()); // Json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Origin',
        'Origin, X-Requrested-With, Content_type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});


//

// app.use('/auth', Auth);
app.use('/login', Login);
app.use('/users', Users);
app.use('/cliente', Cliente);
app.use('/servers', Servers);


// QUANDO NÃO ENCONTRA A ROTA, ENTRA AQUI
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status(400);
    next(erro);
});

module.exports = app;