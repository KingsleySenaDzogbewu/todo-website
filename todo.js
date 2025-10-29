let todoList = [];

const savedTodos = localStorage.getItem('todoList');
if (savedTodos) {
  todoList = JSON.parse(savedTodos)
  renderTodoList();
}

function renderTodoList() {
  let html = ''
  for(let i = 0; i < todoList.length; i++) {
    let todo = todoList[i];

    html += `
      <div class="todo-name">${todo.name}</div>
      <div class="todo-date">${todo.date}</div>
      <div>
        <button class = "delete-button"
         onclick = "
        todoList.splice(${i}, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        renderTodoList() 
        ">Delete</button>
        <button class="edit-button" 
        onclick=" editButton(${i})">Edit</button>
      </div>
    `;
  }
  document.querySelector('.todo-list').innerHTML = html;
  localStorage.removeItem('todoList');

  
}

function addButton () {
  const add = document.querySelector('.add-button')
  add.addEventListener('click', () => {
    const nameInput = document.querySelector('.todo-input');
    const dateInput = document.querySelector('.date-input');

    const name = nameInput.value;
    const date = dateInput.value;

    if (name.trim() === '' || date === '') {
      return;
    }

    todoList.push({
      name,
      date
    });
    nameInput.value = '';
    dateInput.value = '';

    localStorage.setItem('todoList', JSON.stringify(todoList));

    renderTodoList();
  });
}

function editButton(index) {
  const todo = todoList[index];

  document.querySelector('.todo-input').value = todo.name;
  document.querySelector('.date-input').value = todo.date;

  todoList.splice(index, 1);
  renderTodoList();

  localStorage.setItem('todoList', JSON.stringify(todoList));

}
addButton();

