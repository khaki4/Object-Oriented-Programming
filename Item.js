//Item class
var Item = (function(){
  var items = {};
  var Item = function(selector){
    //입력받은 selector가 문자열인지 검사
    if(typeof selector !== 'string') throw 'Type of selector must be string';
    //같은 selector로 Item이 만들어지는 것을 막음
    if(items[selector]) throw 'Already defined Item';
    this._el = items[selector] = selector;
    
    this._isInitialized = false;
  }, fn = Item.prototype;
  fn.init = function(taskManager){
    if(this._isInitialized) return;
    this._isInitialized = true;
    
    var el;
    this._el = el = document.querySelector(this._el);
    if(el.parentNode) el.parentNode.removeChild(el);
    this._taskManager = taskManager;
  };
  fn.add = function(task){
    var el = this._el.cloneNode(true);
    el.querySelector('p').innerHTML = task;
    
    var taskManager = this._taskManager;
    var btns = el.querySelectorAll('input');
    btns[0].onclick = function(){
      taskManager.toggle(task);
    };
    btns[1].onclick = function(){
      taskManager.remove(task);
    };
    
    return el;
  };
  return Item;
})();
