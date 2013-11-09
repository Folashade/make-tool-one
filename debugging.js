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


// var conString = "postgres://mpeyvkpeoywcaj:mQB_kCBkTaZCP-ct0OhCNl3zBO@ec2-54-225-102-116.compute-1.amazonaws.com:5432/d2d1mma7140cav";
																	user: password@ host:port.database
// Setting Up Environment
	user:     process.env.MAKE_TOOL_ONE_USER ,
	password: process.env.MAKE_TOOL_ONE_PASSWORD, 
	database: process.env.MAKE_TOOL_ONE_DATABASE ,	
	host:     process.env.MAKE_TOOL_ONE_HOST ,
	port:     process.env.MAKE_TOOL_ONE_PORT 


	ku config:set MAKE_TOOL_ONE_USER=mpeyvkpeoywcaj
heroku config:set MAKE_TOOL_ONE_PASSWORD=mQB_kCBkTaZCP-ct0OhCNl3zBO
heroku config:set MAKE_TOOL_ONE_DATABASE=d2d1mma7140cav
heroku config:set MAKE_TOOL_ONE_HOST=ec2-54-225-102-116.compute-1.amazonaws.com
heroku config:set MAKE_TOOL_ONE_PORT=5432








