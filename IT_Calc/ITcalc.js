

//Global Variable Section Starts----------

//Global Array which contains the Pay Matrix fetched from JSON payMatrix.JSON
var todos = new Array();

//Global Flags 
var ROWINDEX_GROSS = -1; //This is set when a row in Gross Salary Table is clicked
var CELLINDEX_GROSS = -1; //This is set when a cell in the Gross Salary Table is clicked

var PAYLEVEL = 1;
var PAYINDEX = 1;
var LEVELTEXT = "Level 1";

var NPS_GOVT_CONT = 0.14; //Govt. Contribution of NPS is 14%
var NPS_EMP_CONT = 0.10; //Emp. Contribution of NPS is 10%

var DEPUTATION_ALLOWANCE_RATE = 0.10;

var INCOME_TABLE_LOADED = -1; //This flag is used to load the various columns of deduction table only when the income table is loaded

//---------Global Variable Section ends-------------


window.onload = init;

function init(){
	getPayMatix();

	//This loads the Gross Income Table initially with the year 2020-21
	updateTable();
}

function getPayMatix(){
	// alert("here");
	var xhr = new XMLHttpRequest();

	xhr.open("GET", "payMatrix.json");

	xhr.onreadystatechange = function(){

		var div = document.getElementById("pets");

		if (this.readyState == this.DONE && this.status == 200) {

			if (this.responseText != null) {

				// div.innerHTML = this.responseText;
				jsonToArray(this.responseText);
			}

			else{

				div.innerHTML = "Error: no data";
			}
		}
	};

	xhr.send();
}

function jsonToArray(todoJSON){

	var todoArray = JSON.parse(todoJSON);
	// console.log(todoArray);

	for(var i = 0; i< 19; i++)
	{
		var todoItem = todoArray[i];
		// console.log(todoArray[i]["Level 1"][0]);
		// console.log(todoItem);
		todos.push(todoItem);
	}
	
}

function setCellIndex(){
	var select = document.getElementById("cellIndex");
	var length = select.options.length;
	console.log("length" + length);
	for (i = length-1; i >= 0; i--) {
	  select.options[i] = null;
	}
}

//This function sets the initial values in the personal details form when it loads
function setInitialValues(){

	//it is being called as Level 1 is set and the cell Index drop down is dynamically added... 
	//it fills the cell index drop down initially
	setCellIndex();
	var select = document.getElementById("cellIndex");
	var length = select.options.length;
	console.log("length" + length);
	for (i = length-1; i >= 0; i--) {
	  select.options[i] = null;
	}

	document.getElementById("emp_increment").selectedIndex = 0;
	document.getElementById("emp_accomodation").selectedIndex = 0;
	document.getElementById("emp_transport").selectedIndex = 0;
	document.getElementById("emp_handicap").selectedIndex = 0;
	document.getElementById("emp_group").selectedIndex = 2;
	
	getValidCells();
}

//This function returns the Basic Pay based on the selected Pay Level and Cell Index
function getValidCells(){

	console.log("getValidCells");

	var level = document.getElementById("payLevel");
	

	// level = level.options[level.selectedIndex].text;
	var level_num = level.selectedIndex; //numeric value of the Pay level selected
	var level_text = level.options[level.selectedIndex].text; //text value of the select drop down of Pay level

	var total_cell = getCellCount(level_num, level_text); //contains the total no. of valid cells for a selected pay level
	// console.log(todos[1][index]);
	console.log(total_cell);
	setCellIndex();
	addCellIndex(total_cell);

	PAYLEVEL = level_num;
	LEVELTEXT = level_text;
	console.log(PAYLEVEL);
	
	// return todos[level_num][level_text][index_num];
}

function getCellIndex(){

	console.log("getCellIndex");
	var index = document.getElementById("cellIndex");
	var index_num = index.selectedIndex; //contains the numeric value of the cell index selected
	PAYINDEX = index_num;
	console.log(PAYINDEX);
}

// This function counts the total no. of valid cells for a given Pay Level Selected
function getCellCount(level_num, level_text){

	var validCells = 0

	for (var i = 0; i<40; i++)
	{
		if (todos[level_num][level_text][i] >0) {
			validCells += 1;
		}
	}
	return validCells;
}

//This dynamically populates the Cell Index with valid number of total Index
function addCellIndex(total_cell){

	var index = document.getElementById("cellIndex");
 	
 	for(var i = 1; i<=total_cell; i++)

 	{
 		var option = document.createElement("option");
 		option.text = "Cell Index " + i;
 		index.add(option);
 	}	
}

function updateTable(){
	console.log("updateTable");

	clearIncomeTable();

	var months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan", "Feb"];
	// alert("Here");
	var fy = document.getElementById("financialYear");

	var year = parseInt(fy.options[fy.selectedIndex].text);


	var incomeTable = document.getElementById("grossIncome");
	var numRow = incomeTable.rows.length;

	// console.log("here " + numRow)
	

	for (var i = 0; i<12; i++) 
	{
		var newRow = incomeTable.insertRow(numRow+i);

		var cell0 = newRow.insertCell(0);
		var cell1 = newRow.insertCell(1);
		var cell2 = newRow.insertCell(2);
		var cell3 = newRow.insertCell(3);
		var cell4 = newRow.insertCell(4);
		var cell5 = newRow.insertCell(5);
		var cell6 = newRow.insertCell(6);
		var cell7 = newRow.insertCell(7);
		

		if (i<10) 
			{
				cell0.innerHTML = months[i]+ " - "  + year;
			}

		else
			{	
				cell0.innerHTML = months[i] + " - " + (year+1);
			}
	}
}



 //when the income table loads the previous entries are removed 
function clearIncomeTable(){
	console.log("clearIncomeTable");

	var incomeTable = document.getElementById("grossIncome");

	var numRow = incomeTable.rows.length;
	var j = 1;
	for (var i = 1; i<numRow;i++)
	{
		console.log(i);
		incomeTable.deleteRow(j);
	}
}

 

function addPersonalDetails(){
	
	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	// var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	  
	  modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
	setInitialValues();
}

// This function closes the modal input box when ok button is clicked
function closeModal1(){

	var modal = document.getElementById("myModal");
	var span = document.getElementsByClassName("close")[0];

	modal.style.display = "none";
	
}

//This function is called when the contents are edited in the Gross Income Table 
function recalculate(e){
	console.log(recalculate);
	console.log(e.target.children[1]);
	var grossTable = document.getElementById("grossIncome");

	var newLevel = -1;

	var newCell = -1;

	var newText = "Level ";

	// ROWINDEX_GROSS = e.target.parentNode.rowIndex;

	if (CELLINDEX_GROSS == 1 || CELLINDEX_GROSS == 2) {

		newLevel = e.target.rows[ROWINDEX_GROSS].cells[1].innerHTML;

		//There is an extra level 13A in the 7th CPC and requires adjustment before the array of paymatrix is accessed.
		if (newLevel == "13A" || newLevel == "13a") {

			newLevel = 14; //As there is already a Level 13, the newlevel needs to increment by 1 if the edited value is 13A
			newText = "Level 13A"; //The new Text is set in the array as 13A
		}

		else{

			newLevel = parseInt(newLevel);
			//Since there is an addition of 1 in the paylevel >13, it is being continued
			if (newLevel>13) {

				newLevel +=1;
				newText = newText + (newLevel-1); //The text however won't change, so minus one is needed
				console.log("level is more than 13" + newLevel + newText);
			}
			else{

				newText = newText + newLevel;
				console.log("level is less than 13" + newLevel + newText);
			}

		}
		
		newCell = parseInt(e.target.rows[ROWINDEX_GROSS].cells[2].innerHTML);

		if (Number.isInteger(newLevel) && Number.isInteger(newCell)) {
			console.log("inside recalculate")
			updateRow(newLevel,newText);
		}
		console.log(newLevel);
	}
	else{
		grossTable.contentEditable = false;
	}
}

