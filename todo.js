/**
 * 1> changeState : validation 추가 (shield pattern 사용)
 *
 * validation 을 할 경우 항상 shiled pattern을 사용한다
 */

var tasks = [];
var STATE_P = '진행';
var STATE_C = '완료';

var addTask = (function() {
  var id = 1;

  return function(title) {
    tasks.push({
      title: title,
      id: id++,
      state: STATE_P
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
  if(state !== STATE_C && state !== STATE_P) {
    warning('changeState: invalid -', state);
    
    return;
  }
  for (var i = 0; i < tasks.length; i++) {
    if (id === tasks[i].id) {
      tasks.state = state;
      break;
    }
  }

  render();
};

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
