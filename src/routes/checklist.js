const express = require('express')

const router = express.Router()

// GET
router.get('/', (req, res) => {
  console.log('GET');
  res.send()
})

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send(`GET/id => ${req.params.id}`)
})

// POST
router.post('/', (req, res) => {
  console.log('POST');
  console.log(req.body)
  res.status(200).json(req.body)
})

// PUT
router.put('/:id', (req, res) => {
  console.log(req.body);
  res.send(`PUT/id => ${req.params.id}`)
})

// DELETE
router.delete('/:id', (req, res) => {
  console.log(req.body);
  res.send(`DELETE/id => ${req.params.id}`)
})
module.exports = router