function updateRow(newLevel,newText){
	console.log("updateRow");

	var grossTable = document.getElementById("grossIncome");

	var cellIndex = parseInt(grossTable.rows[ROWINDEX_GROSS].cells[2].innerHTML);

	var DA_Amount = grossTable.rows[ROWINDEX_GROSS].cells[4];
	var HRA_Amount = grossTable.rows[ROWINDEX_GROSS].cells[5];
	var TA_Amount = grossTable.rows[ROWINDEX_GROSS].cells[6];
	var Gross_Amount = grossTable.rows[ROWINDEX_GROSS].cells[7];


	var newBasic = todos[newLevel-1][newText][cellIndex-1];

	var newDA = getDA_Rates();

	var newHRA = getHRA(newDA);

	var newTA = getTA(newBasic,newLevel);


	grossTable.rows[ROWINDEX_GROSS].cells[3].innerHTML = newBasic;
	DA_Amount.innerHTML = Math.round(newBasic*newDA);
	HRA_Amount.innerHTML = Math.round(newBasic*newHRA);
	TA_Amount.innerHTML = Math.round(TA_Array[newTA]*(1+newDA));
	Gross_Amount.innerHTML = newBasic + parseInt(DA_Amount.innerHTML) + parseInt(HRA_Amount.innerHTML) + parseInt(TA_Amount.innerHTML);

	updateHRA();
	updateTA();
}


function getDA_Rates(){

	var grossTable = document.getElementById("grossIncome");
	//This contains the month of the edited cell
	var monthDA = grossTable.rows[ROWINDEX_GROSS].cells[0].textContent;
		
	var DA_rate = 0;
	//Looping 12 times for each calendar month in a given FY
		
	//Looping through the entire DA Array database to find the correct DA rates for a particular month-year
	for (var j = 0; j< DA_Array.length; j++)
	{
		if (monthDA == DA_Array[j][0]) {

			DA_rate = DA_Array[j][1];				
		}
	}
	return DA_rate;
}

function getHRA(newDA){

	var newHRA = 0;

	if(newDA < 0.25)
	{
		newHRA = 0.24; //HRA rates are being pushed according to DA rates
	}

	else
	{

		if(newDA <0.50) {newHRA = 0.27;}
		
		else{newHRA = 0.30;}	
	}

	return newHRA;
}

function getTA(newBasic, newLevel){

	if (newBasic >= 24200) {

		if (newLevel <9) {
			 return 1;
		}
		else {

			return 2;
		}

	}
	else{

		return 0;
	}
}

//This function is called to keep track of the cell and row of the table which the user has clicked on
function clickLocation(e){
	console.log("clickLocation");
	var cellGross = e.target;	//contains the cell object clicked
	var rowGross = e.target.parentNode; //contains the row object

	var grossTable = document.getElementById("grossIncome");

	CELLINDEX_GROSS = cellGross.cellIndex;
	ROWINDEX_GROSS = rowGross.rowIndex;
	// console.log(CELLINDEX_GROSS);

	if (CELLINDEX_GROSS ==1 || CELLINDEX_GROSS ==2) {
		console.log("contentEditable is being set");
		grossTable.contentEditable = true;
	}
	else
	{
		grossTable.contentEditable = false;
	}
	console.log("Row Indiex" + ROWINDEX_GROSS);
}


function sendPersonalInfo(){
	console.log("sendPersonalInfo");
	
	// var level = document.getElementById("payLevel").selectedIndex;
	// var index = document.getElementById("cellIndex").selectedIndex;

	//This is the basic pay calculated on the basis of the selection made  

	var basicPay = todos[PAYLEVEL][LEVELTEXT][PAYINDEX];

	fillTable(basicPay);
	calculateAllowances();

//The deduction table is linked with the Income Table. only when it's content are loaded (after Level and Cell input), 
//table is loaded thereafter

	INCOME_TABLE_LOADED = 1; // The table has been loaded, now the deduction table contents may now be loaded or updated
	updateTable_deduction();

	//The pay details input has been recorded and it's time to close the modal box
	closeModal1();
}


//This function sets the basic pay as per the level and index selected in the modal diaglog box for personal details
function fillTable(basicPay){

	console.log("fillTable");

	var grossTable = document.getElementById("grossIncome");

	var incrementMonth = document.getElementById("emp_increment");


	incrementMonth = incrementMonth.options[incrementMonth.selectedIndex].text;

	for(var i = 1; i<=12; i++)
	{	
		if (incrementMonth == "Jan") {

			if (i <11) {
				grossTable.rows[i].cells[1].innerHTML = parseInt(PAYLEVEL)+1;
				grossTable.rows[i].cells[2].innerHTML = parseInt(PAYINDEX)+1;
				grossTable.rows[i].cells[3].innerHTML = basicPay;
			}

			else{
				grossTable.rows[i].cells[1].innerHTML = parseInt(PAYLEVEL)+1;
				grossTable.rows[i].cells[2].innerHTML = parseInt(PAYINDEX)+2;
				grossTable.rows[i].cells[3].innerHTML = todos[PAYLEVEL][LEVELTEXT][PAYINDEX+1];
			}
		}
		//This code executes if the Increment month is July
		else{
			if (i <5) {
				grossTable.rows[i].cells[1].innerHTML = parseInt(PAYLEVEL)+1;
				grossTable.rows[i].cells[2].innerHTML = parseInt(PAYINDEX)+1;
				grossTable.rows[i].cells[3].innerHTML = basicPay;
			}
			else{
				grossTable.rows[i].cells[1].innerHTML = parseInt(PAYLEVEL)+1;
				grossTable.rows[i].cells[2].innerHTML = parseInt(PAYINDEX)+2;
				grossTable.rows[i].cells[3].innerHTML = todos[PAYLEVEL][LEVELTEXT][PAYINDEX+1];
			}
		}
		
	} //End For

}

//This function calculates the DA HRA and TA as per existing rules 
function calculateAllowances(){
	console.log("calculateAllowances");

	var grossTable = document.getElementById("grossIncome");

	//The HRA rate is linked with prevalent DA rates and it is pushed in empty HRA array according to DA rates 
	var HRA_rate = new Array();
	

	//Looping 12 times for each calendar month in a given FY
	for(var i = 1; i<=12; i++)
	{
		var basicPay = parseInt(grossTable.rows[i].cells[3].textContent);
		var monthDA = grossTable.rows[i].cells[0].textContent;
		
		var DA_Amount = grossTable.rows[i].cells[4];
		var HRA_Amount = grossTable.rows[i].cells[5];
		var TA_Amount = grossTable.rows[i].cells[6];
		var Gross_Amount = grossTable.rows[i].cells[7];
		
		// console.log(monthDA);
		var DA_rate = 0;

		//Looping through the entire DA Array database to find the correct DA rates for a particular month-year
		for (var j = 0; j< DA_Array.length; j++)
		{
			if (monthDA == DA_Array[j][0]) {

				DA_rate = DA_Array[j][1];

				if(DA_rate < 0.25){
				HRA_rate.push(0.24); //HRA rates are being pushed according to DA rates
				}
				else{

					if(DA_rate <0.50){
						HRA_rate.push(0.27);
					}
					else
					{
						HRA_rate.push(0.3);
					}	
				}
				
			}
			// console.log(HRA_rate.length);
		}

		//This calculates the Dearness Allowance
		DA_Amount.innerHTML = Math.round(basicPay*DA_rate);
		
		//This calculates the HRA 
		HRA_Amount.innerHTML = Math.round(basicPay*HRA_rate[i-1]);
		
		if (parseInt(HRA_Amount.innerHTML) <=5400) {
			console.log("HRA less than 5400");
			HRA_Amount.innerHTML = 5400;
		}

		//function is being called which determines the applicable TA rates
		var ta_num = TA_category(basicPay); 

		//This calculates the TA depending of TA category
		TA_Amount.innerHTML = Math.round(TA_Array[ta_num]*(1+DA_rate));

		Gross_Amount.innerHTML = basicPay + parseInt(DA_Amount.innerHTML) + parseInt(HRA_Amount.innerHTML) + parseInt(TA_Amount.innerHTML);
	}

	grossAnnualIncome();
	// console.log(HRA_rate);
}

