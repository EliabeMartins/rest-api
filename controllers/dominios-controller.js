const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');


// 
exports.getAllDominios = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM dominios;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = result.map(domin => {
                        return {
                            ID: domin.ID,
                            DOMINIO: domin.DOMINIO,
                            USER_USER: domin.NAME_USER,
                            IP_DB: domin.IP_BD,
                            BD_NAME: domin.NAME_BD
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
        if (err) { return res.status(504).send({ error: error }) }    
        conn.query('SELECT * FROM dominios WHERE NAME_USER = ?', [req.body.NAME_USER], (error, result) => {
            if (error) { return res.status(501).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({ mensagem: 'NOME DE USUÁRIO JÁ CADASTRADO' })
            } else {
                bcrypt.hash(req.body.PASSWORD_USER, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(502).send({ error: errBcrypt }) }
                    conn.query(
                        `INSERT INTO dominios (DOMINIO, NAME_USER, PASSWORD_USER, IP_BD, NAME_BD, PASSWORD_BD) VALUES (?,?,?,?,?,?)`,
                        [req.body.DOMINIO, req.body.NAME_USER, hash, req.body.IP_BD, req.body.NAME_BD, req.body.PASSWORD_BD], 
                        (error, result) => {
                            conn.release();
                            if (error) { return res.status(503).send({ error: error }) }
                            const response = {   
                                mensagem: 'DOMÍNIO CADASTRADO COM SUCESSO'
                            }
                            return res.status(201).send(response);
                        });
                }); 
            }
        });
    });
};
//
exports.getIdDominio = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM dominios WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error}) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'NÃO EXISTE DOMINIO COM ESSE ID'
                    })
                }
                const response = {
                    ID: result[0].ID,
                        DOMINIO: result[0].DOMINIO,
                        USER_USER: result[0].NAME_USER,
                        IP_DB: result[0].IP_BD,
                        BD_NAME: result[0].NAME_BD
                }
                return res.status(200).send(response);
            }
        )
    });
};
//
exports.deleteDominio = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            `DELETE FROM dominios WHERE id = ?`, [req.params.id],
            (error, resutl, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = {
                    mensagem: 'DOMINIO DELETADO COM SUCESSO'
                }
                return res.status(202).send(response);
            }
        )
    });
}