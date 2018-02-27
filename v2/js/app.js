(function () {
  var todos = [];

  var inputTodo = document.getElementById('input-todo');
  var todoList = document.getElementById('todo-list');
  var btnAllComplete = document.getElementById('chk-allComplete');
  var COMPLETED_LENGTH = 0;
  var completedNumber = document.getElementById('completedTodos');
  var activeNumber = document.getElementById('activeTodos');
  var btnClear = document.getElementById('btn-removeCompletedTodos');
  var nav = document.querySelector('.nav');
  var navItem = document.querySelectorAll('.nav li');
  var status = 'all';

  function activeLength() {
    COMPLETED_LENGTH = 0;
    todos.forEach(function (todo) {
      if (!todo.completed) {
        COMPLETED_LENGTH++;
      }
    });
    activeNumber.innerHTML = COMPLETED_LENGTH;
    if (COMPLETED_LENGTH <= 1) {
      activeNumber.nextSibling.textContent = ' item left';
    } else {
      activeNumber.nextSibling.textContent = ' items left';
    }
  }

  function completedLength() {
    completedNumber.innerHTML = todos.length - COMPLETED_LENGTH;
  }

  function rendarTodo() {
    // 조건에 따른 필터링
    var _todos = todos.filter(function (todo) {
      var res = todo;
      if (status === 'completed') {
        res = todo.completed;
      } else if (status === 'active') {
        res = !todo.completed;
      }
      return res;
    });

    var html = '';
    _todos.forEach(function (todo) {
      var checked = todo.completed ? 'checked' : '';
      html += '<li class="list-group-item">';
      html += ' <div class="hover-anchor">';
      html += '   <a class="hover-action text-muted">';
      html += '     <span class="glyphicon glyphicon-remove-circle pull-right" data-id="' + todo.id + '"></span>';
      html += '   </a>';
      html += '   <label class="i-checks" for="' + todo.id + '">';
      html += '     <input type="checkbox" id="' + todo.id + '" ' + checked + '><i></i>';
      html += '     <span>' + todo.content + '</span>';
      html += '   </label>';
      html += ' </div>';
      html += '</li>';
    });
    todoList.innerHTML = html;

    activeLength();
    completedLength();
  }

  function getIds() {
    return todos.map(function (todo) {
      return todo.id;
    });
  }

  function getMax() {
    return todos.length ? Math.max.apply(null, getIds()) + 1 : 1;
  }

  function addTodo(newTodo) {
    todos = [newTodo].concat(todos);
    rendarTodo();
  }

  function delTodo(id) {
    todos = todos.filter(function (todo) {
      return todo.id !== +id;
    });
    rendarTodo();
  }

  function toggleTodoComplete(id) {
    todos = todos.map(function (todo) {
      return todo.id === +id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
    });
    rendarTodo();
  }

  function toggleAllComplete(obj) {
    todos = todos.map(function (todo) {
      return Object.assign({}, todo, { completed: obj.checked });
    });
    rendarTodo();
  }

  function clearCompleted() {
    todos = todos.filter(function (todo) {
      return todo.completed !== true;
    });
    rendarTodo();
  }

  window.addEventListener('load', function () {
    // // XMLHttpRequest 객체의 생성
    // var req = new XMLHttpRequest();
    // // 비동기 방식으로 Request를 오픈한다
    // req.open('GET', 'http://localhost:3000/todos');
    // // Request를 전송한다
    // req.send();

    // // Event Handler
    // req.onreadystatechange = function () {
    //   // 서버 응답 완료 && 정상 응답
    //   if (req.readyState === XMLHttpRequest.DONE) {
    //     if (req.status === 200) {
    //       todos = JSON.parse(req.responseText);
    //       rendarTodo();
    //     } else {
    //       console.log('[' + req.status + ']: ' + req.statusText);
    //     }
    //   }
    // };
    todos = [
      { id: 3, content: 'HTML', completed: true },
      { id: 2, content: 'CSS', completed: true },
      { id: 1, content: 'Javascript', completed: false }
    ];
    rendarTodo();
  });

  inputTodo.addEventListener('keyup', function (e) {
    if (!this.value || e.keyCode !== 13) return;
    addTodo({ id: getMax(), content: this.value, completed: false });
    this.value = '';
  });

  todoList.addEventListener('click', function (e) {
    if (e.target && e.target.hasAttribute('data-id')) {
      delTodo(e.target.getAttribute('data-id'));
    }
  });

  todoList.addEventListener('change', function (e) {
    if (!e.target) return;
    toggleTodoComplete(e.target.id);
  });

  btnAllComplete.addEventListener('change', function (e) {
    if (!e.target) return;
    toggleAllComplete(this);
  });

  btnClear.addEventListener('click', function (e) {
    if (!e.target) return;
    clearCompleted();
  });

  nav.addEventListener('click', function (e) {
    if (!e.target) return;
    if (e.target.nodeName === 'A') {
      for (var i = 0; i < navItem.length; i++) {
        navItem[i].className = '';
      }
      e.target.parentNode.className = 'active';
      status = e.target.parentNode.getAttribute('id');
      rendarTodo();
    }
  });
}());
