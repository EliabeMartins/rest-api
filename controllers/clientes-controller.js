const mysql = require('../mysql').pool;

// 
exports.getClientes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM clientes;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    Quant: result.length,
                    CLIENTE: result.map(client => {
                        return {
                            ID: client.ID,
                            NAME: client.NAME,
                            EMAIL: client.EMAIL,
                            TEL: client.TEL,
                            request: {
                                tipo: "GET",
                                desc: "RETORNA TODOS OS CLIENTES",
                                url: 'http://localhost:3000/cliente/' + client.ID
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
exports.putCliente = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(504).send({ error: error }) }
        conn.query('SELECT * FROM clientes WHERE EMAIL = ?', [req.body.email], (error, result) => {
            if (error) { return res.status(501).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({ mensagem: 'CLIENTE JÁ CADASTRADO' })
            } else {
                conn.query(
                    `INSERT INTO clientes (NAME, EMAIL, TEL) VALUES (?,?,?)`,
                    [req.body.name, req.body.email, req.body.tel], 
                    (error, result) => {
                        conn.release();
                        if (error) { return res.status(503).send({ error: error }) }
                        response = {   
                            mensagem: 'CLIENTE CADASTRADO COM SUCESSO',
                            CLIENTE: {
                                ID: result.insertId,
                                NAME: req.body.name,
                                EMAIL: req.body.email,
                                TEL:req.body.tel,
                                request: {
                                    tipo: "PUT",
                                    desc: "DADOS DO CLIENTE " + req.body.name,
                                    // url: 'http://localhost:3000/cliente/ + result.insertId'
                            }
                            }
                        }
                        return res.status(201).send(response);
                    });
            }
        })
    });
};

//
exports.getId_Cliente = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM clientes WHERE ID = ?;',
        [req.params.id],
        (error, result, fields) => {
            if (error) { return res.status(500).send({ error: error}) }
            
            if (result.length == 0) {
                return res.status(404).send({
                    mensagem: 'NÃO FOI ENCONTRADO CLIENTE COM ESSE ID'
                })
            }
            const response = {
                CLIENTE: {
                        ID: result[0].ID,
                        NAME: result[0].NAME,
                        EMAIL: result[0].EMAIL,
                        TEL: result[0].TEL,
                        request: {
                            tipo: "GET/ID:?",
                            desc: "DADOS DO CLIENTE " + result[0].NAME,
                            // url: 'http://localhost:3000/cliente/'
                    }
                }
            }
            return res.status(200).send(response);
            }
        )
    });
};

//
exports.patchCliente = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            `UPDATE clientes
                SET NAME       = ?,
                    EMAIL      = ?,
                    TEL        = ?
                WHERE ID = ?`,
            [
                req.body.name,                 
                req.body.email, 
                req.body.tel,
                req.body.id
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'CLIENTE ALTERADO COM SUCESSO',
                    CLIENTE:{
                                ID: req.body.id,
                                NAME: req.body.name,                                
                                EMAIL: req.body.email,
                                TEL: req.body.tel,
                                request: {
                                    tipo: "PATCH",
                                    desc: "ATUALIZA USUÁRIO",
                                    url: 'http://localhost:3000/cliente/' + req.body.name
                                }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};

//
exports.deleteCliente = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            `DELETE FROM clientes WHERE ID = ?`, [req.body.id],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'CLIENTE DELETADO COM SUCESSO',
                    request: {
                        tipo: 'DELETE',
                        desc: 'POR FAVOR INSERIR UM CLIENTE',
                        url: 'http://localhost:3000/cliente/',

                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};