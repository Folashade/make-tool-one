$( document ).ready(function() {

  var string = "-- restart --";
  console.log(string);

  $(".horzcenter").slideUp();
 
  function createHoverState (myobject){
    myobject.hover(function() {
      $(this).prev().toggleClass('hilite');
      /* console.log("hover"); */
      });
    myobject.mousedown(function() {
      $(this).prev().addClass('dragging');
      $("*").mouseup(function() {
        $(myobject).prev().removeClass('dragging');
        /* console.log("mouseup");  */
        });
    });
  }
  


  /*** // SLIDER SCRIPT // ***/

  $(".slider").slider({
    orientation: "horizontal",
    range: "min",
    max: 100,
    value: 0,
    animate: 1300,
    change: function(e,ui){
        // Do something with ui.value
        /* console.log(ui.handle.previousSibling.previousElementSibling.innerText); */
        /* ui.handle.previousSibling.previousElementSibling.innerText = "CHANGED i sondee"; */
       var newVal = ui.handle.previousSibling.previousElementSibling.innerText;
          var val = $(this).slider("value");
        
      $($(this).children()[1]).animate({ opacity: 0});
      var CN = $(this).children()[1].className;
      switch (true) {
        // Check for Frequency Case
        case (val>70 && CN === 'slider-freq'):
          x="Today it's 70";
         $(this).children()[1].innerText = "yearly";
          /* $(this).children(2)[1].innerText = "10"; */
            break;
        case (val>64 && CN === 'slider-freq'):
          x="Today it's 64";
         $(this).children()[1].innerText = "monthly";
          break;
         case (val>48 && CN === 'slider-freq'):
          x="Today it's 48";
          $(this).children()[1].innerText = "weekly";
          break;
        case (val>32 && CN === 'slider-freq'):
          x="Today it's 32";
         
          $(this).children()[1].innerText = "bi-weekly";
          break;
       case (val>16 && CN === 'slider-freq'):
          x="Today it's 16";
          $(this).children()[1].innerText = "daily";
          break;
        case (val>0 && CN === 'slider-freq'):
          x="Today it's 0";
          $(this).children()[1].innerText = "hourly";
          break;
          
      // If not any Freq, must be Relevancy  
       case (val == val):
         $(this).children()[1].innerText = Math.floor(val/10)*10;
         $(this).slider({'step':10});
      } /* end of switch */    
      
      $($(this).children()[1]).animate({ opacity: 1});
    } /* close of 'change' function */
  }); /* end of 'slider' function */
  

  /*** // VARYING SLIDER SCRIPT // ***/
	// makes the sliders vary from max to min as the page goes down 
  $("#blue").slider( "value", 100 );
  $('.slider').each(function(index) {
    $(this).slider( "value", 75-index*(50/($('.slider').length-1)));
    var val = $(this).slider("value");

	/* VALUES USEFUL FOR DEBUGGING: 
		console.log($(this).children()[1].innerText);
        console.log($(this).children()[2].innerText);
    	console.log(val); 
	*/
  });
  

  
	$(this).bind('onSlide', function(evt, val){
	  calculatePrice(val);
	});
  
	/* console.log($(".slider").width); */ 
 
  createHoverState($(".slider a.ui-slider-handle"));

  /*** // SUBMIT BUTTON SCRIPT // ***/
	 // Need to get the values of all the current sliders and (eventually) store in the db
  $("#submit").click(function(){
     // $("#wrapper").fadeOut();
     $(".horizontal").fadeOut();
     $(".rule").fadeOut();
     $(".task").fadeOut();
     $("#submit").fadeOut();
     $(".horzcenter").slideDown();
    // $("#thanks").fadeIn();
  }); /* END OF: submit function */


   /*** // CUSTOMIZED ALERT BOX  // 
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert("We are working to redesign BNY Mellon's Broker/Dealer experience. <br> Please take a moment to tell us more about your daily tasks so we can better understand what would benefit you.");
    iframe.parentNode.removeChild(iframe);
    // alert(""); 
  ***/

}); /* END OF: document.ready */
