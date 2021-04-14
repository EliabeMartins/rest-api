const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');



//
exports.getUsers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM users;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error}) }
                const response = result.map(user => {
                        return {
                            ID: user.ID,
                            NAME: user.NAME,
                            // PASSWORD: user.PASSWORD,
                            EMAIL: user.EMAIL
                        }
                    });
                return res.status(200).send(response);
            }
        )
    });
};
//
exports.postUser = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(504).send({ error: error }) }
        conn.query('SELECT * FROM users WHERE EMAIL = ?', [req.body.EMAIL], (error, result) => {
            if (error) { return res.status(501).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({ mensagem: 'USUÁRIO JÁ CADASTRADO' })
            } else {
                bcrypt.hash(req.body.PASSWORD, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(502).send({ error: errBcrypt }) }
                    conn.query(
                        `INSERT INTO users (NAME, EMAIL, PASSWORD) VALUES (?,?,?)`,
                        [req.body.NAME, req.body.EMAIL, hash], 
                        (error, result) => {
                            conn.release();
                            if (error) { return res.status(503).send({ error: error }) }
                            response = {   
                                mensagem: 'USUÁRIO CADASTRADO COM SUCESSO'
                            }
                            return res.status(201).send(response);
                        });
                });
            }
        })
    });
};
//
exports.getIdUser = (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) { return res.status(500).send({ error: error}) }
            conn.query(
                'SELECT * FROM users WHERE ID = ?;',
            [req.params.id],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error}) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'NÃO FOI ENCONTRADO USUÁRIO COM ESSE ID'
                    })
                }
                const response = {
                    ID: result[0].ID,
                    NAME: result[0].NAME,
                    // PASSWORD: result[0].PASSWORD,
                    EMAIL: result[0].EMAIL
                }
                return res.status(200).send(response);
                }
            )
        });
};
//
exports.patch_User = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            `UPDATE users
                SET NAME       = ?, 
                    PASSWORD   = ?,
                    EMAIL      = ?
                WHERE ID = ?`,
            [
                req.body.name, 
                req.body.password,
                req.body.email, 
                req.body.id
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'USUÁRIO ALTERADO COM SUCESSO',
                    USUARIO_ATUALIZADO:{
                                ID: req.body.id,
                                NAME: req.body.name,
                                PASSWORD: req.body.password,
                                EMAIL: req.body.email
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};
//
exports.deleteUser = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            `DELETE FROM users WHERE id = ?`, [req.params.id],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'USUÁRIO DELETADO COM SUCESSO'
                }
                return res.status(202).send(response);
            }
        )
    });
};