const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res)=>{
    const queryText = `SELECT * FROM "link" WHERE lang_id = ${req.params.id};`;
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
        console.log(result.rows)
    }).catch((error)=>{
        console.log('error in getLangRouter11', error)
        res.sendStatus(500);
    })
})

module.exports = router;