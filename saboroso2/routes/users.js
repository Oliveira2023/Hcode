var conn = require('../inc/db')
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  conn.query('select *from tb_users', function(err, results) {
    if (err) res.send(err)
    res.send(results)
  })

  // conn.query('select * from users', function(err, results) {
  //   if (err) res.send(err)
  //   res.send(results)
  // })
});

module.exports = router;