//The TA rates applicable depends on the Basic Pay and the level the user belongs to... depeending the value returned
//by this function, the TA_Array is used to calculate the correct TA amount
function TA_category(basicPay){

	// var ta_num = -1;

	var level = document.getElementById("payLevel").selectedIndex + 1;

	if (basicPay >= 24200) {

		if (level <9) {
			 return 1;
		}
		else {

			return 2;
		}

	}
	else{

		return 0;
	}
}


//The Accomodation status from the drop down has been changed, the HRA column is updated accordingly
function updateHRA(){

	console.log("updateHRA");

	var grossTable = document.getElementById("grossIncome");
	var statusAccomodation = document.getElementById("emp_accomodation");

	statusAccomodation = statusAccomodation.options[statusAccomodation.selectedIndex].text;
	
	console.log(statusAccomodation);
	if (statusAccomodation == "No") {
		calculateAllowances();
		// updateGross();
	}
	if(statusAccomodation == "Yes")
	{
		for(var i = 1; i<=12; i++)
		{
			grossTable.rows[i].cells[5].innerHTML = 0;
		}
		updateGross();
	}
}

function updateTA(){

	console.log("updateTA");

	var grossTable = document.getElementById("grossIncome");
	var statusTransport = document.getElementById("emp_transport");
	var statusHandicap = document.getElementById("emp_handicap");

	statusTransport = statusTransport.options[statusTransport.selectedIndex].text;
	statusHandicap = statusHandicap.options[statusHandicap.selectedIndex].text;
	
	
	if(statusTransport == "Yes")
	{
		for(var i = 1; i<=12; i++)
		{
			grossTable.rows[i].cells[6].innerHTML = 0;
		}
		updateGross();

	}
	else{

		if(statusHandicap == "No")
		{
			calculateAllowances();
		}
		
		if(statusHandicap =="Yes")
		{
			calculateAllowances();

			for(var i = 1; i<=12; i++)
			{
				grossTable.rows[i].cells[6].innerHTML = parseInt(grossTable.rows[i].cells[6].innerHTML)*2;
			}

		}
	}
	
}

//When the status of various allowances are changed, the table is updated and this functions manages the gross income column
function updateGross(){

	console.log("updateGross");

	var grossTable = document.getElementById("grossIncome");

	for(var i = 1; i<=12;i++)
	{
		var basicPay = parseInt(grossTable.rows[i].cells[3].textContent);	
		var DA_Amount = grossTable.rows[i].cells[4];
		var HRA_Amount = grossTable.rows[i].cells[5];
		var TA_Amount = grossTable.rows[i].cells[6];
		var Gross_Amount = grossTable.rows[i].cells[7];

		console.log(parseInt(HRA_Amount.innerHTML));

		Gross_Amount.innerHTML = basicPay + parseInt(DA_Amount.innerHTML) + parseInt(HRA_Amount.innerHTML) + parseInt(TA_Amount.innerHTML);
	}
	grossAnnualIncome();
}

function grossAnnualIncome() {

	var grossTable = document.getElementById("grossIncome");
	var grossAI_heading = document.getElementById("GrossAnnualIncome");
	var annualGross = 0;

	for (var i = 1; i<=12;i++)
	{

		annualGross += parseInt(grossTable.rows[i].cells[7].innerHTML);
	}
	
	grossAI_heading.innerHTML = "The Annual Income is Rs " + annualGross + "/-";

}


// --------------------This part contains code related to deduction table---------------------

//When the page loads the deduction table is filled with the months and cells are inserted in the table
function updateTable_deduction(){

	clearDeductionTable();

	var months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan", "Feb"];
	// alert("Here");
	var fy = document.getElementById("financialYear");

	var year = parseInt(fy.options[fy.selectedIndex].text);

	var deductionTable = document.getElementById("deductionTable");
	var numRow = deductionTable.rows.length;

	// console.log("here " + numRow)
	
	for (var i = 0; i<12; i++) 
	{
		var newRow = deductionTable.insertRow(numRow+i);

		var cell0 = newRow.insertCell(0);
		var cell1 = newRow.insertCell(1);
		var cell2 = newRow.insertCell(2);
		var cell3 = newRow.insertCell(3);
		var cell4 = newRow.insertCell(4);
		// var cell5 = newRow.insertCell(5);
		// var cell6 = newRow.insertCell(6);
		// var cell7 = newRow.insertCell(7);
	
		if (i<10) 
			{
				cell0.innerHTML = months[i]+ " - "  + year;
			}
		else
			{	
				cell0.innerHTML = months[i] + " - " + (year+1);
			}
	}
	//The pension contribution function is being called to update the column in the Deduction table
	pensionContribution();
	//for updating the CGHS contribution column as soon as the Deduction table is loaded. 
	cghsContribution();
	//for updating the CGEGIS deduction column
	cgegisDeduction();

	//for updating the side bar box showing total deduction
	grossDeduction();

}

//when the deduction table loads the previous entries are removed 
function clearDeductionTable(){
	// console.log("clearIncomeTable");

	var deduction_Table = document.getElementById("deductionTable");

	var numRow = deduction_Table.rows.length;
	var j = 1;
	for (var i = 1; i<numRow;i++)
	{
		console.log(i);
		deduction_Table.deleteRow(j);
	}
}

function pensionContribution(){

	var deduction_Table = document.getElementById("deductionTable");
	var grossTable = document.getElementById("grossIncome");
	var pensionType = document.getElementById("emp_pension");

	pensionType = pensionType.options[pensionType.selectedIndex].text;

	if (INCOME_TABLE_LOADED == 1) {

		if(pensionType == "Old Pension"){

		for(var i =1; i<=12;i++)
			{
				deduction_Table.rows[i].cells[1].innerHTML = "NA";
				deduction_Table.rows[i].cells[2].innerHTML = "NA";
			}
		}
		if (pensionType == "NPS") {
			console.log("Pension Contribution");

			for(var i =1; i<=12;i++)
			{
				var basicPay = grossTable.rows[i].cells[3];
				var DA = grossTable.rows[i].cells[4];

				deduction_Table.rows[i].cells[1].innerHTML = Math.round(NPS_EMP_CONT*(parseInt(basicPay.innerHTML)+parseInt(DA.innerHTML)));
				deduction_Table.rows[i].cells[2].innerHTML = Math.round(NPS_GOVT_CONT*(parseInt(basicPay.innerHTML)+parseInt(DA.innerHTML)));
			}
		}
		//Whenever there is update in the column, the total will re-calculated
		grossDeduction();
	}

	else{

		alert("The Income Table is not loaded... may please consider setting Basic Pay first!")
	}
}

function cghsContribution(){

	var deduction_Table = document.getElementById("deductionTable");
	var grossTable = document.getElementById("grossIncome");
	var cghs_status = document.getElementById("emp_cghs");

	cghs_status = cghs_status.options[cghs_status.selectedIndex].text;


	if(INCOME_TABLE_LOADED == 1){

		if (cghs_status == "Yes") {

			for(var i =1; i<=12; i++){

				var payLevel = parseInt(grossTable.rows[i].cells[1].innerHTML);
				console.log(payLevel);

				deduction_Table.rows[i].cells[3].innerHTML = cghsDeductionRate(payLevel);
			}
		}

		if(cghs_status == "No"){

			for(var i =1; i<=12; i++){

				deduction_Table.rows[i].cells[3].innerHTML = "NA";
			}
		}

	//When the CGHS entitlement is changed, the gross deduction in the side bar needs to be updated.
		grossDeduction();
	}
	else{
		alert("The Income Table is not loaded... set the Basic Pay first!")
	}
}

function cghsDeductionRate(payLevel){

	if (payLevel <5) {
		return 250;
	}
	if (payLevel > 4 && payLevel < 7) {
		return 450;
	}
	if (payLevel >=7 && payLevel <12) {
		return 650;
	}
	if (payLevel>11) {
		return 1000;
	}
}

