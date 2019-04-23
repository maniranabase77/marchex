var express = require('express');
const knex = require('../db/knex')
var router = express.Router();

router.get('/', async function(req, res, next) {
  const rows = await knex('contacts')
  return res.json(rows)
});

module.exports = router;
