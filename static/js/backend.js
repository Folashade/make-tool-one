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
  // print (listings);
  // print ("listings");



  // Implement addListing()
  function addListing(){
  	/* Get User Info */
		var user_fullname = "Fake Name"; // $('#fullname_input').val()
		var user_role = "Analyst"; // $$('#role_input').val()

		/* Create Survey */
		var survey = new Object();
		survey.survey_id = 999;
		survey.user_fullname = user_fullname;
		survey.user_role = user_role;
		survey.task_list = new Array();
		survey.date = new Date(); 

		/* Get (Survey) Task Responses */
		var mt_sliderValuesFromDOM = $('.slider');
		var taskNameList = $('.task .taskname');

		// window.add(di, ai, pi);
		var mt_sliderValues_array = new Array();

		$.each(mt_sliderValuesFromDOM, function(id){
				var regExWord = /\w+/; 
				var regExNum = /\d+/; 

				/*** Data Rerieval from DOM ***/
				var str = $(this).text();
				var sl_id = id;
				var sl_name = $(taskNameList[id]).text();
				var sl_section = str.match(regExWord)[0];
				var sl_stat = str.match(regExNum)[0];
				var sl_freq = str.match(regExNum)[0];

				// obj name = task, type = slider title , amount = stat or freq
				var sl_task = new Object();
				sl_task.id = sl_id;
				sl_task.taskname = sl_name;
				sl_task.stat = sl_stat;
				sl_task.freq = sl_freq;
				sl_task.survey_id = survey.survey_id; // FOREIGN KEY 
				
				survey.task_list.push(sl_task);

				// mt_sliderValues_array.push(sl_task)
				// listings.push(sl_task);
				// window.add(sl_task.id, sl_task.taskname, sl_task.sl_section, sl_task.stat, sl_task.freq, sl_task.date);
		})

				// mt_sliderValues_array.push(sl_task)
				listings.push(survey);
				window.add(survey);
				print("-------------------------------");
				print(survey);
				// window.add(sl_task.id, sl_task.taskname, sl_task.sl_section, sl_task.stat, sl_task.freq, sl_task.date);
		

		// print (mt_sliderValues_array);
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
  // function add(id, taskname, section, stat, freq, date) {
  function add(survey){
    $.ajax({
      type: "post",
      // data: {"id": id, "taskname": taskname, "section": section, "stat": stat, "freq": freq, "date": date},
      data: survey;
      url: "/listings",
      success: function(data) { }
    });
  }

  function edit(id, desc, author, price, sold) {
    $.ajax({
      type: "put",
      data: {"id": id, "taskname": taskname,"section": section,  "stat": stat, "freq": freq, "date": date},
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