// var RATEFOUND = false;

//Globar Variable for row selected at any time
var SELECTED_ROW = -1;

var EXPENDITURE = 0;
var ADMISSIBLE = 0;

//This loads the data list when the web page loads
function loadDataList(){

	console.log(testNames[1813][0]);// console.log(testNames[1][1]);

	var dataList = document.getElementById("test-name");

	testNames.forEach(function(item){
		
		var option = document.createElement("option");

		item.forEach(function(item,index){
			//console.log(item);
			if (index == 0) {

				option.value = item;
				dataList.appendChild(option);
			}
		})

	});
	
}

//This updated the rates as the user select an item from the datalist
function fillUpOnSelection(){
	
	 var selectedInput = document.getElementById("input_investigation").value;
	 var expenditure = document.getElementById("input_expenditure");
	 var admissible = document.getElementById("input_admissible");

	 var accreditation = document.getElementById("accreditation");
	 var remarks = document.getElementById("remarks");
	 // alert(testNames.length);

	 var qty = parseInt(document.getElementById("quantity").value);
	 var chkBox = document.getElementById("chkBoxEntitlement").value;

	 var restrictEntilement = document.getElementById("entitlement");
	// console.log(document.getElementById("chkBoxEntitlement").checked);

	for (var i = 0; i < testNames.length; i++) {
		
		//this matches the input text with the rate list and if found, fetches the relevant rates.
		if (selectedInput == testNames[i][0]) {
			console.log(testNames[i][0]);

			remarks.selectedIndex = 1; //The rates are found... now setting the remarks dropdown to as per CGHS rates
			//RATEFOUND = true;
			//the selectedIndex of 1 = NABH and 2 = Non-NABH, the rates adjusts accordingly
			if (accreditation.selectedIndex == 1) {
				expenditure.value = Math.round(parseInt(testNames[i][2])*qty);
				admissible.value = Math.round(parseInt(testNames[i][2])*qty);
			}
			if (accreditation.selectedIndex == 2) {
				expenditure.value = Math.round(parseInt(testNames[i][1])*qty);
				admissible.value = Math.round(parseInt(testNames[i][1])*qty);
			}
		}
	}

	if (document.getElementById("chkBoxEntitlement").checked) {

		

		if (restrictEntilement.selectedIndex == 2) {
			return;
		}
		else{
			if (restrictEntilement.selectedIndex == 1) {
				expenditure.value = Math.round(parseInt(expenditure.value)*1.15);
				admissible.value = Math.round(parseInt(admissible.value)*1.15);
			}
			else{

				if (restrictEntilement.selectedIndex == 3) {

				expenditure.value = Math.round(parseInt(expenditure.value)*0.9);
				admissible.value = Math.round(parseInt(admissible.value)*0.9);
				}
				else{
					alert("Select Entitlement of the Beneficiary Please!");
				}
				
			}
		}
	}
	console.log(restrictEntilement.selectedIndex);	
	storeRates();
}

//this checks if the investigation input box 
function rateUpdate(){

	var selectedInput = document.getElementById("input_investigation").value;

	if (selectedInput == "") {
		return;
	}
	else{
		fillUpOnSelection();
	}
}

//this function increases the cost of test by the quantity times

function multiplyRates()
{
	// var expenditureAmt = parseInt(document.getElementById("input_expenditure").value);
	// var admissibleAmt = parseInt(document.getElementById("input_admissible").value);
	var quant_val = parseInt(document.getElementById("quantity").value);

	var revisedExpenditure = EXPENDITURE*quant_val;
	var revisedAdmissible = ADMISSIBLE*quant_val;

	document.getElementById("input_expenditure").value = revisedExpenditure;
	document.getElementById("input_admissible").value = revisedAdmissible;

}

function storeRates()
{
	EXPENDITURE = parseInt(document.getElementById("input_expenditure").value);
	ADMISSIBLE = parseInt(document.getElementById("input_admissible").value);
}

function highlightRow(e){
	
	// console.log(e.target.parentNode.parentNode.parentNode.rows.length);
	var medTable = document.getElementById("id_medical_table");

	var rowClicked = e.target.parentNode;

	var toggleHighlight = 1; // this is the initial value
	
	
	if (rowClicked.className == "highlightOnSelection") {
		toggleHighlight = -1; //the value is set to -1 if the the row is already highlighted
		SELECTED_ROW = -1;
	}

	//This removes the className from the all table rows.
	for (var i = 1; i<= medTable.rows.length;i++) {
		medTable.rows[i-1].className = "";
	
	}
	
	if (toggleHighlight ==1) {

		if (rowClicked.rowIndex>=1) {
		
			rowClicked.className = "highlightOnSelection"; //this class styles the selected row.
			SELECTED_ROW = rowClicked.rowIndex; //This updates the global flag which indicates the current row selection
			 //for debugging
		
		}
	}
	console.log("toggleHighlight"+toggleHighlight);
	console.log("Toggle"+SELECTED_ROW);
	// console.log(rowClicked.rowIndex);
	//Select only the table body... i.e. rowindex greater than 0 only
}

