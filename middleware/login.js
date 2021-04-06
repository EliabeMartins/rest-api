const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// LOGIN
router.post('/', (req, res, next) => {
   mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM users WHERE name = ?`;
            conn.query(query,[req.body.name],(error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length < 1) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação - 1'})
                }
                bcrypt.compare(req.body.password, result[0].PASSWORD, (err, response) => {
                    if (err) {
                        return res.status(401).send({ mensagem: 'Falha na autenticação - 2'})
                    }
                    if (response) {
                        const token = jwt.sign({
                            id: result[0].ID,
                            email: result[0].EMAIL,
                            name: result[0].NAME
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: "3h"
                        });
                        return res.status(200).send({ 
                            mensagem: 'Autenticado com SUCESSO.', 
                            // ID: result[0],
                            token: token
                        });
                    }
                    return res.status(401).send({ mensagem: 'Falha na autenticação'});
                });
            });
    });
});

//

module.exports = router;