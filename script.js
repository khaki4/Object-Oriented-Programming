/**
 *  todo 객체 안에서 tasks를 참조하는 순간 todo는 진정한 의미의 객체가 아니게 된다
 *  line 104 참조
 */

var todo = (function() {
  var tasks = [];
  var STATE_P = '진행';
  var STATE_C = '완료';

  var addTask = (function() {
    var id = 1;

    return function(title) {
      var result = id;
      tasks.push({
        title: title,
        id: id++,
        state: STATE_P
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
    var ID = false; //ID는 절대로 false가 될 수 없다!!
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
  var init, render, target;

  var html = (function() {
    var completeLi;
    var progressLi;
    return {
      init: function() {
        progressLi = document.querySelector('#todo .progress li');
        completeLi = document.querySelector('#todo .complete li');

        progressLi.parentNode.removeChild(progressLi);
        completeLi.parentNode.removeChild(completeLi);
      },
      render: function(tasks) {
        if (
          typeof completeLi === 'undefined' ||
          typeof progressLi === 'undefined'
        ) {
          return;
        }
        console.log('각 리스트를 비운다');
        document.querySelector('#todo .progress').innerHTML = '';
        document.querySelector('#todo .complete').innerHTML = '';

        console.log('진행을 채운다');
        console.log('완료를 채운다');
        console.log('인풋 박스를 비운다');
      }
    };
  })();

  var con = (function() {
    return {
      init: function() {
        console.clear();
      },
      // render는 tasks를 제대로 그리기만 할 뿐 tasks상태에 관여하지 않는다
      // 상태에 관여하지 않으려면 복사본을 넘긴다
      // Object.assign(tasks)
      render: function(tasks) {
        console.log('진행');

        var task;

        for (var i = 0; i < tasks.length; i++) {
          task = tasks[i];
          if (task.state === STATE.PROGRESS()) {
            console.log(
              task.id + '.',
              task.title + '(' + task.state.toString() + ')'
            );
          }
        }

        console.log('완료');

        for (var i = 0; i < tasks.length; i++) {
          task = tasks[i];
          if (task.state === STATE.COMPLETE()) {
            console.log(
              task.id + '.',
              task.title + '(' + task.state.toString() + ')'
            );
          }
        }
      }
    };
  })();
  init = function() {
    target.init();
  };
  render = function() {
    target.render(Object.assign(tasks));
  };

  return {
    init: init,
    modeHtml: function() {
      target = html;
    },
    modeConsole: function() {
      target = con;
    },
    add: addTask,
    remove: removeTask,
    toggle: function(id) {
      for (var i = 0; i < tasks.length; i++) {
        if (id === tasks[i]) {
          var state = tasks[i].state;
          if (state === STATE_P) {
            changeState(id, STATE_C);
          } else {
            changeState(id, STATE_P);
          }

          break;
        }
      }
    }
  };
})();

todo.init();
