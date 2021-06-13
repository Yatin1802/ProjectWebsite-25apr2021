//GLOBAL VARIABLES

	var CITY_DROPDOWN_READY = 0;

	var TOGGLE_FARE_TABLE = 0;

//GLOBAL VARIABLES END


window.onload = init;

function init(){
	//alert("hello");
	// console.log(Global_CGHS_Rate_List.length);
	load_LTC_City_List();
	hide_city_list();
	resetLTC_Input();

	//Load the Full LTC fare array into HTML table
	load_Full_LTC_Fare_Table();
}

//This function sets the value of the LTC inputs to null string
function resetLTC_Input() {
	// body...
	document.getElementById("ltc_80_from_input").value="";
	document.getElementById("ltc_80_to_input").value="";

}

//This loads the City List from Global Array into the From Drop Down when the page is loaded
function load_LTC_City_List() {
	// body...
	var cityDropDown = document.getElementById("city_from_ltc");

	for(var i = 0; i<LTC_City_List.length;i++)

	{
		var cityName = document.createElement("li");

		cityName.appendChild(document.createTextNode(LTC_City_List[i]));

		cityDropDown.appendChild(cityName);
	}
}



//This function is called when the input of From City is changed... the drop down is filtered
function filterFunction() {
  var input, filter, ul, li, i;

  input = document.getElementById("ltc_80_from_input");
  filter = input.value.toUpperCase();
  div = document.getElementById("ltc_80_from");
  li = div.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) 
  {
    txtValue = li[i].textContent || li[i].innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) 
    {
      li[i].style.display = "";
    } 
    else {
      li[i].style.display = "none";
    }
  }

  if(input.textLength == 0){
  	hide_city_list();
  	clearFareTable();

  	if (CITY_DROPDOWN_READY==1) {

  		//if the City From input is none then there is no reason to show the City To dropdown
  		document.getElementById("city_to_ltc").style.display = "none";
  	}

  	
  }
  else{
  	show_city_list();
  }
  document.getElementById("ltc_80_to_input").value = ""; //removing the text from To City search input
}

function show_city_list() {
	
	var cityList = document.getElementById("city_from_ltc");

	cityList.style.display = "";
}

function hide_city_list() {
	
	var cityList = document.getElementById("city_from_ltc");

	cityList.style.display = "none";
}


//This function is called when an item from the drop down of From City is selected
function fill_From_Search(e){

	 console.log(e.target.textContent);

	 var fromCity = document.getElementById("ltc_80_from_input");
	var toCity = document.getElementById("ltc_80_to_input");

	 fromCity.value = e.target.textContent;
	 //toCity.value="";

	 hide_city_list();
	 clear_City_To_List();
	 Load_City_To_List();
	 CITY_DROPDOWN_READY = 1;

	 if (document.getElementById("ltc_80_from_input").textLength == 0) {

	 	CITY_DROPDOWN_READY = 0;
	 	document.getElementById("city_to_ltc").style.display = "none";

	 }

	 if (CITY_DROPDOWN_READY == 1) {
	 		document.getElementById("city_to_ltc").style.display = "block";
	 }
	 document.getElementById("ltc_80_to_input").value = "";
}

//This function is called when the TO CITY list is updated
function Load_City_To_List(){
  // alert("hello1");
	var cityFromDropDown = document.getElementById("ltc_80_from_input").value;
  var cityDropDown = document.getElementById("city_to_ltc");
	var cityToArr = [];
	var cityToArr_Unique = [];

	var count = LTC_80_Fare_Table.length;
	
	//Loading the array with all the To and Fro combination of cities (contains duplicate)
	for(var i = 0; i< count; i++)
	{
		if (cityFromDropDown == LTC_80_Fare_Table[i][0]) {

			cityToArr.push(LTC_80_Fare_Table[i][1]);
		}

		if (cityFromDropDown == LTC_80_Fare_Table[i][1]) {

			cityToArr.push(LTC_80_Fare_Table[i][0]);
		}

	}

	//console.log(cityFromDropDown);
	//console.log(cityToArr);
	//Removing the duplicate items
	cityToArr_Unique = removeDuplicates_Arr(cityToArr);
	//console.log(cityToArr_Unique);
	// load_CityToList(cityToArr_Unique);

//Adding the li elements to To city dropdown 
	for(var i = 0; i<cityToArr_Unique.length;i++)

	{
		var cityName = document.createElement("li");

		cityName.appendChild(document.createTextNode(cityToArr_Unique[i]));

		cityDropDown.appendChild(cityName);
		console.log(cityName);
	}

	//cityDropDown.style.display = "none";

}

