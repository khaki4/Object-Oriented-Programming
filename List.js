//List class
var List = (function(){
  var containers = {};
  var List = function(selector, item){
    //입력받은 item의 형 검사
    if(!(item instanceof Item)) throw 'item object must be created with new';
    //입력받은 selector가 문자열인지 검사
    if(typeof selector !== 'string') throw 'Type of selector must be string';
    //같은 selector로 List가 만들어지는 것을 막음
    if(containers[selector]) throw 'Already defined List';
    
    this._el = containers[selector] = selector;
    this._item = item;
  }, fn = List.prototype;
  fn.init = function(taskManager){
    if(this._isInitialized) return;
    this._isInitialized = true;
    
    this._el = document.querySelector(this._el);
    this._item.init(taskManager);
  };
  
  fn.clear = function(){ this._el.innerHTML = ''; };
  
  fn.add = function(task){ this._el.appendChild(this._item.add(task)); };
  
  return List;
})();
