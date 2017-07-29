var html = (function() {
  var completeLi;
  var progressLi;
  var todo;
  
  return {
    init: function(t) {
      progressLi = document.querySelector('#todo .progress li');
      completeLi = document.querySelector('#todo .complete li');
      
      todo = t;
      
      progressLi.parentNode.removeChild(progressLi);
      completeLi.parentNode.removeChild(completeLi);
      
      console.log('form 안의 input 을 연결');
    },
    render: function(tasks) {
      if (
        typeof completeLi === 'undefined' ||
        typeof progressLi === 'undefined'
      ) {
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
      for(var i = 0; i < tasks.length; i++) {
        task = tasks[i];
        
        if (task.state === STATE.COMPLETE()) {
          child = completeLi.cloneNode(true);
          child.querySelector('p').innerHTML = task.title;
          
          inputs = child.querySelectorAll('input');
          
          inputs[0].setAttribute('data-task-id', task.id);
          inputs[0].onclick = function() {
            todo.toggle(this.getAttribute('data-task-id'));
          };
          
          inputs[1].setAttribute('data-task-id', task.id);
          inputs[1].onclick = function() {
            todo.remove(this.getAttribute('data-task-id'));
          };
          
          complete.appendChild(child);
        } else {
        
        }
      }
      console.log('완료를 채운다');
      console.log('인풋 박스를 비운다');
    }
  };
})();