function clear_City_To_List(){

	// getting the div which has li child elements
	var dropDownCity = document.getElementById("city_to_ltc");

	while (dropDownCity.hasChildNodes()) 
	{  
 	 dropDownCity.removeChild(dropDownCity.firstChild);
  }
 }

//This removes the duplicates in the Array loaded from Global LTC table
function removeDuplicates_Arr(cityToArr){

	var cityToArr_Unique = [];

	var count = cityToArr.length;
	var isDuplicate = false;
	var uniqueIndex = 0;
	
	cityToArr_Unique[0] = cityToArr[0];
	
	if (cityToArr.length> 0) {

		

		for(var i = 1; i<count;i++) //to iterate through the array containing duplicates
		{
			isDuplicate = false;
			for(var j = 0; j<cityToArr_Unique.length;j++) //to iterate through the unique item
			{
				if (cityToArr[i]==cityToArr_Unique[j])  //if the items matches, the flag is set
				{
					isDuplicate = true;
				}
				
			}
			if (!isDuplicate) {
				
				cityToArr_Unique[uniqueIndex+1] = cityToArr[i];
				uniqueIndex += 1;
			}
		} //end For

		return cityToArr_Unique;
	}

	else{
		return 0;
		//alert("Something went wrong with loading Destination City Drop Down");
	}

}

//This function is called when the input of to City is changed... the drop down is filtered
function filterFunction_toCity() {
  
  var input, filter, li, i;
  var cityToDropDown = document.getElementById("city_to_ltc");

	if (CITY_DROPDOWN_READY) {

			cityToDropDown.style.display = "block";

			input = document.getElementById("ltc_80_to_input");
		  filter = input.value.toUpperCase();
		  div = document.getElementById("ltc_80_to");
		  li = div.getElementsByTagName("li");

		  for (i = 0; i < li.length; i++) 
		  {
		    txtValue = li[i].textContent || li[i].innerText;

		    if (txtValue.toUpperCase().indexOf(filter) > -1) 
		    {
		      li[i].style.display = "";
		    } 
		    else {
		      li[i].style.display = "none";
		    }
		  }

		  if(input.textLength == 0){
		  	//hide_city_list();
		  	cityToDropDown.style.display = "none"; //hiding the drop down

		  }
		  // else{
		  // 	show_city_list();
		  // }
	}
	// else{
	// 	//Since the destination is not set, inform the user about it
	// 	alert("Please set the Destination first from the Drop Down");
	// 	//The alphabet entered in the To City drop down needs to be set to null string
	// 	document.getElementById("ltc_80_to_input").value = "";
	// }
}

function fill_To_Search(e){

	 console.log(e.target.textContent);

	 var toCity = document.getElementById("ltc_80_to_input");

	 toCity.value = e.target.textContent;

	 //hide_city_list();
	 //clear_City_To_List();
	 //Load_City_To_List();
	 document.getElementById("city_to_ltc").style.display ="none";
	 //setting the CITY DROP DOWN value to zero when there is no text in the from city search Input
	 if (document.getElementById("ltc_80_from_input").textLength == 0) {

	 	CITY_DROPDOWN_READY = 0;
	 }
	 else
	 {
	 	//clearing table before fetching the fresh data
	 	clearFareTable();
	 	
	 	//calling function to update the table
	 	fetchFareToTable();
	 }
	 
}

