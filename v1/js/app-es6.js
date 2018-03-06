(function () {
  let todos = [];
  let checked = '';
  const inputTodo = document.getElementById('input-todo');
  const todoList = document.getElementById('todo-list');

  function rendarTodo() {
    let html = '';
    todos.forEach((todo) => {
      checked = todo.completed ? 'checked' : '';
      html += `<li class="list-group-item">
       <div class="hover-anchor">
         <a class="hover-action text-muted">
           <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${todo.id}"></span>
         </a>
         <label class="i-checks" for="${todo.id}">
           <input type="checkbox" id="${todo.id}" ${checked}><i></i>
           <span>${todo.content}</span>
         </label>
       </div>
      </li>`;
      // html += '<li class="list-group-item">';
      // html += ' <div class="hover-anchor">';
      // html += '   <a class="hover-action text-muted">';
      // html += '     <span class="glyphicon glyphicon-remove-circle pull-right" data-id="' + todo.id + '"></span>';
      // html += '   </a>';
      // html += '   <label class="i-checks" for="' + todo.id + '">';
      // html += '     <input type="checkbox" id="' + todo.id + '" ' + checked + '><i></i>';
      // html += '     <span>' + todo.content + '</span>';
      // html += '   </label>';
      // html += ' </div>';
      // html += '</li>';
    });
    todoList.innerHTML = html;
  }
  const getIds = () => todos.map(todo => todo.id);

  const getMax = () => (todos.length ? Math.max(...getIds()) + 1 : 1);

  const addTodo = (newTodo) => {
    todos = [newTodo].concat(todos);
  };

  const delTodo = (id) => {
    todos = todos.filter(todo => todo.id !== +id);
  };

  const changeComplete = (id) => {
    todos = todos.map((todo) => {
      if (todo.id === +id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    console.log(['toggle'], todos);
  };

  window.addEventListener('load', () => {
    todos = [
      { id: 3, content: 'HTML', completed: true },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false }
    ];
    rendarTodo();
  });

  inputTodo.addEventListener('keyup', (e) => {
    if (!e.currentTarget.value || e.keyCode !== 13) return;
    addTodo({ id: getMax(), content: e.currentTarget.value, completed: false });
    e.currentTarget.value = '';
    rendarTodo();
  });

  todoList.addEventListener('click', (e) => {
    if (!e.target) return;
    if (e.target.hasAttribute('data-id')) {
      delTodo(e.target.getAttribute('data-id'));
      rendarTodo();
    } else if (e.target.nodeName === 'INPUT') {
      changeComplete(e.target.getAttribute('id'));
      rendarTodo();
    }
  });
}());
