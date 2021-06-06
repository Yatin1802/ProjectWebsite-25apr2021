//Global Variable Declaration 

// This will contain the indexes of Hospital List Global Array matching with the input of ussser
var indexFoundArr = [];

var SEARCH_MATCH = 0;
//Global Variable Declaration Ends

window.onload = init;

function init(){
	//alert("hello");
console.log(Global_Hosp_List.length);
load_Hospital_Table();
clearSearchInputs();

}

//This clears in the inputs search bar 

function clearSearchInputs(){
	var search_input = document.getElementById("search_Input");
	search_input.value = "";
}

// This function will load the Hospital List Global Array into a Table
function load_Hospital_Table(){

	var tableHospital = document.getElementById("table_Hospital");

	var totalElements = Global_Hosp_List.length;

	for (var i = 1; i<=totalElements; i++ ) {

		var newRow = tableHospital.insertRow(i);

		var cell0 = newRow.insertCell(0);
		var cell1 = newRow.insertCell(1);
		var cell2 = newRow.insertCell(2);
		var cell3 = newRow.insertCell(3);
		
		cell0.innerHTML = Global_Hosp_List[i-1][0];
		cell1.innerHTML = Global_Hosp_List[i-1][1];
		cell2.innerHTML = Global_Hosp_List[i-1][2];
		cell3.innerHTML = Global_Hosp_List[i-1][3];
	} 
}

//this function is called when the input of the search bar changes

function updateHospTable(){
	
	//hideHospTable();
	// Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search_Input");
  filter = input.value.toUpperCase();
  table = document.getElementById("table_Hospital");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {

    for(var j = 0; j<4;j++)
    {

		td = tr[i].getElementsByTagName("td")[j];
    	//console.log(td);
	    if (td) 
	    {
		    txtValue = td.textContent || td.innerText;
		    // console.log(txtValue);
		    
		    if (txtValue.toUpperCase().indexOf(filter) > -1) {
		       tr[i].style.display = "";
		       SEARCH_MATCH = SEARCH_MATCH + 1;
		       break;
		    } 
		    else
		    {
		        tr[i].style.display = "none";
		    }
	    }
    }	
    	
  }

  console.log("SEARCH MATCH "+SEARCH_MATCH);
  showHospTable();
  hideHospTable();
  updateSearchCount();
}

function showHospTable(){

	table = document.getElementById("table_Hospital");
	table.style.display = "block";
}

function hideHospTable(){

	var input = document.getElementById("search_Input");
	table = document.getElementById("table_Hospital");
	
	//console.log(input.textLength);

	if (input.textLength == 0) {

		table.style.display = "none";
	}
}

function updateSearchCount(){

		var strSearch = document.getElementById("matchCount");
		var input = document.getElementById("search_Input");

		if (SEARCH_MATCH > 0 && input.textLength>0) {
			strSearch.innerHTML = "No. of Matches Found: "+SEARCH_MATCH;
		}
		else{
				if (input.textLength > 0) {

						strSearch.innerHTML = "No Match Found!!!";
				}
				else
				{
					strSearch.innerHTML = "";
				}
			}
				
		
		
		SEARCH_MATCH = 0;
		
}