//The group to which employee belongs to determines the CGEGIS deduction rate and updates the column in Deduction Table
function cgegisDeduction(){

	var deduction_Table = document.getElementById("deductionTable");
	var grossTable = document.getElementById("grossIncome");
	var empGroup = document.getElementById("emp_group"); 

	empGroup = empGroup.options[empGroup.selectedIndex].text;

	if (INCOME_TABLE_LOADED == 1) {

		if (empGroup == "Group A") {

			for(var i =1; i<=12; i++){

				deduction_Table.rows[i].cells[4].innerHTML = 120;
			}
		}
		
		if(empGroup == "Group A (ad hoc)" || empGroup == "Group B"){
				

			for(var i =1; i<=12; i++){

				deduction_Table.rows[i].cells[4].innerHTML = 60;
			}		
		}

		if(empGroup == "Group B (ad hoc)" || empGroup == "Group C"){
				

			for(var i =1; i<=12; i++){

				deduction_Table.rows[i].cells[4].innerHTML = 30;
			}		
		}
	
	//When the CGEGIS contrubtion is changed, the gross deduction in the side bar needs to be updated.
		grossDeduction();
	}
	else
	{
		alert("Set the Pay details first");
	}

}

function grossDeduction() {

	var deduction_Table = document.getElementById("deductionTable");

	var totalDeduction_side = document.getElementById("totalDeduction");
	//var grossTable = document.getElementById("grossIncome");
	var annualDeduction = 0;
	var monthlyDeduction = 0;

	for (var i = 1; i<=12;i++)
	{

		for(var j = 1; j<=4; j++){

			if (Number.isInteger(parseInt(deduction_Table.rows[i].cells[j].innerHTML))) {
				monthlyDeduction += parseInt(deduction_Table.rows[i].cells[j].innerHTML);
			}
		}

		annualDeduction += monthlyDeduction;
		monthlyDeduction = 0;
	}
	
	totalDeduction_side.innerHTML = "The Total Deduction is Rs " + annualDeduction + "/-";

}

//-----------------This part of the code relates to the GPF modal box and calculation-----------------

//this function opens the GPF modal box for getting the details of GPF contribution
function gpfModal(){	

	if (isOldPension()) {

		showGpfModal();
	}
	else{
		alert("You are covered under NPS! \n GPF is not Applicable!");
	}
}

//this functions opens up the GPF modal box
function showGpfModal() {
	
	// Get the modal
	var modal = document.getElementById("myModal_GPF");

	// Get the button that opens the modal
	// var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementById("close_gpf");

	// When the user clicks the button, open the modal 
	  
	  modal.style.display = "block";
	  gpfContribution();

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		clearGpfInputs();
	  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	  	clearGpfInputs();
	    modal.style.display = "none";
	  }
	}
}

//This function closes the modal GPF contribution box when ok button is clicked or whatever
function close_gpfModal() {
	var modal = document.getElementById("myModal_GPF");
	modal.style.display = "none";
}

//This function checks whether the user has selected Old Pension or not before showing GPF contribution modal box
function isOldPension(){

	var pensionType = document.getElementById("emp_pension");

	pensionType = pensionType.options[pensionType.selectedIndex].text;

	if (pensionType == "Old Pension") {

		return 1;
	}
}

//This function is called when the gpf input mode in GPF contribution modal box is selected either monthly or lumpsum
function gpfContribution(){

	//Get the monthly Radio button
	var monthlyRadio = document.getElementById("monthly_gpf");
	//Get the lumpsum Radio buttion
	var lumpsumRadio = document.getElementById("lumpsum_gpf");


//The inputs of GPF contribution needs to be cleared during toggle
	var amtMonthly = document.getElementById("amt_monthly");
	var numMonth = document.getElementById("num_Month");
	var lumpsumAmt = document.getElementById("lumpsumAmt");

	var totalGPF_Amt = document.getElementById("totalGPF");
	// console.log(monthlyRadio.checked);

	if (monthlyRadio.checked) {
		console.log(monthlyRadio.checked);
		document.getElementById("gpf_inputMonthly").style.display = "block";
		document.getElementById("gpf_inputMonths").style.display = "none";
		totalGPF_Amt.innerHTML = "";
		lumpsumAmt.value = "";
		console.log(lumpsumAmt);
	}

	if (lumpsumRadio.checked) {
		console.log("inside lumpsum");
		document.getElementById("gpf_inputMonths").style.display = "block";
		document.getElementById("gpf_inputMonthly").style.display = "none";
		amtMonthly.value= "";
		numMonth.value = "";
		totalGPF_Amt.innerHTML = "";
	}
}


//this function calculates the GPF contribution

function calc_GPF(){

//Getting the inputs
	var monthly_amt = parseInt(document.getElementById("amt_monthly").value);
	var num_month = parseInt(document.getElementById("num_Month").value);
	var lumpsum = document.getElementById("lumpsumAmt");
	var gpfAmt = "";
	//Get the monthly Radio button
	var monthlyRadio = document.getElementById("monthly_gpf");
	//Get the lumpsum Radio buttion
	var lumpsumRadio = document.getElementById("lumpsum_gpf");

	if (monthlyRadio.checked) {
		
		if (Number.isInteger(monthly_amt) && Number.isInteger(num_month)) {
			
			 gpfAmt = monthly_amt*num_month;
			return gpfAmt;
		}
	}

	if (lumpsumRadio.checked) 
	{
		console.log("inside lumpsum heading");

		 gpfAmt = parseInt(lumpsum.value);
		 console.log(" lumpsum value "+ gpfAmt);
		return gpfAmt;
	}
}

//this function calculates the total GPF contribution and updates the label in GPF contribution modal box
function totalGPF_heading(){
	console.log("gpf heading");

	var totalGPF_Amt = document.getElementById("totalGPF");
	
	//Get the monthly Radio button
	var monthlyRadio = document.getElementById("monthly_gpf");
	//Get the lumpsum Radio buttion
	var lumpsumRadio = document.getElementById("lumpsum_gpf");
	
	//This function is called to calculate the GPF amount
	var gpfAmt = calc_GPF();

	// console.log("gpf value received "+ gpfAmt);

	totalGPF_Amt.innerHTML = "";
	
	if (Number.isInteger(gpfAmt)) 
	{
		
		console.log("inside if is integer");
		if (monthlyRadio.checked) 
		{
			totalGPF_Amt.innerHTML = "The Total GPF deduction is Rs " + gpfAmt + "/-";
			// totalGPF_Amt.display = "block";
		}
		console.log(lumpsumRadio.checked);
		if (lumpsumRadio.checked) 
		{
			console.log("inside lumpsum heading11");
			
			totalGPF_Amt.innerHTML = "The Total GPF deduction is Rs " + gpfAmt + "/-";
		}
	
	}
}

//This function is called when the gpf modal box is closed to clear the inputs 
function clearGpfInputs(){


	var amtMonthly = document.getElementById("amt_monthly");
	var numMonth = document.getElementById("num_Month");
	var lumpsumAmt = document.getElementById("lumpsumAmt");

	var totalGPF_Amt = document.getElementById("totalGPF");

	//This sets the input values to null string
	amtMonthly.value="";
	numMonth.value="";
	lumpsumAmt.value="";
	totalGPF_Amt.innerHTML="";
}


function gpfSideBar() {
	
	//getting the side info box of total GPF contribution
	var side_gpfTotal = document.getElementById("totalGPF_contribution");

	//variable to store the calculated GPF contribution
	var gpfAmt = calc_GPF();

	if (Number.isInteger(gpfAmt)) {

		side_gpfTotal.innerHTML = "The Total GPF Contribution is Rs " + gpfAmt + "/-";
		close_gpfModal();

	}
	else
	{
		alert("Entry must be numeric!");
	}

}
//--------------------------------The code for GPF modal box ends ------------------------------


