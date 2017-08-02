var Item = (function() {
  var items = {};
  
  var Item = function (selector) {
    if (items[selector]) throw 'item이 이미 존재합니다';
    
    this._el = items[selector] = selector;
  };
  var fn = Item.prototype;
  
  fn.init = function () {
    var el;
    this._el = el = document.querySelector(this._el);
    
    if (el.parentNode) el.parentNode.removeChild(el);
  };
  fn.add = function (task) {
    var el = this._el.cloneNode(true);
    
    var todo = this._todo;
    var btns = el.querySelector('p').innerHTML = task;
    btns[0].onclick = function () {
      todo.toggle(task);
    };
    btns[1].onclick = function () {
      todo.remove(task);
    };
    
    return el;
  };
  return Item;
})();

var List = (function() {
  var containers = {};
  
  var List = function (selector, item) {
    // 새로운 리스트 생성 방지
    if (containers[selector]) throw '이미 존재하는 컨테이너 입니다';
    
    this._container = containers[selector] = selector;
    this._item = item;
  };
  var fn = List.prototype;
  
  fn.init = function(manager) {
    this._container = document.querySelector(this._container);
    this._item.init();
  };
  fn.clear = function() {
    this._container.innerHTML = '';
  };
  fn.add = function(task) {
    this._container.appendChild(this._item.add(task));
  };
})();

var ListManger = (function() {
  var ListManger = function(add, pList, cList) {
    this._add = add;
    this._pList = pList;
    this._cList = cList;
    this._isInitialized = false;
  };
  var fn = ListManger.prototype = new Renderer();
  
  fn._init = function() {
    if (this._isInitialized) return;
    this._isInitialized = true;
    
    this._add(this._todo);
    // add 는 한번만 호출하도록 강제함.
    this._add = null;
    
    this._cList.init(this);
    this._pList.init(this);
  };
  
  fn._render = function(tasks) {
    var task;
    
    this._pList.clear();
    this._cList.clear();
    
    for(var i = 0; i < tasks.length; i++) {
      task = tasks[i];
      
      if(task.isComplete()) {
        this._cList.add(task);
      } else {
        this._pList.add(task);
      }
    }
  };
  
  return ListManger;
})();


