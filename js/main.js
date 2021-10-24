
function show_hMenu_Modal() {
	// alert("Here");
	
	// Get the modal
	var modal = document.getElementById("myModal_hMenu");

	// Get the button that opens the modal
	// var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementById("close_hMenu");

		  
	 
	 // When the user clicks the button, open the modal 
	  modal.style.display = "block";
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		// clearGpfInputs();
	  modal.style.display ="none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	  	// clearGpfInputs();
	    modal.style.display ="none";
	  }
	}
}