//-----------------This part of the code relates to the Tax Deduction modal box and calculation-----------------

//this function opens the Tax Deduction modal box for getting the details of Tax Deducted
function td_Modal(){	

	
	 document.getElementById("td_inputMonthly").style.display = "none";
	 document.getElementById("td_inputMonths").style.display = "none";

	 if (document.getElementById("monthly_td").checked) {

	 document.getElementById("td_inputMonthly").style.display = "block";
	 document.getElementById("td_inputMonths").style.display = "none";

	 }
	  if (document.getElementById("lumpsum_td").checked) {

	 document.getElementById("td_inputMonthly").style.display = "none";
	 document.getElementById("td_inputMonths").style.display = "block";

	 }

	show_TD_Modal();
}

//this functions opens up the GPF modal box
function show_TD_Modal() {
	
	// Get the modal
	var modal = document.getElementById("myModal_TD");

	// Get the button that opens the modal
	// var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementById("close_td");

		  
	 
	 // When the user clicks the button, open the modal 
	  modal.style.display = "block";
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		// clearGpfInputs();
	  close_tdModal();
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	  	// clearGpfInputs();
	   close_tdModal();
	  }
	}
}

//This function closes the modal GPF contribution box when ok button is clicked or whatever
function close_tdModal() {
	var modal = document.getElementById("myModal_TD");
	
	modal.style.display = "none";
	clearTDInputs();
}

//This function is called when the TD input mode in TD modal box is selected either monthly or lumpsum
function tdContribution(){

	//Get the monthly Radio button
	var monthlyRadio = document.getElementById("monthly_td");
	//Get the lumpsum Radio buttion
	var lumpsumRadio = document.getElementById("lumpsum_td");


//The inputs of GPF contribution needs to be cleared during toggle
	var amtMonthly = document.getElementById("td_amt_monthly");
	var numMonth = document.getElementById("td_num_Month");
	var lumpsumAmt = document.getElementById("td_lumpsumAmt");

	//These are the paragraphs element containing the tax deduction details  
	var totalTD_Amt = document.getElementById("totalTD");
	var hecess_Amt = document.getElementById("HE_cess");
	var gross_TD = document.getElementById("grossTD");
	// console.log(monthlyRadio.checked);

	if (monthlyRadio.checked) {
		console.log(monthlyRadio.checked);
		document.getElementById("td_inputMonthly").style.display = "block";
		document.getElementById("td_inputMonths").style.display = "none";
		
		totalTD_Amt.innerHTML = "";
		hecess_Amt.innerHTML = "";
		gross_TD.innerHTML = "";


		lumpsumAmt.value = "";
		console.log(lumpsumAmt);
	}

	if (lumpsumRadio.checked) {

		console.log("inside lumpsum");
		document.getElementById("td_inputMonths").style.display = "block";
		document.getElementById("td_inputMonthly").style.display = "none";
		
		amtMonthly.value= "";
		numMonth.value = "";
		totalTD_Amt.innerHTML = "";
		hecess_Amt.innerHTML = "";
		gross_TD.innerHTML = "";
	}
}


//this function calculates the GPF contribution

function calc_TD(){

//Getting the inputs
	var monthly_amt = parseInt(document.getElementById("td_amt_monthly").value);
	var num_month = parseInt(document.getElementById("td_num_Month").value);
	var lumpsum = document.getElementById("td_lumpsumAmt");
	var tdAmt = "";
	//Get the monthly Radio button
	var monthlyRadio = document.getElementById("monthly_td");
	//Get the lumpsum Radio buttion
	var lumpsumRadio = document.getElementById("lumpsum_td");

	if (monthlyRadio.checked) {
		
		if (Number.isInteger(monthly_amt) && Number.isInteger(num_month)) 
		{	
			 tdAmt = monthly_amt*num_month;
			return tdAmt;
		}
	}

	if (lumpsumRadio.checked) 
	{
		console.log("inside lumpsum heading");
		tdAmt = parseInt(lumpsum.value);
		console.log(" lumpsum value "+ tdAmt);
		return tdAmt;
	}
}

//this function calculates the total Tax Deduction and updates the label in TD deduction in modal box
function totalTD_heading(){
	console.log("TD heading");

	var totalTD_Amt = document.getElementById("totalTD");
	var HEcessAmt = document.getElementById("HE_cess");
	var gross_TD = document.getElementById("grossTD");
	
	//Get the monthly Radio button
	var monthlyRadio = document.getElementById("monthly_td");
	//Get the lumpsum Radio buttion
	var lumpsumRadio = document.getElementById("lumpsum_td");
	
	//This function is called to calculate the GPF amount
	var tdAmt = calc_TD();

	// console.log("gpf value received "+ gpfAmt);

	totalTD_Amt.innerHTML = "";
	HEcessAmt.innerHTML = "";
	gross_TD.innerHTML = "";
	
	if (Number.isInteger(tdAmt)) 
	{
		
		console.log("inside if is integer");
		if (monthlyRadio.checked) 
		{
			totalTD_Amt.innerHTML = "The Tax Deducted is Rs " + tdAmt + "/-";
			var cess = Math.round(tdAmt*0.04);
			var grosstax = cess + tdAmt;
			HEcessAmt.innerHTML = "The Education and Health Cess is Rs " + cess + "/-";
			gross_TD.innerHTML = "The Total Tax Deducted is Rs " + grosstax + "/-";
			// totalGPF_Amt.display = "block";

		}
		console.log(lumpsumRadio.checked);
		if (lumpsumRadio.checked) 
		{
			console.log("inside lumpsum heading11");	
			totalTD_Amt.innerHTML = "The Tax Deducted is Rs " + tdAmt + "/-";
			var cess = Math.round(tdAmt*0.04);
			var grosstax = cess + tdAmt;
			HEcessAmt.innerHTML = "The Education and Health Cess is Rs " + cess + "/-";
			gross_TD.innerHTML = "The Total Tax Deducted is Rs " + grosstax + "/-";
		}
	}
}
//This function is called when the TD modal box is closed to clear the inputs 
function clearTDInputs(){

	var amtMonthly = document.getElementById("td_amt_monthly");
	var numMonth = document.getElementById("td_num_Month");
	var lumpsumAmt = document.getElementById("td_lumpsumAmt");

	var totalTD_Amt = document.getElementById("totalTD");
	var HEcessAmt = document.getElementById("HE_cess");
	var gross_TD = document.getElementById("grossTD");

	//This sets the input values to null string
	amtMonthly.value="";
	numMonth.value="";
	lumpsumAmt.value="";
	totalTD_Amt.innerHTML="";
	HEcessAmt.innerHTML = "";
	gross_TD.innerHTML = "";
}

//This function updates the side bar information of Tax Deducted
function tdSideBar() {
	
	//getting the side info box of total Tax deduction
	var side_tdTotal = document.getElementById("totalTax_Deducted");

	//variable to store the calculated Tax deduction
	var tdAmt = Math.round(1.04*calc_TD());
	console.log(tdAmt);
	if (Number.isInteger(tdAmt)) {

		side_tdTotal.innerHTML = "The Total Tax Deducted is Rs " + tdAmt + "/-";
		close_tdModal();

	}
	else
	{
		alert("Entry must be numeric!");
	}

}

//----------------------------The Code for Tax Deduction modal box ENDS -------------------------



//-----------------This part of the code relates to the Misc. Inocme modal box and calculation-----------------

//this function opens the Tax Deduction modal box for getting the details of Tax Deducted
function misc_Modal(){	

	
	show_misc_Modal();
}

//this functions opens up the GPF modal box
function show_misc_Modal() {
	
	// Get the modal
	var modal = document.getElementById("myModal_misc");

	// Get the button that opens the modal
	// var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementById("close_misc");
 
 	clearmiscInputs();
	// When the user clicks the button, open the modal 
	modal.style.display = "block";
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		// clearGpfInputs();
	  close_miscModal();
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	  	// clearGpfInputs();
	   close_miscModal();
	  }
	}
}

