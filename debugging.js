var item = {};
var task1 = {"one" : "1"};
var task2 = {"one" : "1"};
item.task_list = [];
item.task_list.push(task1);
item.task_list.push(task2);
console.log(item);

for (var i=0; i < item.task_list; i++){
    console.log('<><><>><><taskkkkksksskskkkskkkskskkskskskskskk');
  }

  for (var i=0; i < 5; i++){
    console.log('<><><>><><taskkkkksksskskkkskkkskskkskskskskskk');
  }

// newSlidePairs[0].innerHTML = "<div class='slider blue'><div class='slider-title'>Frequency</div><div class='slider-freq'>4</div></div><div class='slider white'><div class='slider-title'>Importance</div><div class='slider-stat'>8</div></div>"


var newTask = $('<div>').attr('class', 'task');
var newTaskName = $('<div>').attr('class', 'taskname');
newTaskName[0].innerText = 'Added a Task';
newTask[0].appendChild(newTaskName[0]);
var newSlidePairs = $('<div>').attr('class', 'slidebars');
newTask[0].appendChild($("#blue").slider( "value", 40 ));
newTask[0].appendChild($("#white").slider( "value", 60 ));
newTask[0].appendChild(newSlidePairs[0]);
$('#wrapper').append($('<div>').attr('class', 'horizontal'));
$('#wrapper').append($('<div>').attr('class', 'rule'));
$('#wrapper').append(newTask);