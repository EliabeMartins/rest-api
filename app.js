const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPaser = require('body-parser');

const Users = require('./routes/users');
const Servers = require('./routes/servers');
const Login = require('./middleware/login');
const Auth = require('./middleware/auth');

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

app.use('/login', Login);
app.use('/auth', Auth);
app.use('/users', Users);
app.use('/servers', Servers);


// QUANDO NÃO ENCONTRA A ROTA, ENTRA AQUI
app.use((req, res, next) => {
    const error = new Error('Não encontrado');
    error.status(400);
    next(error);
});

module.exports = app;