// This adds the row to the table if the entries are valid.

function addToTable()

{

	var sNo = document.getElementById("id_medical_table").rows.length;
	var testName = document.getElementById("input_investigation").value;
	var actualExpenditure = parseInt(document.getElementById("input_expenditure").value);
	var admissibleAmt = parseInt(document.getElementById("input_admissible").value);
	var remarks = document.getElementById("remarks");
	
	if (isNaN(actualExpenditure) || isNaN(admissibleAmt)) 
	{
		alert("Incorrect Amount Entered");
	}
	else 
	{
			if(typeof actualExpenditure == "number") 
			{		
				if (typeof admissibleAmt == "number") 
				{
					var medTable = document.getElementById("id_medical_table");

					var numRow = medTable.rows.length;
					
					console.log(numRow + "Inside addToTable");
					
					//Adding a row to the Medical Table.
					var newRow = medTable.insertRow(numRow);

					// Inserting Cells to the newly created Row above
					var cell0 = newRow.insertCell(0);
					var cell1 = newRow.insertCell(1);
					var cell2 = newRow.insertCell(2);
					var cell3 = newRow.insertCell(3);
					var cell4 = newRow.insertCell(4);

					//Adding values to the newly created cells 
					
					if (sNo == 1) {
						cell0.innerHTML = sNo; //if there is no total row initially, then s.no should be 1
					}
					else{
						cell0.innerHTML = sNo-1; //-1 is due to the total row
					}
					cell1.innerHTML = testName;
					cell2.innerHTML = actualExpenditure;
					cell3.innerHTML = admissibleAmt;
					cell4.innerHTML = remarks.options[remarks.selectedIndex].text;


					//This is for removing the last total row so that a new total row can be added in end
					if (numRow>1) {
						medTable.deleteRow(numRow-1);
					}
					
				}
			}

		// We may need this part in future.
		// else{
		// 		alert("Amount Entered is invalid");
		// 	}
		totalRow(); //this function is called to calculate the new total row
	}//else ends

	clearInputs();

	
}

function addOnEnter(e){

	if (event.keyCode === 13) {
    // Cancel the default action, if needed
    // event.preventDefault();
    // // Trigger the button element with a click
   addToTable();

  }

}

//when the data is added to the table, the inputs are cleared for next date entry 
function clearInputs(){
	
	document.getElementById("input_investigation").value = "";
	document.getElementById("input_investigation").focus();

	document.getElementById("input_expenditure").value = "";
	// document.getElementById("input_expenditure").focus();

	document.getElementById("input_admissible").value = "";
	// document.getElementById("input_admissible").focus();
	document.getElementById("quantity").value = 1;

	document.getElementById("chkBoxEntitlement").checked = false;

	document.getElementById("remarks").selectedIndex = 1;
	SELECTED_ROW = -1;
}

//This calculates the total of the amount when called.
function totalRow(){

	var table_medical = document.getElementById("id_medical_table");

	var numRow = table_medical.rows.length;

	var totalExpenditure = 0;
	var totalAdmissible = 0;

	var tempExp = 0; //a temp variable for holding the cell value of Expenditure incurred
	var tempAdmissible = 0; //a temp variable for holding the cell value of Admissible rate
	console.log(numRow +"inside totalRow");

	for(var i =1; i<numRow; i++)
	{
		// The value of each cell is parsed to Integer. In case of text, the value is returned as NaN.
		// This complicates the total calculation. Hence in order to ensure only numeric values are considered
		// an if condition is being used to convert the NaN values to zero.
		tempExp = parseInt(table_medical.rows[i].cells[2].textContent);
		tempAdmissible = parseInt(table_medical.rows[i].cells[3].textContent);

		if (isNaN(tempExp) || isNaN(tempAdmissible)) {
			tempExp = 0;
			tempAdmissible = 0;
		}
		// console.log(table_medical.rows[i].cells[3].textContent);
		totalExpenditure += tempExp;
		totalAdmissible += tempAdmissible;
		// console.log(totalExpenditure);
		// console.log(totalAdmissible);
	}	

	//A new Total Row is added below
	var newRow = table_medical.insertRow(numRow);
	var cell0 = newRow.insertCell(0);
	var cell1 = newRow.insertCell(1);
	var cell2 = newRow.insertCell(2);
	var cell3 = newRow.insertCell(3);
	var cell4 = newRow.insertCell(4);

	cell0.innerHTML = "";
	cell1.innerHTML = "Total";
	cell2.innerHTML = totalExpenditure;
	cell3.innerHTML = totalAdmissible;
	cell4.innerHTML = "";
	// table_medical.deleteRow(numRow-1);
}

