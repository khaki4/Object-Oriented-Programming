var Con = function() {};
Con.prototype = new Renderer();
Con.prototype._init = function(todo) {
  console.clear();
};
Con.prototype._render = function(task) {
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
  
};
var con = new Con();
