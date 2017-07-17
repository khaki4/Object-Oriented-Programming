/**
 * id는 모두가 접근해야 하는 것이 아니라
 * addTask만이 알고있어야 한다
 *
 * 어휘 관리의 분리가 좋은 개발자가 되는 분수령이다.
 * 프로그레밍은 절대로 변한다
 */

var tasks = [];

var addTask = (function() {
  var id = 1;

  return function(title) {
    tasks.push({
      title: title,
      id: id++,
      state: '진행'
    });
    render();
  };
})();

var removeTask = function(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (id === tasks[i].id) {
      tasks.splice(i, 1);
    }
  }
  render();
};

var updateState = function(id, state) {
  for (var i = 0; i < tasks.length; i++) {
    if (id === tasks[i].id) {
      tasks.state = state;
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
