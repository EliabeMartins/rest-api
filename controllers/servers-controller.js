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
                    quantidade: result.length,
                    servers: result.map(serv => {
                        return {
                            id: serv.ID,
                            name: serv.name,
                            ip: serv.ip,
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
exports.postServers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'INSERT INTO servers (name, ip) VALUES (?,?)',
            [req.body.name, req.body.ip],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'SERVIDOR CRIADO COM SUCESSO',
                    newServe:{
                        ID: result.ID,
                        name: req.body.name,
                        ip: req.body.ip,
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
                    Serve: {
                        ID: result[0].ID,
                        NAME: result[0].name,
                        IP: result[0].ip,
                        request: {
                            tipo: "GET",
                            desc: "RETORNA DADOS DE UM SERVIDOR",
                            url: 'http://localhost:3000/servers'
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
                SET name = ?, 
                    ip   = ? 
                WHERE id = ?`,
            [
                req.body.name, 
                req.body.ip, 
                req.body.id
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'SERVIDOR ALTERADO COM SUCESSO',
                    serveAtualizado:{
                        ID: req.body.ID,
                        name: req.body.name,
                        ip: req.body.ip,
                        request: {
                            tipo: "GET",
                            desc: "ATUALIZA SERVIDOR",
                            url: 'http://localhost:3000/servers/' + req.body.ID
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
                        tipo: 'POST',
                        desc: 'INSERE UM SERVER',
                        url: 'http://localhost:3000/servers',

                    }
                }
                return res.status(202).send(response);
            }
        )
    });
}