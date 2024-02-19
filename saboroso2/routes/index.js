var conn = require('../inc/db')
var express = require('express');
var router = express.Router();
var menus = require('../inc/menus');
const { render } = require('ejs');
var reservations = require('../inc/reservations');

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results => {
    res.render('index', {
      title: 'Restaurante Saboroso',
      menus: results,
      isHome: true
    })
  })
});
 router.get('/contacts', function(req, res, next) {
  res.render('contacts', {
    title: 'Contatos',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi!',
    isHome: false
  })
})
router.get('/menus', function(req, res, next) {

  menus.getMenus().then(results => {
    res.render('menus', {
      title: 'Cardápio',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results,
      isHome: false
    })
  })

})
router.get('/reservations', function(req, res, next) {

  reservations.render(req, res)

})
router.post('/reservations', function(req, res, next) {
  if (!req.body.name) {
    reservations.render(req, res, "Digite o nome")
  }else if(!req.body.email){
    reservations.render(req, res, "Digite o e-mail")
  }else if(!req.body.people){
    reservations.render(req, res, "Digite o número de pessoas")
  }else if(!req.body.date){
    reservations.render(req, res, "Selecione a data")
  }else if(!req.body.time){
    reservations.render(req, res, "Selecione a hora")
  }else{
    reservations.save(req.body).then(results => {
      reservations.render(req, res, null, "Reserva efetuada com sucesso!")
      req.body = {}
    }).catch(error => {
      reservations.render(req, res, error.message)
    })
  }
  
  
})
router.get('/services', function(req, res, next) {
  res.render('services', {
    title: 'Serviços',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!!',
    isHome: false
  })
})

module.exports = router;