function deleteRow(){

	// alert("Inside Delete Row");
	console.log("selected row "+SELECTED_ROW);
	var totalRow1 = document.getElementById("id_medical_table").rows.length;

	console.log("deleteRow"+document.getElementById("id_medical_table").rows.length);
	
	if (SELECTED_ROW != -1) {

		if (totalRow1 > 1) {

			if (SELECTED_ROW < totalRow1-1) {
				
				//deletes the selected row, the above if ensures that total row is not deleted
				document.getElementById("id_medical_table").deleteRow(SELECTED_ROW);
				SELECTED_ROW = -1; // this Global flag needs to reset as no row is selected after deletion
				
				if (totalRow1>1) 
				{
					// alert("");
					//once deleted, the total needs to be recalculated. Hence the old total is removed
					document.getElementById("id_medical_table").deleteRow(totalRow1-2);
					//totalRow is called to recalculate the total amount
					totalRow();
					sNoReset();
					SELECTED_ROW = -1;
				}
			}
			else{

				alert("Don't delete the Total Row!")
				document.getElementById("id_medical_table").rows[totalRow1-1].className = "";
				SELECTED_ROW = -1;
			}
		}	

	else{
			alert("Don't delete the Table Header!");
			SELECTED_ROW = -1;
		}

	}
	else{

		alert("Please select a row for deletion!");
	}
	

}

function insertRow(){

	var totalRow1 = document.getElementById("id_medical_table").rows.length;

	var medTable = document.getElementById("id_medical_table");
	if (SELECTED_ROW == -1) {
		alert("Where do you want to insert the row? \n Select a row first");
		return;
	}
	else{
		if (SELECTED_ROW < totalRow1-1) {

			var newRow = medTable.insertRow(SELECTED_ROW+1);
			// Inserting Cells to the newly created Row above
			var cell0 = newRow.insertCell(0);
			var cell1 = newRow.insertCell(1);
			var cell2 = newRow.insertCell(2);
			var cell3 = newRow.insertCell(3);
			var cell4 = newRow.insertCell(4);
		}
		sNoReset();
		console.log(SELECTED_ROW+"selectedrow" ); console.log(totalRow1-1);
	}
	
}

function reset_Form(){

	
	var patientName = document.getElementById("input_name");
	var entitlementType = document.getElementById("entitlement");
	var hospName = document.getElementById("input_hosp");
	var hospAccr = document.getElementById("accreditation");

	patientName.value = "";
	entitlementType.selectedIndex = 2;
	hospName.value = "";
	hospAccr.selectedIndex = 1;


	clearInputs();
	deleteTableRows();
}

function deleteTableRows() {

	var medTable = document.getElementById("id_medical_table");

	var totalRows = parseInt(medTable.rows.length);

	if (totalRows>1)
	{	
		console.log("deleteTable "+totalRows);
		for(var i = totalRows-1; i>=1; i--)
		{	
			console.log("deleteTable "+totalRows);
			medTable.deleteRow(i);
		}
		SELECTED_ROW = -1;
	}	
		

}


//This function is called then when there is a row deletion so that the S. No. are rewritten
function sNoReset(){

	var table_medical = document.getElementById("id_medical_table");

	var numRow = table_medical.rows.length;

	for(var i =1; i<numRow-1; i++)
	{
		table_medical.rows[i].cells[0].innerHTML = i; //Resets the S.No. in the table
	}	
}

//This copies the table to clipboard
function copyTable(){
	//alert("copy");
	var table_medical = document.getElementById("id_medical_table");

	var range = document.createRange();

	range.selectNode(table_medical);
	window.getSelection().addRange(range);
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
	copyToast();
}

//This shows a toast message at the bottom indicating that the table has been copied.
function copyToast() {
 // alert("hhh")
  // Get the snackbar DIV
  var x = document.getElementById("copy_snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 1729 miliseconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
} 

//This shows a toast message at the bottom indicating that the table has been copied.
function editToast() {
 // alert("hhh")
  // Get the snackbar DIV
  var x = document.getElementById("edit_snackbar");

  // Add the "show" class to DIV
  x.className = "show_edit";

  // After 1729 miliseconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show_edit", ""); }, 1500);
} 


//This function saves the table in CSV format for records
function saveAsCSV(){

	var html = document.querySelector("table").outerHTML;

	var pName = document.querySelector("#input_name").value;
	var timeStamp = Date.now();
	pName = pName.replace(".",""); //dot in file name changes file extension. Needs to be replaced.
	pName = pName+timeStamp;
	export_table_to_csv(html, pName);
}

function export_table_to_csv(html, filename) {
	var csv = [];
	var rows = document.querySelectorAll("table tr");
	
    for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");
		
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
		csv.push(row.join(","));		
	}

    // Download CSV
    download_csv(csv.join("\n"), filename);
}

