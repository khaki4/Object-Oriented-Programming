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
  
  Task.prototype.toString = function () {
    /**
     * el.querySelector('p').innerHTML = task; 에서
     * innerHTML은 task.toString()을 자동으로 호출한다.
     * 그러므로 Task.toString을 override 해두면 task만 적어두면
     * task에서 알아서 타이틀을 반환한다.
     */
    return this._title;
  };
  
  return Task;
})();

var TaskManager = (function() {
  var TaskManager = function() {
    this._tasks = [];
    this._renderer = null;
  };
  
  var fn = TaskManager.prototype;
  
  fn._render = function() {
    this._renderer.render(this._tasks.slice(0));
  };
  fn._checkTask = function (task) {
    return (task instanceof Task) && (this._tasks.indexOf(task) > -1);
  };
  fn.setRenderer = function(renderer) {
    if (!(renderer instanceof Renderer)) return;
    this._renderer = renderer;
    renderer.init(this);
  };
  fn.add = function (title) {
    this._tasks.push(new Task(title));
    this._render();
  };
  fn.remove = function(task) {
    var tasks = this._tasks;
    if (this._checkTask(task)) tasks.splice(tasks.indexOf(task), 1);
    this._render();
  };
  fn.toggle = function(task) {
    if (this._checkTask(task)) task.toggle();
  };
  
  return Todo;
  
})();
