const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
//const expressValidator = require('express-validator')
//const { body, validationResult } = require('express-validator')

let app = express()

app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

//app.use(expressValidator())

consign().include('routesC').include('utilsC').into(app)

app.listen(5000, '127.0.0.1', ()=>{//função de callback
    console.log('Servidor Criado e rodando')
})


 