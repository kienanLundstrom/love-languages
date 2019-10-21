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

    router.delete('/:id', (req, res)=> {
        const queryText = 'DELETE FROM language WHERE id=$1';
        pool.query(queryText, [req.params.id])
        .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing SELECT plant query', err);
      res.sendStatus(500);
    });
    })

router.post('/', (req, res) => {
    const newLanguage = req.body;
    const queryText = `INSERT INTO language ("name", "comfort", "notes", "user_id")
                      VALUES ($1, $2, $3, $4);`;
    const queryValues = [
      newLanguage.name,
      newLanguage.comfort,
      newLanguage.notes,
      newLanguage.user,
    ];
    console.log(newLanguage)
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing SELECT language1 query', err);
        res.sendStatus(500);
      });
  });

  router.put('/', (req, res) => {
    const updatedLanguage = req.body;
  
    const queryText = `UPDATE language SET "name" = $1, "comfort" = $2, "notes" = $3 WHERE id=$4;`;
  
    const queryValues = [
        updatedLanguage.name,
        updatedLanguage.comfort,
        updatedLanguage.notes,
        updatedLanguage.id,
    ];
  
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error completing SELECT languages2 query', err);
        res.sendStatus(500);
      });
  });
module.exports = router;