//this function clears the fare table before fetching the data from LTC table
function clearFareTable(){
	var fareTable = document.getElementById("table_LTC_80");

	var numRow = fareTable.rows.length;

	if (numRow>1) {
		
		for(var i =numRow-1; i>=1;i--)
			{
				console.log("i "+i);
				fareTable.deleteRow(i);	
			}
	}
	
}

function showToCityDrop_dbl(){

	console.log(CITY_DROPDOWN_READY);
	var fromInput = document.getElementById("ltc_80_from_input");
	if (fromInput.textLength > 0 && CITY_DROPDOWN_READY==1) {
		document.getElementById("city_to_ltc").style.display = "block";
	}
	else
	{
		document.getElementById("city_to_ltc").style.display = "none";
		//alert("Please set the Destination First!");
	}
	
}

function showFromCityDrop_dbl(){

	document.getElementById("city_from_ltc").style.display="block";	
}

//this function is called when the TO City Drop Down is selected and now 
//we have two input cities and it will search through the table for the 
//matching entries and fetch those values in to a table
function fetchFareToTable() {
	// body...
	var fromCity = document.getElementById("ltc_80_from_input").value;
	var toCity = document.getElementById("ltc_80_to_input").value;

	var fareEconomy = 0;
	var fareBusiness = 0;

	var fareTable = document.getElementById("table_LTC_80");

	var maxIteration = LTC_80_Fare_Table.length; // total no. of rows in ltc 80 table fare
	console.log(maxIteration);

	for(var i = 0; i<maxIteration;i++)
	{
		if (fromCity == LTC_80_Fare_Table[i][0] || fromCity == LTC_80_Fare_Table[i][1]) 
		{
				if (toCity == LTC_80_Fare_Table[i][0] || toCity == LTC_80_Fare_Table[i][1]) {

					fareEconomy = LTC_80_Fare_Table[i][2];
					fareBusiness = LTC_80_Fare_Table[i][3];
				}
		}
	}

	var newRow = fareTable.insertRow(1);

		var cell0 = newRow.insertCell(0);
		var cell1 = newRow.insertCell(1);
		var cell2 = newRow.insertCell(2);
		var cell3 = newRow.insertCell(3);
		
		cell0.innerHTML = fromCity;
		cell1.innerHTML = toCity;
		cell2.innerHTML = fareEconomy;
		cell3.innerHTML = fareBusiness;

}

//this function loads the full LTC fare table from the Global Array to HTML table
function load_Full_LTC_Fare_Table() {
	// body...
 	var fullTable = document.getElementById("table_LTC_80_Full");

 	var numRow = LTC_80_Fare_Table.length;

 	for(var i =1;i<=numRow;i++)
 	{

 		var newRow = fullTable.insertRow(i);

		var cell0 = newRow.insertCell(0);
		var cell1 = newRow.insertCell(1);
		var cell2 = newRow.insertCell(2);
		var cell3 = newRow.insertCell(3);
		var cell4 = newRow.insertCell(4);

		
		cell0.innerHTML = i;
		cell1.innerHTML = LTC_80_Fare_Table[i-1][0];
		cell2.innerHTML = LTC_80_Fare_Table[i-1][1];
		cell3.innerHTML = LTC_80_Fare_Table[i-1][2];
		cell4.innerHTML = LTC_80_Fare_Table[i-1][3];

 	}
 	fullTable.style.display="none";
}

//This function shows or hide the table of LTC 80 Fare
function show_hide_Fare()
{
	var btn = document.getElementById("showLTC_80_Fare_List") //grabbing the button element
	var fullTable = document.getElementById("table_LTC_80_Full");

	if(TOGGLE_FARE_TABLE == 1){
		
		fullTable.style.display ="none";
		TOGGLE_FARE_TABLE =0;
		btn.innerHTML = "Click to show the LTC 80 Fare Table"

	}
	else{
		if (TOGGLE_FARE_TABLE == 0) 
	{
		fullTable.style.display ="block";
		TOGGLE_FARE_TABLE =1;
		btn.innerHTML = "Click to Hide the LTC 80 Fare Table";
	}
	}
	
}