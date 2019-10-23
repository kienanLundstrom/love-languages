const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res)=>{
    const queryText = `SELECT * FROM "link" WHERE "lang_id" = ${req.params.id};`;
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
        console.log('link get result rows console', result.rows)
    }).catch((error)=>{
        console.log('error in get link router', error)
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    const newLink = req.body;
    const queryText = `INSERT INTO link ("links", "lang_id", "user_id") VALUES ($1, $2, $3);`;
    const queryValues = [
      newLink.link,
      newLink.lang_id,
      newLink.user_id,
    ];
    console.log('new link console', newLink)
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('error in router . post for links', err);
        res.sendStatus(500);
      });
})
module.exports = router;