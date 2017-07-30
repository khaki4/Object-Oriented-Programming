// class 를 scope 를 이용해 정의
// shadow 사용해 코드의 의미를 전달
var Task = (function () {
  var c = {}, p = {};
  
  var Task = function (title) {
    this._title = title;
    this._state = p;
  };
  
  Task.prototype.isComplete = function() {
    return this._state === c;
  };
  Task.prototype.toggle = function () {
    if(this._state === c) {
      this._state = p;
    } else {
      this._state = c;
    }
  };
  
  return Task;
})();

var todo = (function() {
  var tasks = [];

  var addTask = (function() {
    var id = 1;

    return function(title) {
      var result = id;
      tasks.push(new Task(title));

      render();
      return result;
    };
  })();

  var removeTask = function(id) {
    var isRemoved = false;
    for (var i = 0; i < tasks.length; i++) {
      if (id === tasks[i].id) {
        tasks.splice(i, 1);
        isRemoved = true;

        break;
      }
    }
    if (!isRemoved) {
      warning('removeTask: invalid id');
    }
    render();
  };
  

  var warning = console.log;
  var target;

  var render = function() {
    target.render(Object.assign(tasks));
  };

  return {
    setRenderer: function(renderer) {
      if (!(renderer instanceof Renderer)) return;
      
      target = renderer;
      target.init(todo);
    },
    add: addTask,
    remove: removeTask,
    toggle: function(task) {
      if (tasks.indexOf(task) > -1) {
        task.toggle();
      }
    }
  };
})();
