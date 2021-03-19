const mysql = require('../mysql').pool;

// 
exports.getServers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM servers;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    Quant: result.length,
                    SERVIDOR: result.map(serv => {
                        return {
                            ID: serv.ID,
                            NAME: serv.NAME,
                            IP: serv.IP,
                            SNMP: serv.SNMP_COMMUNITY,
                            request: {
                                tipo: "GET",
                                desc: "RETORNA TODOS OS SERVIDORES",
                                url: 'http://localhost:3000/servers/' + serv.ID
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
exports.putServers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'INSERT INTO servers (name, ip, snmp_community) VALUES (?,?,?)',
            [req.body.name, req.body.ip, req.body.snmp],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'SERVIDOR CRIADO COM SUCESSO',
                    NOVO_SERVIDOR:{
                                ID: result.insertId,
                                NAME: req.body.name,
                                IP: req.body.ip,
                                SNMP: req.body.snmp,
                                request: {
                                    tipo: "POST",
                                    desc: "INSERE NOVO SERVIDOR",
                                    url: 'http://localhost:3000/servers/'
                                }
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
                    SERVIDOR: {
                        ID: result[0].ID,
                        NAME: result[0].NAME,
                        IP: result[0].IP,
                        SNMP: result[0].SNMP_COMMUNITY,

                        request: {
                            tipo: "GET",
                            desc: "DADOS DO SERVIDOR " + result[0].NAME
                        }
                    }
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
                req.body.name, 
                req.body.ip, 
                req.body.snmp,
                req.body.id,
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'SERVIDOR ATUALIZADO COM SUCESSO',

                    SERVIDOR_ATUALIZADO:{
                        ID: req.body.id,
                        NAME: req.body.name,
                        IP: req.body.ip,
                        SNMP: req.body.snmp,
                        request: {
                            tipo: "GET",
                            desc: "ATUALIZA SERVIDOR",
                            // url: 'http://localhost:3000/servers/' + req.body.id
                        }
                    }
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
            `DELETE FROM servers WHERE id = ?`, [req.body.id],
            (error, resutl, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'SERVIDOR DELETADO COM SUCESSO',
                    request: {
                        tipo: 'DELETE',
                        desc: 'POR FAVOR INSERE UM SERVIDOR',
                        url: 'http://localhost:3000/servers',

                    }
                }
                return res.status(202).send(response);
            }
        )
    });
}