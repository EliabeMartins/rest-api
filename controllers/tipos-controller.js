const mysql = require('../mysql').pool;

// 
exports.getAllTipos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM tipos;',
            (error, result, fields) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error}) }
                const response = result.map(tip => {
                        return {
                            ID: tip.ID,
                            NAME: tip.NAME
                        }
                    });
                
                return res.status(200).send(response);
            }
        )
    });
};