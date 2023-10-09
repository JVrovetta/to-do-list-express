const express = require('express')
const Checklist = require('../models/checklist')

const router = express.Router()

// GET
router.get('/', async (req, res) => {
  try {
    const checklists = await Checklist.find({})
    res.status(200).json(checklists)
  }
  catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id)
    res.status(200).json(checklist)
  }
  catch (err) {
    res.status(404).json(err)
  }
})

// POST
router.post('/', async (req, res) => {
  try {
    const { name } = req.body
    const checklist = await Checklist.create({ name })
    res.status(200).json(checklist)
  }
  catch (err) {
    res.status(422).json(err)
  }
})

// PUT
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body
    const upChecklist = await Checklist.findByIdAndUpdate(req.params.id, { name }, { new: true })
    res.status(200).json(upChecklist)
  }
  catch (err) {
    res.status(422).json(err)
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const delChecklist = await Checklist.findByIdAndRemove(req.params.id)
    res.status(200).json(delChecklist)
  }
  catch (err) {
    res.status(422).json(err)
  }
})

module.exports = router