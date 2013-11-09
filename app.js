// BRANCH: SLIDER - TICKS

var pg = require('pg');


  // user:     process.env.MAKE_TOOL_ONE_USER ,
  // password: process.env.MAKE_TOOL_ONE_PASSWORD, 
  // database: process.env.MAKE_TOOL_ONE_DATABASE ,  
  // host:     process.env.MAKE_TOOL_ONE_HOST ,
  // port:     process.env.MAKE_TOOL_ONE_PORT 

/** // FOR HEROKU SERVER  //  **/


// client.connect(process.env.DATABASE_URL, function(err, client) {
//   var query = client.query('SELECT * FROM surveys');

//   query.on('row', function(row) {
//     console.log(JSON.stringify(row));
//   });
// });

// not working 


/** // FOR LOCAL SERVER  // **/
var conString = "postgres://FOkunubi:folashade@localhost/make_tool";
// var client = new pg.Client(conString);
var client = new pg.Client({
  user:     process.env.MAKE_TOOL_ONE_USER ,
  password: process.env.MAKE_TOOL_ONE_PASSWORD, 
  database: process.env.MAKE_TOOL_ONE_DATABASE ,  
  host:     process.env.MAKE_TOOL_ONE_HOST ,
  port:     process.env.MAKE_TOOL_ONE_PORT 
})
client.connect();

/** // FOR HEROKU SERVER  // **/
// var conString = "postgres://mpeyvkpeoywcaj:mQB_kCBkTaZCP-ct0OhCNl3zBO@ec2-54-225-102-116.compute-1.amazonaws.com:5432/d2d1mma7140cav";
// var client = new pg.Client(conString);
// client.connect();

/** // SETTING UP BACKEND // **/
var express = require("express"); // imports express
var app = express();        // create a new instance of express

// imports the fs module (reading and writing to a text file)
var fs = require("fs");
var path = require("path");

// the bodyParser middleware allows us to parse the
// body of a request
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'static')));

// The global datastore for this example
var listings;

// Asynchronously read file contents, then call callbackFn
function readFile(filename, defaultData, callbackFn) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
      data = defaultData;
    } else {
      console.log("Success reading file: ", filename);
    }
    if (callbackFn) callbackFn(err, data);
  });
}

// Asynchronously write file contents, then call callbackFn
function writeFile(filename, data, callbackFn) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      console.log("Error writing file: ", filename);
    } else {
      console.log("Success writing file: ", filename);
    }
    if (callbackFn) callbackFn(err);
  });
}

// get all items
app.get("/listings", function(request, response){
  response.send({
    listings: listings,
    success: true
  });
});

// get one item
app.get("/listings/:id", function(request, response){
  var id = request.params.id;
  var item = listings[id];
  response.send({
    listings: item,
    success: (item !== undefined)
  });
});

// create new item
app.post("/listings", function(request, response) {
  // console.log(request.body);
  console.log('-------- APP.POST: print item ___-____');
  // var item = { "id": request.body.id,
  //              "taskname": request.body.taskname,
  //              "section": request.body.section,
  //              "stat": request.body.stat,
  //              "freq": request.body.freq,
  //              "date": new Date() };
  var item = request.body.survey;
  console.log(item);

 
  var successful =
      (item !== undefined);
      // (item.date !== undefined) &&
      // (item.taskname !== undefined);

  console.log("successful : " + successful);

  if (successful) {
    listings.push(item);

    console.log(" ________ SUCCESSFULLL PUSH ________ ");

		
	 // INSERT INTO surveys VALUES (item.author, Math.floor(), item.desc);
	  // var price_int = Math.floor(item.price);
	  // client.query('INSERT INTO surveys VALUES ($1, $2, $3)',[item.author, price_int, item.desc]);

    // SVID
    var task_list_text = JSON.stringify(item.task_list);
    var psql_date = new Date();
    client.query('INSERT INTO surveys VALUES ($1, $2, $3, $4, $5)',
      [item.survey_id, item.user_fullname, item.user_role, task_list_text, psql_date]);

	  for (var i=0; i < item.task_list.length; i++){
      console.log('LOOP: --- > adding tasks');
      var task = item.task_list[i];
      client.query('INSERT INTO tasks VALUES ($1, $2, $3, $4, $5)',
        [task.id, task.taskname, task.stat, task.freq, task.survey_id]);    
    }

	  console.log(' ----- inputted into db ----- ');
	   // Query the DB 
	  var query = client.query('SELECT * FROM surveys');
	  query.on('row', function(row) {
	    console.log(JSON.stringify(row));
    });
      

	

	
    writeFile("dataInput.txt", JSON.stringify(listings));
  } else {
    item = undefined;
  }

  response.send({ 
    item: item,
    success: successful
  });
});

// update one item
app.put("/listings/:id", function(request, response){
  // change listing at index, to the new listing


 
  var successful =
      (item !== undefined);
  // var id = request.params.id;
  console.log("---- REQ params POST ------");
  console.log(request.params);

 // SVID
  var id = request.params.survey.id;

  var oldItem = listings[id];
  console.log('-------- APP.PUT: print item ___-____');
  var item = request.body.survey;
  console.log(item);

  /*** PUT BACK **/
  // item.id = (item.desc !== undefined) ? item.desc : oldItem.desc;
  // item.taskname = (item.taskname !== undefined) ? item.taskname : oldItem.taskname;
  // item.section = (item.section !== undefined) ? item.section : oldItem.section;
  // item.stat = (item.stat !== undefined) ? item.stat : oldItem.stat;
  // item.freq = (item.freq !== undefined) ? item.freq : oldItem.freq;
  // item.date = (item.date !== undefined) ? item.date : oldItem.date;

  // commit the update
  listings[id] = survey;
  writeFile("dataInput.txt", JSON.stringify(listings));

  response.send({
    item: item,
    success: true
  });
});

// delete entire list
app.delete("/listings", function(request, response){
  listings = [];
  writeFile("dataInput.txt", JSON.stringify(listings));
  response.send({
    listings: listings,
    success: true
  });
});

// delete one item
app.delete("/listings/:id", function(request, response){
  var id = request.params.id;
  var old = listings[id];
  listings.splice(id, 1);
  writeFile("dataInput.txt", JSON.stringify(listings));
  response.send({
    listings: old,
    success: (old !== undefined)
  });
});

// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
    // console.log(listings);
});


function initServer() {
  // When we start the server, we must load the stored data
  var defaultList = "[]";
  readFile("dataInput.txt", defaultList, function(err, data) {
    listings = JSON.parse(data);
  });
}

// Finally, initialize the server, then activate the server at port 8889
initServer();
app.listen(process.env.PORT || 5000)


/************* open window *************/
// setTimeout(function() {
// 	var spawn = require('child_process').spawn
// 	spawn('open', ['http://localhost:5000']);
// }, 500);