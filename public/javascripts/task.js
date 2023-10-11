const tasks = document.querySelectorAll("[data-func='setTagAsDone']")
tasks.forEach(element => {
  element.addEventListener('change', async (ev) => {
    ev.preventDefault
    const id = element.dataset.taskId

    try {
      const headers = new Headers({ 'Content-Type': 'application/json' })
      const body = JSON.stringify({ task: { done: element.checked } })
      const data = await fetch(`/tasks/${id}?_method=put`, { headers, body, method: 'PUT' }).then(res => res.json())

      if (data.task.done) {
        element.checked = true
        element.parentNode.classList.add('has-text-success')
        element.parentNode.classList.add('is-italic')
      } else {
        element.checked = false
        element.parentNode.classList.remove('has-text-success')
        element.parentNode.classList.remove('is-italic')
      }
    } catch (err) {
      alert('ERRO: erro ao atualizar a tarefa')
    }
  })
})