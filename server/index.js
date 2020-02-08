const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const globalConfig = require('./config');
const loader = require('./loader');

let app = new express();

// let corsOptions = {
//     origin: 'http://localhost:8080',
//     credentials: true,
//     maxAge: '1728000'
// }
// app.use(cors(corsOptions));
app.use(cookie());

app.use(express.static(__dirname + '/page'));

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json;charset=utf-8');
    // res.header("Access-Control-Allow-Credentials", true);
    next();
});

loader.init(app);

app.listen(globalConfig.port, () => {
    console.log('server running at 12306');
});