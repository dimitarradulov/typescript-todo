"use strict";
const todoForm = document.getElementById('todo-form');
const todoInput = todoForm === null || todoForm === void 0 ? void 0 : todoForm.querySelector('input');
const todoOutput = document.querySelector('.todo-output');
const randomId = () => {
    return Math.ceil(Math.random() * 1000000000).toString();
};
const addTodo = (todo) => {
    const html = `
    <li
    class="list-group-item d-flex justify-content-between align-items-center" data-id=${todo.id}
    >
      <div>${todo.name}</div>
      <div class="delete-todo" style="cursor: pointer">
        <i class="bi bi-trash-fill"></i>
      </div>
    </li>
  `;
    todoOutput === null || todoOutput === void 0 ? void 0 : todoOutput.insertAdjacentHTML('beforeend', html);
};
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
const loadTodos = () => {
    const todoJSON = localStorage.getItem('todos');
    if (todoJSON === null)
        return [];
    return JSON.parse(todoJSON);
};
const todos = loadTodos();
todoForm === null || todoForm === void 0 ? void 0 : todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if ((todoInput === null || todoInput === void 0 ? void 0 : todoInput.value.trim()) === '')
        return;
    const todo = {
        id: randomId(),
        name: todoInput === null || todoInput === void 0 ? void 0 : todoInput.value,
    };
    todos.push(todo);
    addTodo(todo);
    saveTodos();
    this.reset();
});
todoOutput === null || todoOutput === void 0 ? void 0 : todoOutput.addEventListener('click', function (event) {
    const target = event.target;
    if (!target.matches('i'))
        return;
    const deleteEl = target.closest('li');
    const todoId = deleteEl === null || deleteEl === void 0 ? void 0 : deleteEl.dataset.id;
    const deleteTodoIndex = todos.findIndex(todo => todo.id === todoId);
    todos.splice(deleteTodoIndex, 1);
    deleteEl === null || deleteEl === void 0 ? void 0 : deleteEl.remove();
    saveTodos();
});
const displaySavedTodos = () => {
    if (todos.length === 0)
        return;
    const html = `
    ${todos.map(todo => `
      <li
      class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>${todo.name}</div>
        <div class="delete-todo" style="cursor: pointer">
          <i class="bi bi-trash-fill"></i>
        </div>
      </li>
    `).join('')}
  `;
    todoOutput === null || todoOutput === void 0 ? void 0 : todoOutput.insertAdjacentHTML('afterbegin', html);
};
displaySavedTodos();
