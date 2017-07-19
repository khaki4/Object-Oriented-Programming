/**
 * 1> changeState => toggle의 결과로
 *    changeState의 두번째 인자인 state는 외부입력이 아니라
 *    하드코딩 된 내부입력이므로 validation 후보에서 제거한다.
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
        state: STATE_P,
      });

      render();
      return result;
    };
  })();

  var removeTask = function(id) {
    var isRemoved = false;ㅋㅋㅋ
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
    toggle: function(id) {
      for(var i = 0; i < tasks.length; i++) {
        if(id === tasks[i]) {
          var state = tasks[i].state;
          if(state === STATE_P) {
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

var taskId = todo.add('이름');
todo.toggle(taskId);
