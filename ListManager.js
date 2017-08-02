//ListManager class
var ListManager = (function(){
  var ListManager = function(add, pList, cList){
    if(typeof add !== 'function') throw 'add is not a function';
    if(!(pList instanceof List) || !(cList instanceof List)) throw 'list object must be created with new';
    
    this._add = add;
    this._pList = pList;
    this._cList = cList;
    
    this._isInitialized = false;
  }, fn = ListManager.prototype = new Renderer();
  
  fn._init = function(){
    if(this._isInitialized) return;
    this._isInitialized = true;
    
    this._add(this._taskManager);
    this._pList.init(this._taskManager);
    this._cList.init(this._taskManager);
  };
  
  fn._render = function(){
    var task;
    this._pList.clear();
    this._cList.clear();
    for(var i = 0; i < this._tasks.length; i++){
      task = this._tasks[i];
      if(task.isComplete()) this._cList.add(task);
      else this._pList.add(task);
    }
  };
  return ListManager;
})();
