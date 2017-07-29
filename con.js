var con = (function() {
  return {
    init: function() {
      console.clear();
    },
    render: function(tasks) {
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
    }
  };
})();
