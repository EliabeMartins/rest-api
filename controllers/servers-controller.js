const mysql = require('../mysql').pool;

// 
exports.getServers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM servers;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = result.map(serv => {
                        return {
                            ID: serv.ID,
                            NAME: serv.NAME,
                            IP: serv.IP,
                            SNMP: serv.SNMP_COMMUNITY
                        }
                    });
                return res.status(200).send(response);
            }
        )
    });
};
//
exports.postServers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'INSERT INTO servers (name, ip, snmp_community) VALUES (?,?,?)',
            [req.body.NAME, req.body.IP, req.body.SNMP],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'SERVIDOR CRIADO COM SUCESSO',
                    NOVO_SERVIDOR:{
                                ID: result.insertId,
                                NAME: req.body.NAME,
                                IP: req.body.IP,
                                SNMP: req.body.SNMP                
                    }
                }
                return res.status(201).send(response);
            }
        )
    });
};
//
exports.getIdServer = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM servers WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error}) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado Servidor com esse ID'
                    })
                }
                const response = {
                    ID: result[0].ID,
                        NAME: result[0].NAME,
                        IP: result[0].IP,
                        SNMP: result[0].SNMP_COMMUNITY
                }
                return res.status(200).send(response);
            }
        )
    });
};
//
exports.patchServer  = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            `UPDATE servers
                SET   NAME = ?,
                      IP   = ?,
            SNMP_COMMUNITY = ?
                WHERE  id = ?`,
            [                
                req.body.NAME, 
                req.body.IP, 
                req.body.SNMP,
                req.body.ID,
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'SERVIDOR ATUALIZADO COM SUCESSO',
                    ID: req.body.ID,
                        NAME: req.body.NAME,
                        IP: req.body.IP,
                        SNMP: req.body.SNMP
                }
                return res.status(202).send(response);
            }
        )
    });
};
//
exports.deleteServer = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            `DELETE FROM servers WHERE id = ?`, [req.params.id],
            (error, resutl, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'SERVIDOR DELETADO COM SUCESSO'
                }
                return res.status(202).send(response);
            }
        )
    });
}