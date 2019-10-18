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
    
/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;