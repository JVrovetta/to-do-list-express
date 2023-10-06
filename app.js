const express = require('express')
const checklistsRouter = require('./src/routes/checklist.js')

const app = express()
app.use(express.json())

app.use('/checklists', checklistsRouter)



app.listen(3001, () => {
  console.log('Servidor iniciado!');
})