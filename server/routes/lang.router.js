const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get all languages that have been stored in the database, populate with collection of data
router.get('/', (req, res) => {
// find all languages and return them
pool.query(`SELECT * FROM "language";`).then((result)=>{
    res.send(result.rows);
    }).catch((error)=>{
        console.log('error in getLangRouter', error)
        res.sendStatus(500);
    })
});
router.get('/:id', (req, res) => {
    // find all languages and return them
    pool.query(`SELECT * FROM "language" where "id" = $1;`, [req.params.id]).then((result)=>{
        res.send(result.rows);
        }).catch((error)=>{
            console.log('error in getLangRouter', error)
            res.sendStatus(500);
        })
    });
    

router.post('/', (req, res) => {
    const newLanguage = req.body;
    const queryText = `INSERT INTO language ("name", "comfort", "notes")
                      VALUES ($1, $2, $3 );`;
    const queryValues = [
      newLanguage.name,
      newLanguage.comfort,
      newLanguage.notes,
    ];
    console.log(newLanguage)
    console.log(queryValues)
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing SELECT language query', err);
        res.sendStatus(500);
      });
  });

module.exports = router;