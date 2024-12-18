const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser")
const db = require('./db');

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

app.listen(8080,()=>{
    console.log("Connected to port 8080");
})

app.get('/test-db', (req, res) => {
    db.query('SELECT 1', (err, results) => {
        if (err) {
            return res.status(500).send('Database connection failed');
        }
        res.send('Database connection successful');
    });
});

const authRoutes = require("./routes/Auth");
const weatherRoute = require("./routes/Weather");

app.use("/",authRoutes)
app.use("/",weatherRoute);