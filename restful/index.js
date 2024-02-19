const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express();
consign().include('routes').include('utils').into(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator);





app.listen(4000, '127.0.0.1', ()=>{

    console.log('Servidor rodando!');

});