//This function closes the modal Misc Income when ok button is clicked or whatever
function close_miscModal() {
	var modal = document.getElementById("myModal_misc");
	
	modal.style.display = "none";
	clearmiscInputs();
}

//This function is called when the TD input mode in TD modal box is selected either monthly or lumpsum
function miscTotal(){

		console.log("misc total");


	var miscBonus = document.getElementById("misc_bonus");
	var miscHonorarium = document.getElementById("misc_honorarium");
	var miscArrears = document.getElementById("misc_arrears");
	var miscOTA = document.getElementById("misc_ota");

	var Total_Misc = 0;

	if (Number.isInteger(parseInt(miscBonus.value))) {

		Total_Misc += parseInt(miscBonus.value);
	}

	if (Number.isInteger(parseInt(miscHonorarium.value))) {

		Total_Misc += parseInt(miscHonorarium.value);
	}

	if (Number.isInteger(parseInt(miscArrears.value))) {

		Total_Misc += parseInt(miscArrears.value);
	}

	if (Number.isInteger(parseInt(miscOTA.value))) {

		Total_Misc += parseInt(miscOTA.value);
	}

	return Total_Misc;

}

//this function calculates the total Tax Deduction and updates the label in TD deduction in modal box
function totalmisc_heading(){

	console.log("misc heading");

	var totalmisc_Amt = document.getElementById("totalMISC");

	var Total_Misc_Amt = miscTotal();

	console.log("misc heading" + Total_Misc_Amt);

	if (Total_Misc_Amt != 0) {

		totalmisc_Amt.innerHTML = "The Total Misc. Income is Rs  "+ Total_Misc_Amt + "/-";
		totalmisc_Amt.style.display = "block";
	}
	else{
		totalmisc_Amt.style.display = "none";
	}
	
}

//This function is called when the TD modal box is closed to clear the inputs 
function clearmiscInputs(){

	var miscBonus = document.getElementById("misc_bonus");
	var miscHonorarium = document.getElementById("misc_honorarium");
	var miscArrears = document.getElementById("misc_arrears");
	var miscOTA = document.getElementById("misc_ota");
	var totalmisc_Amt = document.getElementById("totalMISC");
	
	miscBonus.value = "";
	miscHonorarium.value = "";
	miscArrears.value = "";
	miscOTA.value = "";
	totalmisc_Amt.innerHTML = "";
}

//This function updates the side bar information of Tax Deducted
function miscSideBar() {
	
	//getting the side info box of total Tax deduction
	var side_miscTotal = document.getElementById("totalMisc_Income");

	console.log("misc Side Bar");
	var misc_Total = miscTotal();

	if (misc_Total < 1) {

		alert("The value must be numeric!")
	} 
	else
	{
		side_miscTotal.innerHTML = "The Total Misc. Income is Rs " + misc_Total + "/-";
		close_miscModal();
	}
}

// ----------------------The Code for Misc Income Modal Box ENDS -----------------------------------


//---------------------The Code for Peronsal Pay and Deputation Allowance STARTS -------------------

function showTab(){

	var multiTab = document.getElementById("btn_tab");
	var btnPersonalPay = document.getElementById("tab_personalPay");
	var btnDeputationAllowance = document.getElementById("tab_deputationAllowance");

	btnPersonalPay.style.display = "none";
	btnDeputationAllowance.style.display = "none";

	ppDD_Modal();
	
	var btnPersonalPay = document.getElementById("btn_personalPay");

	btnPersonalPay.style.background = "rgb(12, 105, 95)";
	btnPersonalPay.style.color = "white";
}

//this function opens the Tax Deduction modal box for getting the details of Tax Deducted
function ppDD_Modal(){	
	

	var btnPersonalPay = document.getElementById("tab_personalPay");
	var btnDeputationAllowance = document.getElementById("tab_deputationAllowance");

	btnDeputationAllowance.style.display = "none"; 

	document.getElementById("radio_monthly_pp").checked = true;

	btnPersonalPay.style.display = "block";
	//btn_PP_styleON();
	show_ppDD_Modal();
}

function btnPP_style_ON() {


	btnDA_style_OFF();
	var btnPersonalPay = document.getElementById("btn_personalPay");

	btnPersonalPay.style.background = "rgb(12, 105, 95)";
	btnPersonalPay.style.color = "white";
}

function btnPP_style_OFF() {
	
	var btnPersonalPay = document.getElementById("btn_personalPay");

	btnPersonalPay.style.background = "white";
	btnPersonalPay.style.color = "black";

}

function btnDA_style_ON() {
	btnPP_style_OFF();
	
	var btnPersonalPay = document.getElementById("btn_deputationAllowance");

	btnPersonalPay.style.background = "rgb(12, 105, 95)";
	btnPersonalPay.style.color = "white";
}

function btnDA_style_OFF() {
	
	var btnPersonalPay = document.getElementById("btn_deputationAllowance");

	btnPersonalPay.style.background = "white";
	btnPersonalPay.style.color = "black";

}

//this functions opens up the GPF modal box
function show_ppDD_Modal() {
	
	// Get the modal
	var modal = document.getElementById("myModal_PD");

	// Get the button that opens the modal
	// var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementById("close_pd");
 
	//Two Radio Buttons
	var radioMonthly = document.getElementById("radio_monthly_pp");
	var radioLumpsum = document.getElementById("radio_lumpsum_pp");
	//Two Divs
	var monthlyPP = document.getElementById("monthly_personalPay");
	var lumpsumPP = document.getElementById("lumpsum_personalPay");

	if (radioMonthly.checked) {

		lumpsumPP.style.display = "none";
		monthlyPP.style.display = "block";
	}

	if(radioLumpsum.checked){
		lumpsumPP.style.display = "block";
		monthlyPP.style.display = "none";
	}

 	// clearpdInputs();
	// When the user clicks the button, open the modal 
	modal.style.display = "block";
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		// clearGpfInputs();
	  clearPP_Input();
	  close_pdModal();
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	  	// clearGpfInputs();
	  	clearPP_Input();
	   close_pdModal();
	  }
	}
}

//This function closes the modal Misc Income when ok button is clicked or whatever
function close_pdModal() {
	var modal = document.getElementById("myModal_PD");
	
	modal.style.display = "none";
	// clearpdInputs();
}

function personalPayInput(){

	//Two Radio Buttons
	var radioMonthly = document.getElementById("radio_monthly_pp");
	var radioLumpsum = document.getElementById("radio_lumpsum_pp");
	//Two Divs
	var monthlyPP = document.getElementById("monthly_personalPay");
	var lumpsumPP = document.getElementById("lumpsum_personalPay");
	//Three Inputs
	var input_monthlyAmt = document.getElementById("pp_monthly");
	var input_numMonth = document.getElementById("pp_num_Month");
	var input_lumpsum = document.getElementById("pp_lumpsumAmt");

	var ppHeading = document.getElementById("totalPP");

	ppHeading.style.display = "none";

	if (radioMonthly.checked) {

		lumpsumPP.style.display = "none";
		monthlyPP.style.display = "block";
	}

	if(radioLumpsum.checked){
		lumpsumPP.style.display = "block";
		monthlyPP.style.display = "none";
	}

}

