             TEST 			  --testDB
'================================='

CREATE TABLE test2 (
		title varchar(80),
    date timestamp with time zone
);
INSERT INTO test VALUES
    ('one', '2013-11-06T07:01:37.693Z');


          DATA CREATION
'================================='
-- backend.js
			... 
	var sl_task = new Object();
			sl_task.id = sl_id;
			sl_task.taskname = sl_name;
			// sl_task.section = sl_section;
			sl_task.stat = sl_stat;
			sl_task.freq = sl_freq;
			sl_task.date = new Date();
			...


-- psql input in terminal
CREATE TABLE surveys (
    id smallint,
    taskname varchar(80),
    section varchar(100),
    stat integer,
    freq integer,
    date timestamp with time zone
);


-- app.js
  var item = { "id": request.body.desc,
               "taskname": request.body.taskname,
               "section": request.body.section
               "stat": request.body.stat,
               "freq": request.body.freq
               "date": new Date() };


            DATA OUTPUT
'================================='
-- dataInput.txt
[{"id": 0, "taskname": "Example Task", "section": "Section",
 "stat": "42", "freq": "100", "date":"2013-11-05T20:10:07.170Z"}]


