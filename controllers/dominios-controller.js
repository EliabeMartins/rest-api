const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');


// 
exports.getAllDominios = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM dominios WHERE IDSERVER = ?;',
            [req.params.id],
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = result.map(domin => {
                    return {
                        ID: domin.ID,
                        DOMINIO: domin.DOMINIO,
                        NAMEUSER: domin.NAMEUSER,
                        IPBD: domin.IPBD,
                        NAMEBD: domin.NAMEBD
                    }
                });

                return res.status(200).send(response);
            }
        )
    });
};
//
exports.postDominio = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) {return res.status(504).send({ error: error })}
        conn.query('SELECT * FROM dominios WHERE NAMEUSER = ?', [req.body.NAMEUSER], (error, result) => {
            if (error) { return res.status(501).send({ error: error }) }
            if (result.length > 0) {res.status(409).send({ mensagem: 'NOME DE USUÁRIO JÁ CADASTRADO' })
            } else {
                bcrypt.hash(req.body.PASSWORDUSER, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(502).send({ error: errBcrypt }) }
                    else {
                        hash2 = bcrypt.hashSync(req.body.PASSWORDBD, 10);
                        conn.query(
                            `INSERT INTO dominios (IDSERVER, DOMINIO, NAMEUSER, PASSWORDUSER, IPBD, NAMEBD, PASSWORDBD) VALUES (?,?,?,?,?,?,?)`,
                            [req.body.IDSERVER, req.body.DOMINIO, req.body.NAMEUSER, hash, req.body.IPBD, req.body.NAMEBD, hash2],
                            (error, result) => {
                                conn.release();
                                if (error) { return res.status(503).send({ error: error }) }
                                const response = {
                                    mensagem: 'DOMÍNIO CADASTRADO COM SUCESSO'
                                }
                                return res.status(201).send(response);
                            });
                    }

                });
            }
        });
    });
};
//
exports.getIdDominio = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM dominios WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'NÃO EXISTE DOMINIO COM ESSE ID'
                    })
                }
                let response = {
                    ID: result[0].ID,
                    DOMINIO: result[0].DOMINIO,
                    NAMEUSER: result[0].NAMEUSER,
                    IPBD: result[0].IPBD,
                    NAMEBD: result[0].NAMEBD
                }
                return res.status(200).send(response);
            }
        )
    });
};
//
exports.deleteDominio = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM dominios WHERE id = ?;`, 
            [req.params.id],
            (error, resutl, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'DOMINIO DELETADO COM SUCESSO'
                }
                return res.status(202).send(response);
            }
        )
    });
}