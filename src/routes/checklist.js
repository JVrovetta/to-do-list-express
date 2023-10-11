const express = require('express')
const Checklist = require('../models/checklist')
const Task = require('../models/task')

const router = express.Router()

// GET
router.get('/', async (req, res) => {
  try {
    const checklists = await Checklist.find({})
    res.status(200).render('pages/checklists/index', { checklists })
  }
  catch (err) {
    res.status(500).render('pages/error', { error: 'Erro ao exibir as listas :/' })
  }
})

router.get('/new', async (req, res) => {
  try {
    const checklist = new Checklist()
    res.status(200).render('pages/checklists/new', { checklist })
  }
  catch (err) {
    res.status(500).render('pages/error', { error: 'Erro ao carregar o formulário :|' })
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id)
    res.status(200).render('pages/checklists/edit', { checklist })
  }
  catch (err) {
    res.status(500).render('pages/error', { error: 'Erro ao carregar o formulário :|' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id).populate('tasks')
    res.status(200).render('pages/checklists/show', { checklist })
  }
  catch (err) {
    res.status(500).render('pages/error', { error: 'Erro ao exibir a lista :(' })
  }
})

// POST
router.post('/', async (req, res) => {
  const { name } = req.body.checklist
  const checklist = new Checklist({ name })

  try {
    await checklist.save()
    res.redirect('/checklists')
  }
  catch (err) {
    const errors = err.errors
    res.status(422).render('pages/checklists/new', { checklist: { ...checklist, errors } })
  }
})

// PUT
router.put('/:id', async (req, res) => {
  const { name } = req.body.checklist
  const checklist = await Checklist.findById(req.params.id)

  try {
    await checklist.updateOne({ name })
    res.status(200).redirect(`/checklists/${checklist.id}`)
  }
  catch (err) {
    const errors = err.errors
    res.status(422).render('pages/checklists/edit', { checklist: { ...checklist, errors } })
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Checklist.findByIdAndRemove(req.params.id)
    await Task.deleteMany({ checklist: req.params.id })
    res.status(200).redirect('/checklists')
  }
  catch (err) {
    res.status(500).render('pages/error', { error: 'Erro ao remover a lista :(' })
  }
})

module.exports = router