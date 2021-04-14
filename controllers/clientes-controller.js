const mysql = require('../mysql').pool;

// 
exports.getAllClientes = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM clientes;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = result.map(client => {
                        return {
                            ID: client.ID,
                            NAME: client.NAME,
                            EMAIL: client.EMAIL,
                            TEL: client.TEL
                        }
                    });
                
                return res.status(200).send(response);
            }
        )
    });
};
//
exports.postCliente = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(504).send({ error: error }) }
        conn.query('SELECT * FROM clientes WHERE EMAIL = ?', [req.body.EMAIL], (error, result) => {
            if (error) { return res.status(501).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({ mensagem: 'CLIENTE JÁ CADASTRADO' })
            } else {
                conn.query(
                    `INSERT INTO clientes (NAME, EMAIL, TEL) VALUES (?,?,?)`,
                    [req.body.NAME, req.body.EMAIL, req.body.TEL], 
                    (error, result) => {
                        conn.release();
                        if (error) { return res.status(503).send({ error: error }) }
                        const response = {   
                            mensagem: 'CLIENTE CADASTRADO COM SUCESSO',
                                ID: result.insertId,
                                NAME: req.body.NAME,
                                EMAIL: req.body.EMAIL,
                                TEL:req.body.TEL 
                        }
                        return res.status(201).send(response);
                    });
            }
        })
    });
};
//
exports.getIdCliente = (req, res, next) => {
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
                    ID: result[0].ID,
                    NAME: result[0].NAME,
                    EMAIL: result[0].EMAIL,
                    TEL: result[0].TEL
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
                req.body.NAME,                 
                req.body.EMAIL, 
                req.body.TEL,
                req.body.ID
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'CLIENTE ALTERADO COM SUCESSO',
                    CLIENTE:{
                                ID: req.body.ID,
                                NAME: req.body.NAME,                                
                                EMAIL: req.body.EMAIL,
                                TEL: req.body.TEL                                
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
            `DELETE FROM clientes WHERE id = ?`, [req.params.id],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(501).send({ error: error}) }
                const response = {
                    // ID: req.body.ID,
                    mensagem: 'CLIENTE DELETADO COM SUCESSO '
                }
                return res.status(202).send(response);
            }
        )
    });
};