const express = require("express")
const client = require('../client');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let query = "SELECT * FROM data";
        if (req.query?.from) {
            query += ` WHERE timestamp > '${req.query.from}';`;
        } else {
            query += ";";
        }
        const result = await client.query(query)
        res.json({ data: result.rows }).status(200);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;