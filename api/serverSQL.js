const express = require("express");
const mysql = require('mysql2/promise');
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        // host: <host_name>,
        // user: <user_name>,
        // password: <pwd>,
        // database: <db_name>,
    },
}

let connection;



app.get("/", (req, res) => {
    res.json({ message: "ok" });
});
app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);

    try {
        connection = await mysql.createConnection({
            ...config.db,
        })
        console.log('DB connected')
    } catch (error) {
        console.log(error);
        console.log("cant connect to db")
    }
});

app.get('/api/get', async (req, res) => {
    try {
        let query = "SELECT * FROM data";
        console.log(req.query)
        if (req.query?.from) {
            query+=` WHERE timestamp > '${req.query.from}';`;
        }else{
            query+=";";
        }
        console.log(query);
        const [rows, fields] = await connection.execute(query);
        res.json({data:rows}).status(200);
    } catch (error) {
        console.log(error);
    }
})