var STATE = (function() {
  var c = {
    toString: function() {
      return 'COMPLETE';
    }
  };
  var p = {
    toString: function() {
      return 'PROGRESS';
    }
  };
  return {
    COMPLETE: function() {
      return c;
    },
    PROGRESS: function() {
      return p;
    }
  };
})();

var todo = (function() {
  var tasks = [];

  var addTask = (function() {
    var id = 1;

    return function(title) {
      var result = id;
      tasks.push({
        title: title,
        id: id++,
        state: STATE.PROGRESS()
      });

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

  var changeState = function(id, state) {
    var ID = false;
    var STATE;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        ID = id;
      }
    }
    if (ID === false) {
      warning('changeState: invaild id -', id);
      return;
    }

    STATE = state;

    for (var i = 0; i < tasks.length; i++) {
      if (ID === tasks[i].id) {
        tasks.state = STATE;
        break;
      }
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
      /** renderer 에 관한 정보는 해당 파일의 정보롤 열람하기 전 까지 알 수 없다.
       *  if (typeof renderer.init !== 'function' || typeof renderer.render !== 'function')
       */
      if (!(renderer instanceof Renderer)) return;
      
      target = renderer;
      target.init(todo);
    },
    add: addTask,
    remove: removeTask,
    toggle: function(id) {
      for (var i = 0; i < tasks.length; i++) {
        if (id === tasks[i]) {
          var state = tasks[i].state;
          if (state === STATE.PROGRESS()) {
            changeState(id, STATE.COMPLETE());
          } else {
            changeState(id, STATE.PROGRESS());
          }

          break;
        }
      }
    }
  };
})();
