const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');



//
exports.getUsers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM user;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    Quantidade: result.length,
                    users: result.map(user => {
                        return {
                            id: user.ID,
                            name: user.NAME,
                            password: user.PASSWORD,
                            email: user.EMAIL,
                            request: {
                                tipo: "GET",
                                desc: "RETORNA TODOS OS USUARIOS",
                                url: 'http://localhost:3000/users/' + user.ID
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            }
        )
    });
};

//
exports.postUser = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM user WHERE email = ?', [req.body.email], (error, result) => {
            if (error) { return res.status(500).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({ mensagem: 'USUÁRIO JÁ CADASTRADO' })
            } else {
                bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query(
                        `INSERT INTO user (name, email, password) VALUES (?,?,?)`,
                        [req.body.name, req.body.email, hash], 
                        (error, result) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }
                            response = {   
                                mensagem: 'USUÁRIO CADASTRADO COM SUCESSO',
                                User: {
                                    id: result.insertId,
                                    name: req.body.name
                                }
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
                'SELECT * FROM user WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error}) }
                
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'NÃO FOI ENCONTRADO USUÁRIO COM ESSE ID'
                    })
                }
                const response = {
                    User: {
                            // id: result[0].ID,
                            name: result[0].NAME,
                            password: result[0].PASSWORD,
                            email: result[0].EMAIL,
                            request: {
                                tipo: "GET",
                                desc: "RETORNA DADOS DE UM USUÁRIOS",
                                // url: 'http://localhost:3000/users/' + User.ID
                        }
                    }
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
            `UPDATE user
                SET name       = ?, 
                    password   = ?,
                    email      = ?
                WHERE id = ?`,
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
                    mensagem: 'SERVIDOR ALTERADO COM SUCESSO',
                    userAtualizado:{
                        ID: req.body.ID,
                        name: req.body.name,
                        password: req.body.password,
                        email: eq.body.email,
                        request: {
                            tipo: "GET",
                            desc: "ATUALIZA USUÁRIO",
                            url: 'http://localhost:3000/users/' + req.body.ID
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};


//
exports.delete_User = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            `DELETE FROM user WHERE id = ?`, [req.body.id],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'USUÁRIO DELETADO COM SUCESSO',
                    request: {
                        tipo: 'POST',
                        desc: 'INSERE UM USUÁRIO',
                        url: 'http://localhost:3000/users',

                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};