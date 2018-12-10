const express = require('express');
const db = require('./db');
const user = require('./routes/user');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const url = 'mongodb://localhost:27017/UCUCoinDB';
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/user', user);

db.connect(url, (err) => {
    if (err) {
        console.log('Unable to connect to Mongo.', err);
        process.exit(1)
    } else {
        console.log('Connected successfully to server');
        app.listen(port, () => {
            console.log('Our Server is running')
        })
    }
})