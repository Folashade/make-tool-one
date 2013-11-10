
  // Debugging - console.logs run only when true
  debug = true;

  // Print function
  var print = function(input){
		if (debug === true){
			// console.log(input);
		}
  }

  // Global datastore
  var listings;
  // print (listings);
  // print ("listings");



  // Implement addListing()
  function addListing(){
  	/* Get User Info */
		var user_fullname = $('#user_fullname')[0].value;
  	($('#c2')[0].checked) ? (user_role = "Analyst" ) : (user_role = "Broker Dealer");



 
		/* Create Survey */
		var survey = new Object();
		survey.survey_id = 999;
		survey.user_fullname = user_fullname;
		survey.user_role = user_role;
		survey.task_list = new Array();
		survey.date = new Date(); 

		/* Get (Survey) Task Responses */
		var mt_sliderValuesFromDOM = $('.slidebars');
		var taskNameList = $('.task .taskname');

		// window.add(di, ai, pi);
		var mt_sliderValues_array = new Array();

		// var end = mt_sliderValuesFromDOM.length;

 			$.each(mt_sliderValuesFromDOM, function(id){

					/*** Data Rerieval from DOM ***/
					var str = $(this).text();
					var slider_id = id + 1;
					var slider_name = $(taskNameList[id]).text();
						var res = str.match(/\w+/g); // not part of the object
					var slider_stat = res[1];
					var slider_freq = res[3];

					// obj name = task, type = slider title , amount = stat or freq
					var slider_task = new Object();
					slider_task.id = slider_id;
					slider_task.taskname = slider_name;
					slider_task.stat = slider_stat;
					slider_task.freq = slider_freq;
					slider_task.survey_id = survey.survey_id; // FOREIGN KEY 
					
					// NULL CHECK 
					if (slider_task.taskname !== undefined && slider_task.taskname !== ''){
						survey.task_list.push(slider_task);
					}
					
		})

				// mt_sliderValues_array.push(sl_task)
				listings.push(survey);
				window.add(survey);
				// console.log(listings);
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
  	      // data: {"id": id, "taskname": taskname,"section": section,  "stat": stat, "freq": freq, "date": date},

  function add(survey){
    $.ajax({
      type: "post",
      data: {"survey": survey},
      url: "/listings",
      success: function(data) { }
    });
  }

  function edit(survey) {
    $.ajax({
      type: "put",
      data: {"survey": survey},
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






// ADDDING TASKKSSSS
  function addTask1(){
  	var getInput = $('#taskadd-one').val();
		var newName = getInput || ' Not Specified';
		$('.hidden.one')[0].children[2].children[0].innerHTML = newName;
		$('.hidden.one').removeClass('hidden');
		$('#addition1').addClass('hidden');
		$('#addition2').removeClass('hidden');
	}

	  function addTask2(){
  	var getInput = $('#taskadd-two').val();
		var newName = getInput || ' Not Specified';
		$('.hidden.two')[0].children[2].children[0].innerHTML = newName;
		$('.hidden.two').removeClass('hidden');
		$('#addition2').addClass('hidden');
		$('#addition3').removeClass('hidden');
	}

	  function addTask3(){
  	var getInput = $('#taskadd-three').val();
		var newName = getInput || ' Not Specified';
		$('.hidden.three')[0].children[2].children[0].innerHTML = newName;
		$('.hidden.three').removeClass('hidden');
		$('#addition3').addClass('hidden');
		// $('#addition2').removeClass('hidden');
	}


  $(document).ready(function() {
    get();
  });