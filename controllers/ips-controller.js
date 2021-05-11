const mysql = require('../mysql').pool;

// SERVIDORES
exports.getServIps = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM ipsserv WHERE IDSERV = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = result.map(ipserv => {
                    return {
                        ID: ipserv.ID,
                        IP_INTERNO: ipserv.IPINTERNOSERV,
                        IP_EXTERNO: ipserv.IPEXTERNOSERV
                        
                    }
                });
                return res.status(200).send(response);
            }
        )
    });
};
//
exports.postServIps = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(504).send({ error: error }) }
        conn.query('SELECT * FROM ipsserv WHERE IPEXTERNOSERV = ?', [req.body.IPEXTERNOSERV], (error, result) => {
            if (error) { return res.status(501).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({ mensagem: 'IP EXTERNO JÁ CADASTRADO' })
            } else {
                conn.query(
                    `INSERT INTO ipsserv (IDSERV,IPEXTERNOSERV, IPINTERNOSERV) VALUES (?,?,?)`,
                    [req.body.IDSERV, req.body.IPEXTERNOSERV, req.body.IPINTERNOSERV], 
                    (error, result) => {
                        conn.release();
                        if (error) { return res.status(503).send({ error: error }) }
                        const response = {   
                            mensagem: 'IPS CADASTARDO COM SUCESSO',
                                ID: result.insertId,
                                IDSERV: req.body.IDSERV,
                                IPEXTERNO: req.body.IPEXTERNOSERV,
                                IPINTERNO: req.body.IPINTERNOSERV
                        }
                        return res.status(201).send(response);
                    });
            }
        })
    });
};
//
exports.getIdServ = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM ipsserv WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error })}
                if (result.length == 0) {
                    return res.status(404).send({mensagem: 'NÃO EXISTE DOMINIO COM ESSE ID'});
                }
                let response = {
                    ID: result[0].ID,
                    IP_INTERNO: result[0].IPINTERNOSERV,
                    IP_EXTERNO: result[0].IPEXTERNOSERV
                    
                }
                return res.status(200).send(response);
            }
        )
    });
};
//
exports.patchIpServ = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            `UPDATE ipsserv
                SET IDSERV             = ?,
                    IPINTERNOSERV      = ?,
                    IPEXTERNOSERV      = ?
                WHERE ID = ?`,
            [
                req.body.IDSERV, 
                req.body.IPINTERNOSERV,                 
                req.body.IPEXTERNOSERV,
                req.body.ID
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'ENDEREÇO DE IP ALTERADO COM SUCESSO',
                    IPS:{
                                ID: req.body.ID,
                                IDSERV:  req.body.IDSERV,
                                IP_INTERNO: req.body.IPINTERNOSERV,                                
                                IP_EXTERNO: req.body.IPEXTERNOSERV                              
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};
//
exports.delIpServ = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM ipsserv WHERE id = ?;`, 
            [req.params.id],
            (error, resutl, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'IPS DELETADO COM SUCESSO'
                }
                return res.status(202).send(response);
            }
        )
    });
};

// DOMINIOS
exports.getDomIps = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM ipsdom WHERE IDDOM = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = result.map(ipdom => {
                    return {
                        ID: ipdom.ID,
                        IP_EXTERNO: ipdom.IPEXTERNODOM
                    }
                });
                return res.status(200).send(response);
            }
        )
    });
};
//
exports.postDomIps = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(504).send({ error: error }) }
        conn.query('SELECT * FROM ipsdom WHERE IPEXTERNODOM = ?', [req.body.IPEXTERNODOM], (error, result) => {
            if (error) { return res.status(501).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({ mensagem: 'IP EXTERNO JÁ CADASTRADO' })
            } else {
                conn.query(
                    `INSERT INTO ipsdom (IDDOM, IPEXTERNODOM) VALUES (?,?)`,
                    [req.body.IDDOM, req.body.IPEXTERNODOM], 
                    (error, result) => {
                        conn.release();
                        if (error) { return res.status(503).send({ error: error }) }
                        const response = {   
                            mensagem: 'IPS CADASTARDO COM SUCESSO',
                                ID: result.insertId,
                                IDDOM: req.body.IDDOM,
                                IP_EXTERNO: req.body.IPEXTERNODOM
                        }
                        return res.status(201).send(response);
                    });
            }
        })
    });
};
//
exports.getIdDom = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM ipsdom WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'NÃO EXISTE IP EXTERNO COM ESSE ID'
                    })
                }
                let response = {
                    ID: result[0].ID,
                    IP_EXTERNO: result[0].IPEXTERNODOM
                }
                return res.status(200).send(response);
            }
        )
    });
};
//
exports.patchIpDom = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            `UPDATE ipsdom
                SET IDDOM             = ?,
                    IPEXTERNODOM      = ?
                WHERE ID = ?`,
            [
                req.body.IDDOM,              
                req.body.IPEXTERNOSERV,
                req.body.ID
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'ENDEREÇO DE IP ALTERADO COM SUCESSO',
                    IPS:{
                                ID: req.body.ID,
                                IDSERV:  req.body.IDDOM,                             
                                IP_EXTERNO: req.body.IPEXTERNOSERV                              
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};
//
exports.delIpDom = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM ipsdom WHERE id = ?;`, 
            [req.params.id],
            (error, resutl, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'IP DELETADO COM SUCESSO'
                }
                return res.status(202).send(response);
            }
        )
    });
};
