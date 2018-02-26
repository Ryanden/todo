(function () {
  var todos = [];
  var inputTodo = document.getElementById('input-todo');
  var todoList = document.getElementById('todo-list');

  function rendarTodo() {
    var html = '';
    todos.forEach(function (todo) {
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
  }

  function delTodo(id) {
    todos = todos.filter(function (todo) {
      return todo.id !== +id;
    });
  }

  function changeComplete(id) {
    todos = todos.map(function (todo) {
      return todo.id === +id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
    });
  }

  window.addEventListener('load', function () {
    // XMLHttpRequest 객체의 생성
    var req = new XMLHttpRequest();
    // 비동기 방식으로 Request를 오픈한다
    req.open('GET', 'http://localhost:3000/todos');
    // Request를 전송한다
    req.send();

    // Event Handler
    req.onreadystatechange = function () {
      // 서버 응답 완료 && 정상 응답
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          todos = JSON.parse(req.responseText);
          rendarTodo();
        } else {
          console.log('[' + req.status + ']: ' + req.statusText);
        }
      }
    };
    // todos = [
    //   { id: 3, content: 'HTML', completed: true },
    //   { id: 2, content: 'CSS', completed: true },
    //   { id: 1, content: 'Javascript', completed: false }
    // ];
    // rendarTodo();
  });

  inputTodo.addEventListener('keyup', function (e) {
    if (!this.value || e.keyCode !== 13) return;
    addTodo({ id: getMax(), content: this.value, completed: false });
    this.value = '';
    rendarTodo();
  });

  todoList.addEventListener('click', function (e) {
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
