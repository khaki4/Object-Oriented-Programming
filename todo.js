/**
 * [id: 1, title: '할일', state: '진행'] 형식의 데이터로 todo 만들기
 * 1> addTask, removeTask, updateState, render 함수 만들기
 * 2> state는 진행, 완료 둘이며 상,하로 섹션을 구분해야 한다.
 */

var tasks = [];
var id = 1;
var addTask = function(title) {
  tasks.push({
    title: title,
    id: id++,
    state: '진행'
  });
  render();
};

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