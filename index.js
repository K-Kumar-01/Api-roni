const express = require("express");
const client = require('./client');
const assetdata = require('./api/assetdata');
const app = express();


const port = process.env.PORT || 8000;
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
    try {
        await client.connect();
        console.log('DB Connected');
    } catch (error) {
        console.log('ERROR connecting to DB', error);
    }

});

// let connection;

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/api/get", assetdata);