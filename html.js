/**
 * 형상속을 위해서는 html 은 단일 인스턴스이지만 형정의를 해야한다.
 */

var Html = function() {
  // var completeLi;
  // var progressLi;
  // var todo;
};
Html.prototype = new Renderer(); // html 은 Render 의 자손이다. init, render 상속

Html.prototype._init = function(todo) {
  this.progressLi = document.querySelector('#todo .progress li');
  this.completeLi = document.querySelector('#todo .complete li');

  this.todo = todo;

  this.progressLi.parentNode.removeChild(this.progressLi);
  this.completeLi.parentNode.removeChild(this.completeLi);
};
Html.prototype._render = function(tasks) {
  if (typeof this.completeLi === 'undefined' || typeof this.progressLi === 'undefined') {
    return;
  }
  console.log('각 리스트를 비운다');
  document.querySelector('#todo .progress').innerHTML = '';
  document.querySelector('#todo .complete').innerHTML = '';

  console.log('진행을 채운다');
  var complete = document.querySelector('#todo .complete');
  var progress = document.querySelector('#todo .progress');
  var task;
  var child;
  var inputs;
  for (var i = 0; i < tasks.length; i++) {
    task = tasks[i];

    if (task.state === STATE.COMPLETE()) {
      child = this.completeLi.cloneNode(true);
      child.querySelector('p').innerHTML = task.title;

      inputs = child.querySelectorAll('input');

      inputs[0].setAttribute('data-task-id', task.id);
      inputs[0].onclick = function() {
        this.todo.toggle(this.getAttribute('data-task-id'));
      };

      inputs[1].setAttribute('data-task-id', task.id);
      inputs[1].onclick = function() {
        this.todo.remove(this.getAttribute('data-task-id'));
      };

      complete.appendChild(child);
    } else {
    }
  }
  console.log('완료를 채운다');
  console.log('인풋 박스를 비운다');
};

// html instanceof Html, html instanceof Renderer -> true 대체가능성
var html = new Html();

html.render();
