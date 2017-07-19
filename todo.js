/**
 * 1> 익명함수를 받는 변수 추가
 * 2> 실제 함수명과 캡슐화에서 노출되는 함수명 수정(바깥쪽에서 인식하기 좋은 함수명으로 수정)
 *
 * 함수의 시그니쳐: 함수명과 파라미터
 */

var todo = (function() {
  var tasks = [];
  var STATE_P = '진행';
  var STATE_C = '완료';

  var addTask = (function() {
    var id = 1;

    return function(title) {
      tasks.push({
        title: title,
        id: id++,
        state: STATE_P,
      });

      render();
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

    if (state !== STATE_C && state !== STATE_P) {
      warning('changeState: invalid -', state);
      return;
    } else {
      STATE = state;
    }

    for (var i = 0; i < tasks.length; i++) {
      if (ID === tasks[i].id) {
        tasks.state = STATE;
        break;
      }
    }

    render();
  };

  var warning = console.log;

  var render = function() {
    console.log('진행');

    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
      if (task.state === '진행') {
        console.log(task.id, task.title, task.state);
      }
    }
    console.log('완료');

    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
      if (task.state === '완료') {
        console.log(task.id, task.title, task.state);
      }
    }
  };
  render();

  return {
    add: addTask,
    remove: removeTask,
    changeState: changeState,
  };
})();
