const todoForm = document.getElementById('todo-form') as HTMLFormElement | null;
const todoInput = todoForm?.querySelector<HTMLInputElement>('input');
const todoOutput = document.querySelector<HTMLUListElement>('.todo-output');

type TodoItem = {
  id: string,
  name: string | undefined
};

const randomId = () => {
  return Math.ceil(Math.random()*1000000000).toString();
}

const addTodo = (todo: TodoItem) => {
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

  todoOutput?.insertAdjacentHTML('beforeend', html);
}

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));  
};

const loadTodos = (): TodoItem[] => {
  const todoJSON = localStorage.getItem('todos');

  if (todoJSON === null) return [];

  return JSON.parse(todoJSON);
}

const todos = loadTodos();

todoForm?.addEventListener('submit', function(event) {
  event.preventDefault();

  if (todoInput?.value.trim() === '') return;

  const todo: TodoItem = {
    id: randomId(),
    name: todoInput?.value,
  }

  todos.push(todo);

  addTodo(todo);

  saveTodos();

  this.reset();
});

todoOutput?.addEventListener('click', function(event) {
  const target = event.target as HTMLElement;

  if (!target.matches('i')) return;

  const deleteEl = target.closest<HTMLLIElement>('li');

  const todoId = deleteEl?.dataset.id;

  const deleteTodoIndex = todos.findIndex(todo => todo.id === todoId);

  todos.splice(deleteTodoIndex, 1);

  deleteEl?.remove();

  saveTodos();
});

const displaySavedTodos = () => {
  if (todos.length === 0) return;

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

  todoOutput?.insertAdjacentHTML('afterbegin', html);
};

displaySavedTodos();
