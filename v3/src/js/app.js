import axios from 'axios';

(function () {
  let todos = [];
  let status = 'all';
  const inputTodo = document.getElementById('input-todo');
  const todoList = document.getElementById('todo-list');
  const btnAllComplete = document.getElementById('chk-allComplete');
  const completedNumber = document.getElementById('completedTodos');
  const activeNumber = document.getElementById('activeTodos');
  const btnClear = document.getElementById('btn-removeCompletedTodos');
  const nav = document.querySelector('.nav');
  const navItem = document.querySelectorAll('.nav li');

  const activeLength = () => {
    let plural = '';
    activeNumber.innerHTML = todos.filter(todo => !todo.completed).length;
    if (todos.filter(todo => !todo.completed).length > 1) {
      plural = 's';
    }
    activeNumber.nextSibling.textContent = ` item${plural} left`;
  };

  const completedLength = () => {
    completedNumber.innerHTML = todos.filter(todo => todo.completed).length;
  };

  const renderTodos = () => {
    // 조건에 따른 필터링
    const _todos = todos.filter(todo => {
      let res = todo;
      if (status === 'completed') {
        res = todo.completed;
      } else if (status === 'active') {
        res = !todo.completed;
      }
      return res;
    });

    let html = '';
    _todos.forEach(todo => {
      const checked = todo.completed ? 'checked' : '';
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
    });
    todoList.innerHTML = html;

    activeLength();
    completedLength();
  };

  const getTodos = () => {
    axios.get('/todos')
      .then(({ data }) => {
        todos = data;
        renderTodos();
        console.log('[GET]\n', todos);
      })
      .catch(err => console.log(err.response));
  };

  const getIds = () => todos.map(todo => todo.id);

  const getMax = () => (todos.length ? Math.max(...getIds()) + 1 : 1);

  const addTodo = content => {
    const payload = { id: getMax(), content, completed: false }
    axios.post('/todos', payload) // payload: { id, content, completed }
      .then(({ data }) => {
        console.log('[ADD]\n', data);
        getTodos();
      })
      .catch(err => console.log(err));
  };

  const delTodo = id => {
    axios.delete(`/todos/id/${id}`)
      .then(({ data }) => {
        console.log('[DEL]\n', data);
        getTodos();
      })
      .catch(err => console.log(err));
  };

  const toggleTodoComplete = id => {
    // const payload = todos.filter(todo => todo.id === +id);
    // console.log(!payload[0].completed);

    const { completed } = todos.find(todo => todo.id === +id);

    axios.patch(`/todos/id/${id}`, { completed: !completed }) // payload: { completed }
      .then(({ data }) => {
        console.log(['TOGGLE'], data);
        getTodos();
      })
      .catch(err => console.log(err));
  };

  const toggleAllComplete = obj => {
    axios.patch('/todos', { completed: obj.checked }) // payload: { completed }
      .then(({ data }) => {
        console.log(['TOGGLE_ALL'], data);
        getTodos();
      })
      .catch(err => console.log(err));
  };

  const clearCompleted = () => {
    axios.delete('/todos/completed')
      .then(({ data }) => {
        console.log(['CLEAR_COMP'], data);
        getTodos();
      })
      .catch(err => console.log(err));
    renderTodos();
  };

  window.addEventListener('load', getTodos);

  inputTodo.addEventListener('keyup', e => {
    if (!e.currentTarget.value || e.keyCode !== 13) return;
    addTodo(e.currentTarget.value);
    e.currentTarget.value = '';
  });

  todoList.addEventListener('click', e => {
    if (e.target && e.target.hasAttribute('data-id')) {
      delTodo(e.target.dataset.id);
    }
  });

  todoList.addEventListener('change', e => {
    if (!e.target) return;
    toggleTodoComplete(e.target.id);
  });

  btnAllComplete.addEventListener('change', e => {
    if (!e.target) return;
    toggleAllComplete(e.currentTarget);
  });

  btnClear.addEventListener('click', e => {
    if (!e.target) return;
    clearCompleted();
  });

  nav.addEventListener('click', e => {
    if (!e.target) return;
    if (e.target.nodeName === 'A') {
      for (let i = 0; i < navItem.length; i++) {
        navItem[i].className = '';
      }
      e.target.parentNode.className = 'active';
      status = e.target.parentNode.getAttribute('id');
      renderTodos();
    }
  });
}(axios));
