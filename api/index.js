const express = require("express");
const { Client } = require('pg');
const client = new Client('postgres://rvqqbeir:HYED63AHyvJc1vhjfl2FUMeZdBSXXD6w@lucky.db.elephantsql.com/rvqqbeir');

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// let connection;

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});


app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
    try {
        await client.connect();
        console.log('DB Connected');
    } catch (error) {
        console.log('ERROR connecting to DB', error);
    }

});

app.get('/api/get', async (req, res) => {
    try {
        let query = "SELECT * FROM data";
        console.log(req.query);
        if (req.query?.from) {
            query += ` WHERE timestamp > '${req.query.from}';`;
        } else {
            query += ";";
        }
        const result = await client.query(query)
        res.json({data:result.rows}).status(200);
    } catch (error) {
        console.log(error);
    }
})