function calcPP() {
	
	console.log("inside calc PP");

	//Two Radio Buttons
	var radioMonthly = document.getElementById("radio_monthly_pp");
	var radioLumpsum = document.getElementById("radio_lumpsum_pp");
	//Two Divs
	var monthlyPP = document.getElementById("monthly_personalPay");
	var lumpsumPP = document.getElementById("lumpsum_personalPay");
	//Three Inputs
	var input_monthlyAmt = document.getElementById("pp_monthly");
	var input_numMonth = document.getElementById("pp_num_Month");
	var input_lumpsum = document.getElementById("pp_lumpsumAmt");

	var ppHeading = document.getElementById("totalPP");

	ppHeading.innerHTML = "";
	var totalPersonalPay = 0;

	if (radioMonthly.checked) {

		if (Number.isInteger(parseInt(input_monthlyAmt.value))) {

			if (Number.isInteger(parseInt(input_numMonth.value))) {

				totalPersonalPay = Math.round(parseInt(input_monthlyAmt.value)*parseInt(input_numMonth.value));

				ppHeading.innerHTML = "The total Personal Pay is Rs "+ totalPersonalPay+ "/-";
				ppHeading.style.display = "block";

				//This will set the hidden p element to extract the numeric value later on
				document.getElementById("num_totalPP").innerHTML = totalPersonalPay;
			}
		}
	}

	if(radioLumpsum.checked){

		if (Number.isInteger(parseInt(input_lumpsum.value))) {

			
				totalPersonalPay = Math.round(parseInt(input_lumpsum.value));

				ppHeading.innerHTML = "The total Personal Pay is Rs "+ totalPersonalPay+ "/-";
				ppHeading.style.display = "block";
		}
	}

}

function clearPP_Input(){

	//Three Inputs
	var input_monthlyAmt = document.getElementById("pp_monthly");
	var input_numMonth = document.getElementById("pp_num_Month");
	var input_lumpsum = document.getElementById("pp_lumpsumAmt");

	var ppHeading = document.getElementById("totalPP");

	input_monthlyAmt.value = "";
	input_numMonth.value = "";
	input_lumpsum.value = "";
	ppHeading.innerHTML = "";
}


function showDeputationAllowance() {
	
	btnPP_style_OFF();
	hideDeputationTotal();
	var btnPersonalPay = document.getElementById("tab_personalPay");
	var btnDeputationAllowance = document.getElementById("tab_deputationAllowance");

	var isEligible = document.getElementById("cb_DeputationAllowance");
	var deputationOptions = document.getElementById("expand_Deputation"); // This is a Div element which is shown only when eligibility is checked
	
	
	btnPersonalPay.style.display = "none";
	btnDeputationAllowance.style.display = "block";
//The options are shown depending the eligiblity check box 
	if (isEligible.checked) {

		deputationOptions.style.display ="block";
		calcDeputationAllowance();
		showDeputationTotal();
	}

	else{
		deputationOptions.style.display ="none";
		hideDeputationTotal();
	}

	clearDepuationInputs();
	
	

}

//This function sets the Inner HTML of the Deputation Total to Null String
function hideDeputationTotal() {
	var totalDeputation = document.getElementById("totalDeputationAllowance"); //heading of the total Deputation Allowance
	totalDeputation.style.display = "none";
}

function showDeputationTotal(){
	var totalDeputation = document.getElementById("totalDeputationAllowance"); //heading of the total Deputation Allowance
	totalDeputation.style.display = "block";
}

function showDeputationOptions(){

	var isEligible = document.getElementById("cb_DeputationAllowance");
	var deputationOptions = document.getElementById("expand_Deputation");

	if (isEligible.checked) {

		deputationOptions.style.display = "block";
		calcDeputationAllowance();
		showDeputationTotal();
	}
	else{
		deputationOptions.style.display = "none";
		clearDepuationInputs();
		hideDeputationTotal();
	}
}

function clearDepuationInputs(){

	var from_period = document.getElementById("selectFromMonths");
	var to_period = document.getElementById("selectToMonths"); 

	from_period.selectedIndex = 0;
	to_period.selectedIndex = 11;
	//hideDeputationTotal();


}

function calcDeputationAllowance(){
	//Get the Gross Income Table
	var grossTable = document.getElementById("grossIncome");

	var from_period = document.getElementById("selectFromMonths");
	var to_period = document.getElementById("selectToMonths");
	var rate_deputation = document.getElementById("selectDeputationRate");

	var totalDeputation = document.getElementById("totalDeputationAllowance"); //total of Deputation Amt in words

	var periodArr = []; //Array to hold the Period for that FY
	var basicPayArr = []; //Array to hold the Basic Pay 

	var isSelectionValid = -1; // This variable ensures that the period selected in DA modal box is valid chronologically
	var totalDeputationAmt = 0; // This will contain the value of calculated Deputation Allowance

	if (INCOME_TABLE_LOADED == 1) {

		//Loading Arrays
		for(var i = 1;i<=12;i++){

			periodArr[i-1] = grossTable.rows[i].cells[0].textContent; 
			basicPayArr[i-1] = parseInt(grossTable.rows[i].cells[3].textContent);
		}
	
		//This function loads the Select Drop Down with the Period
		fillDeputationInfo(periodArr);

		totalDeputationAmt = deputationAmount(basicPayArr);

		if (totalDeputationAmt == 0) {

			alert("The From Period can't be more than the To Period");
			to_period.selectedIndex = 11;
			hideDeputationTotal();
		}
		else{

			totalDeputation.innerHTML = "The Deputation Amt is Rs " + totalDeputationAmt + "/-";
			showDeputationTotal();
			//setting the hidden depuation p element for later extraction

			document.getElementById("num_totalDeputationAllowance").innerHTML = totalDeputationAmt;
		}
	}

	//If the Income Table is not loaded there is no point setting the Deputation Allowance
	else
	{
		alert("Please set the Basic Pay first!");
		close_pdModal();
	}

}

function fillDeputationInfo(periodArr){

	var from_period = document.getElementById("selectFromMonths");
	var to_period = document.getElementById("selectToMonths");

	for(var i = 0; i<=11; i++){
		
		var optionFrom = document.createElement("option");
		 optionFrom.text = periodArr[i];
		 from_period.add(optionFrom);

		 var optionTo = document.createElement("option");
		 optionTo.text = periodArr[i];
		 to_period.add(optionTo);
	}
	
	to_period.selectedIndex = 11;
}

//This function checks the value of selected drop downs when the input is changed
function isPeriodValid(){

	var from_period = document.getElementById("selectFromMonths");
	var to_period = document.getElementById("selectToMonths");
	

	var fromIndex = -1;
	var toIndex = -1;



	fromIndex = from_period.selectedIndex;
	toIndex =to_period.selectedIndex;

	if(toIndex<fromIndex){

		alert("The To Period must be greater than or equal to From Period");
		to_period.selectedIndex = 11;
		hideDeputationTotal();
	}
	else{
		calcDeputationAllowance();
	}

}

//This fuction calculates the DA amount from the period selected and returns it 
function deputationAmount(basicPayArr){
	
	//Select Drop Downs 
	var from_period = document.getElementById("selectFromMonths");
	var to_period = document.getElementById("selectToMonths");
	var rate_deputation = document.getElementById("selectDeputationRate");
	//variables holding the length of time period for which depuation allowance is to be paid
	var fromIndex = -1;
	var toIndex = -1;

	var totalDeputationAmt = 0;

	rate_deputation = DEPUTATION_ALLOWANCE_RATE; //Current Deputation Allowance Rate

	fromIndex = from_period.selectedIndex;
	toIndex = to_period.selectedIndex;

	if(toIndex<fromIndex){

		return 0;
	}
	else{

		for(var i = fromIndex; i<=toIndex; i++)
		{
			if (Math.round(basicPayArr[i]*rate_deputation) >9000){

				totalDeputationAmt +=9000;
			}
			
			else{
				totalDeputationAmt += Math.round(basicPayArr[i]*rate_deputation);
			}
		}

		return totalDeputationAmt;
	}
}

//This function sets the side info area of the 
function ppddSideBar(){

	var totalPP = document.getElementById("num_totalPP");
	var totalDepAll = document.getElementById("num_totalDeputationAllowance");

	var sidePP = document.getElementById("totalPersonal_Pay");
	var sideDA = document.getElementById("totalDeputationSide");

	sidePP.innerHTML = "The Total Personal Pay is Rs "+ totalPP.innerHTML+ "/-";
	sideDA.innerHTML = "The Total Deputation Allowance is Rs "+totalDepAll.innerHTML+ "/-" ;

	close_pdModal();
}

//--------------------The Code for Personal Pay and Deputation Allowance ENDS--------------------

