var Renderer = function(){};

Renderer.prototype.init = function(taskManager){
  this._taskManager = taskManager;
  this._init();
};
Renderer.prototype.render = function(tasks){
  this._tasks = tasks;
  this._render();
};

Renderer.prototype._init = function(){
  throw '_init must be override';
};
Renderer.prototype._render = function(){
  throw '_render must be override';
};
