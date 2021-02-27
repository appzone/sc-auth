const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const API_SERVICE_URL = "https://api.acropolisasia.com/";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/sc-auth/', (req, res) => {
    res.json({"message": "Hello world - Auth"});
});

require('./app/routes/auth.routes.js')(app);
// Proxy endpoints
app.use('/sc-auth/proxy', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/sc-auth/proxy`]: '',
    },
 }));

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});