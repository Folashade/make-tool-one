  // ------------
  // IMPLEMENT ME
  // ------------
  
  // Debugging - console.logs run only when true
  debug = true;

  // Print function
  var print = function(input){
		if (debug === true){
			console.log(input);
		}
  }

  // Global datastore
  var listings;
  print (listings);
  print ("listings");



  // Implement addListing()
  function addListing(){
		// var newListing = {};
		
		// console.log("hello");	
		// var ai = $('#author-input').val();
		// var di = $('#desc-input').val();
		// var pi = $('#price-input').val();
		
		// newListing.author = ai;
		// newListing.desc = di;
		// newListing.price = pi;
		// newListing.date = new Date();

		// print(newListing);
		
		// listings.push(newListing);
		// window.add(di, ai, pi);
		

		// -- new for maketool --

		var mt_sliderValues = $('.slider');
		print("mt_sliderValues  : ");
		// print(mt_sliderValues.join());

		var taskNameList = $('.task .taskname');

		// window.add(di, ai, pi);
		var mt_sliderValues_text = [];

		$.each(mt_sliderValues, function(id){
			var regWord = /\w+/; 
			var regNum = /\d+/; 

			var str = $(this).text();
			var sl_id = id;
			var sl_name = $(taskNameList[id]).text();
			// var sl_section = str.match(regWord)[0];
			var sl_stat = str.match(regNum)[0];
			var sl_freq = str.match(regNum)[0];



			// obj name = task, type = slider title , amount = stat or freq
			var sl_task = new Object();
			sl_task.id = sl_id;
			sl_task.taskname = sl_name;
			// sl_task.section = sl_section;
			sl_task.stat = sl_stat;
			sl_task.freq = sl_freq;
			sl_task.date = new Date();


			mt_sliderValues_text.push(sl_task)
			listings.push(sl_task);
			window.add(id, taskname, stat, freq, date)
		})

		print (mt_sliderValues_text);
		// listings.push(newListing);


		// ----------------------
		
		refreshDOM();

		// Clear Inputs
			// $('#author-input').val("");
			// $('#desc-input').val("");
			// $('#price-input').val("");
  }
 

  // Implement refreshDOM()
  function refreshDOM(){
		if (listings === undefined) return;
		
		var container = $(".listings");
		container.html("");
    
		for (var i=0; i<listings.length; i++){
			var currentListing = listings[i];
			var listItem = $("<li>");
			// content
			listItem.append($("<h3>").html(currentListing.author));
			listItem.append("<h6>" + currentListing.date + "</h6>");
			listItem.append("<p>" + currentListing.desc + "</p>");
			listItem.append("<p>$" + currentListing.price + "</p>");
			
			if (currentListing.sold === true) {
				print("its sold already");
				listItem.addClass("sold");
			}
			
			
			// delete button
			var delButton = $("<a class='del'>").attr("id", i).html("Delete");
			listItem.append(delButton);
			delButton.click(function(){
				var buttonClicked = $(this);
				var buttonID = buttonClicked.attr("id");
				print("delete");
				listings.splice(buttonID, 1);
				window.del(buttonID);
				refreshDOM();
			});
			
			// sold button
			var soldButton = $("<a>").attr("id", i).html("Sold!");
			listItem.append(soldButton);
			soldButton.click(function(){
				var buttonClicked = $(this);
				var buttonID = buttonClicked.attr("id");

				buttonClicked.parent().addClass("sold");
				listings[buttonID].sold = true;//!(listings[buttonID].sold);
				
				/* edit(id, desc, author, price, sold) */
				window.edit(buttonID, l.desc, l.author, undefined, true );
				// refreshDOM();
			});
			
			// listItem += "</li>";
			
			
			$(".listings").append(listItem);
		}
  } // refreshDOM  
  
  // Implement the get() function
  function get() {
    $.ajax({
      type: "get",
      url: "/listings",
      success: function(data) {
        listings = data.listings;
        //console.log(listings);
        refreshDOM();
      }
    });
  }

  // Implement the add(desc, author, price) function
  function add(id, taskname, stat, freq, date) {
    $.ajax({
      type: "post",
      data: {"id": id, "taskname": taskname, "stat": stat, "freq": freq, "date": date},
      url: "/listings",
      success: function(data) { }
    });
  }

  function edit(id, desc, author, price, sold) {
    $.ajax({
      type: "put",
      data: {"id": id, "taskname": taskname, "stat": stat, "freq": freq, "date": date},
      url: "/listings/" + id,
      success: function(data) { }
    });
  }

  function del(id) {
    $.ajax({
      type: "delete",
      url: "/listings/" + id,
      success: function(data) { 
        //console.log(data);
      }
    });
  }

  function delAll() {
    $.ajax({
      type: "delete",
      url: "/listings",
      success: function(data) { }
    });
  }


  $(document).ready(function() {
    get();
  });