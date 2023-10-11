const express = require('express')
const Checklist = require('../models/checklist')
const Task = require('../models/task')

const checklistDependentRouter = express.Router()
const nonDependentRouter = express.Router()

// GET
checklistDependentRouter.get('/:id/tasks/new', async (req, res) => {
  try {
    const task = new Task()
    res.status(200).render('pages/tasks/new', { task, checklistId: req.params.id })
  } catch (err) {
    res.status(422).render('pages/error', { error: 'Não foi possível criar a nova tarefa :(' })
  }
})

// POST
checklistDependentRouter.post('/:id/tasks', async (req, res) => {
  const { name } = req.body.task
  const checklist = await Checklist.findById(req.params.id)
  const task = new Task({ name, checklist })

  try {
    await task.save()
    checklist.tasks.push(task)
    await checklist.save()
    res.status(200).redirect(`/checklists/${req.params.id}`)
  }
  catch (err) {
    const errors = err.errors
    res.status(422).render('pages/tasks/new', { task: { ...task, errors }, checklistId: req.params.id })
  }
})

// PUT
nonDependentRouter.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body.task, { returnDocument: 'after' })
    res.status(200).json({ task },)
  }
  catch (err) {
    const errors = err.errors
    res.status(422).json({ task: { ...errors } })
  }
})

// DELETE
nonDependentRouter.delete('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id)
  const checklist = await Checklist.findById(task.checklist)

  try {
    await task.deleteOne()
    checklist.tasks.splice(checklist.tasks.indexOf(task._id), 1)
    await checklist.save()
    res.status(200).redirect(`/checklists/${checklist.id}`)
  }
  catch (err) {
    res.status(422).render('pages/error', { error: 'Não foi possível remover tarefa :(' })
  }
})

module.exports = {
  checklistDependent: checklistDependentRouter,
  nonDependent: nonDependentRouter
}