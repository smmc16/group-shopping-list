const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM shoppinglist ORDER BY id ASC;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error in GET', error);
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    const list = req.body
    const queryText = `INSERT INTO shoppinglist (name, quantity, unit) VALUES ($1, $2, $3);`;
    pool.query(queryText, [list.name, list.quantity, list.unit])
        .then((result) =>{
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in POST', error);
            res.sendStatus(500);
        })
})

router.put('/update/:id', (req, res) => {
    const item = req.params.id;
    const queryText = `UPDATE "shoppinglist" SET "purchased" = true WHERE "id" = $1;`
    pool.query(queryText, [item])
    .then((result) => {
        console.log(`Updated ${req.body.name} to purchased`);
        res.sendStatus(201);
    })
    .catch((error) =>{
        console.log('Error in PUT', error);
        res.sendStatus(500);
    })
})

router.delete('/remove/:id', (req, res) => {
    const item = req.params.id;
    const queryText = `DELETE FROM "shoppinglist" WHERE "id" = $1;`
    pool.query(queryText, [item])
    .then((result) => {
        console.log(`Deleted ${req.body.name} from database`);
        res.sendStatus(201);
    })
    .catch((error) =>{
        console.log('Error in PUT', error);
        res.sendStatus(500);
    })
})

router.put('/reset', (req, res) => {
    const queryText = `UPDATE "shoppinglist" SET "purchased" = false;`
    pool.query(queryText)
    .then((result) => {
        console.log(`Updated ${req.body.name} to purchased`);
        res.sendStatus(201);
    })
    .catch((error) =>{
        console.log('Error in PUT', error);
        res.sendStatus(500);
    })
})

router.delete('/clear', (req, res) => {
    const queryText = `DELETE FROM "shoppinglist";`
    pool.query(queryText)
    .then((result) => {
        console.log(`Deleted ${req.body.name} from database`);
        res.sendStatus(201);
    })
    .catch((error) =>{
        console.log('Error in PUT', error);
        res.sendStatus(500);
    })
})

module.exports = router;