//-----------------------The Code for Rent Receipt Modal Box STARTS -------------------------------

function show_rent_Modal() {
	
	// Get the modal
	var modal = document.getElementById("myModal_rent");

	// Get the <span> element that closes the modal
	var span = document.getElementById("close_rent");
 
 	clearRentInputs();

 	//It is called when the Rent Receipt Modal Box is opened
 	calcRentReceipt();
	
	// When the user clicks the button, open the modal 
	
	modal.style.display = "block";
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		// clearGpfInputs();
	  close_rentModal();
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	  	// clearGpfInputs();
	   close_rentModal();
	  }
	}
}

//This function closes the modal Misc Income when ok button is clicked or whatever
function close_rentModal() {
	var modal = document.getElementById("myModal_rent");
	
	modal.style.display = "none";
	clearRentInputs();
}

//This function is called when the TD modal box is closed to clear the inputs 
function clearRentInputs(){

	document.getElementById("rentInput").value = "";

		var rentInfo = document.getElementById("totalRentReceipt");
		var excessInfo = document.getElementById("totalAdmissibleRent");
		var HRAinfo = document.getElementById("totalHRA");

		rentInfo.innerHTML = "";
		excessInfo.innerHTML = "";
		HRAinfo.innerHTML = "";
	
}

function calcRentReceipt(){

	//Get the Gross Income Table
	var grossTable = document.getElementById("grossIncome");

	var from_period = document.getElementById("selectFromRent");
	var to_period = document.getElementById("selectToRent");
	
	var totalRent = document.getElementById("totalRentReciept"); //total of Deputation Amt in words

	var periodArr = []; //Array to hold the Period for that FY
	var basic_DA_Arr = []; //Array to hold the Basic Pay + DA
	var HRA_Arr = []; //Array to hold the HRA value

	var totalRent = 0; // 
	var excessRentAmt = 0; // rent paid in excess of 10% of Basic + DA 
	var totalHRA = 0; // total HRA amount

	if (INCOME_TABLE_LOADED == 1) {

		for(var i = 1; i <=12; i++){

		//contains the period from the Gross Income table 
		periodArr[i-1] = grossTable.rows[i].cells[0].textContent;
		//filling the sum of Basic and DA in the array at 10%
		basic_DA_Arr[i-1] = Math.round(0.10*(parseInt(grossTable.rows[i].cells[3].textContent)+parseInt(grossTable.rows[i].cells[4].textContent)));

		HRA_Arr[i-1] = parseInt(grossTable.rows[i].cells[5].textContent);

		}

		//This function fills the drop down in Rent Reciept Modal Box with period of selected Financial Year
		loadPeriod(periodArr);

		totalRent = totalRentPaid(periodArr);

		excessRentAmt = excessRentCalc(periodArr,basic_DA_Arr);

		totalHRA = totalHRA_calc(HRA_Arr);

		//These elements do not appear but act as a placeholder for values for later use
		document.getElementById("num_totalRentReceipt").innerHTML = totalRent;
		document.getElementById("num_totalAdmissibleRent").innerHTML = excessRentAmt;
		document.getElementById("num_totalHRA").innerHTML = totalHRA;

		//this function will update the bottom info area of the Rent Receipt Modal Box
		updateHeading_Rent(totalRent,excessRentAmt,totalHRA);

		// console.log(basic_DA_Arr);
		// console.log(totalRent);
		// console.log(excessRentAmt);
		// console.log(totalHRA);
	}	
}

function updateHeading_Rent(totalRent,excessRentAmt,totalHRA){

		var rentInfo = document.getElementById("totalRentReceipt");
		var excessInfo = document.getElementById("totalAdmissibleRent");
		var HRAinfo = document.getElementById("totalHRA");

		rentInfo.innerHTML = "Total Rent Paid is Rs " + totalRent+ "/-";
		excessInfo.innerHTML = "Total Rent Paid in excess of 10% of Basic + DA is Rs " + excessRentAmt+ "/-";
		HRAinfo.innerHTML = "The Total HRA received is Rs " + totalHRA + "/-";

}

//This function loads the Drop Down of the Period from the Table. 
function loadPeriod(periodArr){

	var from_period = document.getElementById("selectFromRent");
	var to_period = document.getElementById("selectToRent");

	for(var i = 0; i<=11; i++){
		
		var optionFrom = document.createElement("option");
		 optionFrom.text = periodArr[i];
		 from_period.add(optionFrom);

		 var optionTo = document.createElement("option");
		 optionTo.text = periodArr[i];
		 to_period.add(optionTo);
	}
	
	to_period.selectedIndex = 11;

}

// This function calculates the total rent paid for the selected period
function totalRentPaid(periodArr){

	//Select Drop Downs 
	var from_period = document.getElementById("selectFromRent");
	var to_period = document.getElementById("selectToRent");

	var monthlyRent = document.getElementById("rentInput");
	//variables holding the length of time period for which depuation allowance is to be paid
	var fromIndex = -1;
	var toIndex = -1;

	var totalRentAmt = 0;

	fromIndex = from_period.selectedIndex;
	toIndex = to_period.selectedIndex;

	if(toIndex<fromIndex){

		return -1;
	}
	else{

		if (Number.isInteger(parseInt(monthlyRent.value))) 
		{
			for(var i = fromIndex; i<=toIndex; i++)
			{
				totalRentAmt += Math.round(parseInt(monthlyRent.value));
			}
		}
		return totalRentAmt;
	}
}


//This function calculates and returns the rent paid in excess of the basic and DA 
function excessRentCalc(periodArr, basic_DA_Arr)
{
	//Select Drop Downs 
	var from_period = document.getElementById("selectFromRent");
	var to_period = document.getElementById("selectToRent");

	var monthlyRent = Math.round(parseInt(document.getElementById("rentInput").value));
	//console.log("Monthly Rent" + monthlyRent);
	//variables holding the length of time period for which depuation allowance is to be paid
	var fromIndex = -1;
	var toIndex = -1;

	var totalExcessRent = 0;

	fromIndex = from_period.selectedIndex;
	toIndex = to_period.selectedIndex;

	if(toIndex < fromIndex){

		return -2;
	}

	for(var i = fromIndex; i<=toIndex; i++)
	{
		//console.log(parseInt(basic_DA_Arr[i]));

			if (monthlyRent > parseInt(basic_DA_Arr[i])) {
				totalExcessRent += monthlyRent - parseInt(basic_DA_Arr[i]);
			}
			else{
				totalExcessRent +=0;
			}
	}
	console.log("totalExcess" + totalExcessRent);
	return totalExcessRent;
}

//This function calculates the Total HRA amount paid
function totalHRA_calc(HRA_Arr){
	
	//Select Drop Downs 
	var from_period = document.getElementById("selectFromRent");
	var to_period = document.getElementById("selectToRent");

	var totalHRA_amt = 0;

	var fromIndex = -1;
	var toIndex = -1;

	fromIndex = from_period.selectedIndex;
	toIndex = to_period.selectedIndex;

	for(var i = fromIndex; i<=toIndex; i++){

		totalHRA_amt += HRA_Arr[i];
	}

	return totalHRA_amt;
}

function rentSideBar(){

	//Get the relevant hidden part of the rent modal box for getting the numeric values
		var totalRentReceipt = Math.round(parseInt(document.getElementById("num_totalRentReceipt").innerHTML));
		var totalHRA = Math.round(parseInt(document.getElementById("num_totalHRA").innerHTML));
		var excessRent = Math.round(parseInt(document.getElementById("num_totalAdmissibleRent").innerHTML));

		var deductibleHRA = Math.min(totalRentReceipt,totalHRA,excessRent); //Minimum of three is admissible for deduction

		//get the side info bar for HRA deduction
		var side_HRA = document.getElementById("totalHRAdeduction");

		side_HRA.innerHTML = "The Admissible HRA deduction is Rs " + deductibleHRA + "/-"

		close_rentModal();

}
//----------------------The Code for Rent Receipt Modal Box ENDS -----------------------------------