function download_csv(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV FILE
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
}


function highlightBackground(){
	// alert("highlightBackground");
// this.style.backgroundColor = "blue";
}

function editRow(){
	// alert("he");

		// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	// var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	modal.style.display = "flex";

	console.log(document.getElementById("edit_input_investigation"));
	
	document.getElementById("edit_input_investigation").select();

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
	fetchRow();
}

//This function fills the cotent of the table form with the selected content
function fetchRow(){

	var modal = document.getElementById("myModal");

	//to check if the row selected is the valid or not
	if (SELECTED_ROW >0) {
		
		var medTable = document.getElementById("id_medical_table");
		var totalRow = medTable.rows.length;

		var tempExp = parseInt(medTable.rows[SELECTED_ROW].cells[2].textContent);
		var tempAdmissible = parseInt(medTable.rows[SELECTED_ROW].cells[3].textContent);

		console.log(tempExp);
		console.log(tempAdmissible);
		//This ensures that the custom dialog box is loaded only when a valid row is selected
		if (SELECTED_ROW < totalRow-1) {
		// console.log(medTable.rows[SELECTED_ROW].cells[1].textContent);
		//This loads the input elements of the edit dialog box with the values of the selected row in the table
		document.getElementById("edit_input_investigation").value = medTable.rows[SELECTED_ROW].cells[1].textContent;
			if (isNaN(tempExp) || isNaN(tempAdmissible)) {
				document.getElementById("edit_input_expenditure").value = 0;
				document.getElementById("edit_input_admissible").value = 0;
			}
			else{
				document.getElementById("edit_input_expenditure").value = tempExp;
				document.getElementById("edit_input_admissible").value = tempAdmissible;
			}
		
		document.getElementById("edit_remarks").value = medTable.rows[SELECTED_ROW].cells[4].textContent; 

		}

		else{
		//since the total row is selected, the dialog box needs to hide
	    modal.style.display = "none";
		//alert message reminding the user to not select the total row. 	
		alert(" Wow!\n Do you really want to edit the total row?\n\n\n Well, I won't let you!!!");
	}
		
	}

	else{
		//since no row is selected, the dialog box needs to hide
	    modal.style.display = "none";
		//alert message reminding the user to select a row. 	
		alert("I can't read your mind my friend! Atleast select a row that you want to edit");
	}

}

function editDone(){

	//Get the table element
	var medTable = document.getElementById("id_medical_table");
	//get the custom diaglog box element
	 var modal = document.getElementById("myModal"); 
	 //Finding the total number of rows in the table.
	 var totalRow1 = document.getElementById("id_medical_table").rows.length;

	//Placing the values from the edit form to the selected table row
	medTable.rows[SELECTED_ROW].cells[1].textContent = document.getElementById("edit_input_investigation").value; 
	medTable.rows[SELECTED_ROW].cells[2].textContent = parseInt(document.getElementById("edit_input_expenditure").value);
	medTable.rows[SELECTED_ROW].cells[3].textContent = parseInt(document.getElementById("edit_input_admissible").value);
	medTable.rows[SELECTED_ROW].cells[4].textContent = document.getElementById("edit_remarks").value;
	// edit_fillUpOnSelection();
	modal.style.display = "none";
	// alert("completed");

	//Upon editing successfully, the total needs to recalculted and for this the previous total needs removal.
	document.getElementById("id_medical_table").deleteRow(totalRow1-1);
	//This recalculates the total and adds the total row.
	totalRow();
	//shows the successfully editing toast.
	editToast();
}

//this function is called when the custom dialog box loads and the user inputs some data in the datalist
function edit_fillUpOnSelection(){
	
	 //
	 var selectedInput = document.getElementById("edit_input_investigation").value;
	 var expenditure = document.getElementById("edit_input_expenditure");
	 var admissible = document.getElementById("edit_input_admissible");
	 var accreditation = document.getElementById("accreditation");
	 var remarks = document.getElementById("edit_remarks");
	 // alert(testNames.length);
	
	for (var i = 0; i < testNames.length; i++) {
		
		//this matches the input text with the rate list and if found, fetches the relevant rates.
		if (selectedInput == testNames[i][0]) {
			console.log(testNames[i][0]);

			remarks.selectedIndex = 1; //The rates are found... now setting the remarks dropdown to as per CGHS rates
			// RATEFOUND = true;
			//the selectedIndex of 1 = NABH and 2 = Non-NABH, the rates adjusts accordingly
		
			if (accreditation.selectedIndex == 1) {
				expenditure.value = testNames[i][2];
				admissible.value = testNames[i][2];
			}
			if (accreditation.selectedIndex == 2) {
				expenditure.value = testNames[i][1];
				admissible.value = testNames[i][1];
			}

		}
	}	
}