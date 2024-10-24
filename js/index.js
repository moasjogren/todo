let UI = []

const todoList = document.querySelector('.todos')
const form = document.querySelector('.todoForm')

const localUI = localStorage.getItem('UI')
if (localUI !== null) UI = JSON.parse(localUI)

function appendTodo(todoText) {
  UI.push({ id: UI.length + 1, task: todoText, completed: false })
  renderUI()
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const inputText = data.get('todoText')

  if (inputText.trim() === '') return

  appendTodo(data.get('todoText'))
  form.reset()
})

function toggleItemCompleted(id) {
  const filtered = UI.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
  UI = filtered
  renderUI()
}

function deleteToDo(index) {
  const todoElement = document.querySelector(`.todo[data-id='${index}']`)
  todoElement.classList.add('fade')
  let filterArray = UI.filter((todo) => {
    return todo.id !== index
  })
  setTimeout(() => {
    UI = filterArray
    renderUI()
  }, 600)
}

function renderUI() {
  todoList.innerHTML = ''
  UI.forEach(({ id, task, completed }) => {
    const todoElement = document.createElement('div')
    todoElement.classList.add('todo')
    todoElement.setAttribute('data-id', id)
    if (completed) todoElement.classList.add('completed')
    todoElement.addEventListener('click', (e) => {
      if (e.target.classList[0] !== 'delete') toggleItemCompleted(id)
    })
    const todoText = document.createElement('p')
    todoText.classList.add('info')
    todoText.textContent = task
    const todoButton = document.createElement('p')
    todoButton.classList.add('delete')
    todoButton.textContent = 'X'
    todoButton.addEventListener('click', (e) => {
      if (e.target.classList[0] === 'delete') deleteToDo(id)
    })
    todoElement.appendChild(todoText)
    todoElement.appendChild(todoButton)
    todoList.appendChild(todoElement)
  })
  localStorage.setItem('UI', JSON.stringify(UI))
}

renderUI()
