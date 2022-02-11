
function loadPayMatrixTable() {
	// body...
	console.log("here");

	loadMatrix_1to5();
	loadMatrix_6to10();
	loadMatrix_11to14();
	loadMatrix_15to18();
}


//function to load pay level table from 1 to 5
function loadMatrix_1to5() {
	// body...
	// console.log(countRowsNeeded(1));
	var totalRow = countRowsNeeded(1);

	var table_1to5 = document.getElementById("idPayLevel_1to5");

	// console.log(table_1to5);

	for (var i = 0; i < totalRow; i++) 
	{
		// console.log(i);
		var newRow = table_1to5.insertRow(i+2);


		var cell0 = newRow.insertCell(0);
		var cell1 = newRow.insertCell(1);
		var cell2 = newRow.insertCell(2);
		var cell3 = newRow.insertCell(3);
		var cell4 = newRow.insertCell(4);
		var cell5 = newRow.insertCell(5);
		
		cell0.innerHTML = i+1;
		cell1.innerHTML = Global_Pay_Matrix[i][0];
		cell2.innerHTML = Global_Pay_Matrix[i][1];
		cell3.innerHTML = Global_Pay_Matrix[i][2];
		cell4.innerHTML = Global_Pay_Matrix[i][3];
		cell5.innerHTML = Global_Pay_Matrix[i][4];
	}

}

function loadMatrix_6to10() {
	// body...
	// console.log(countRowsNeeded(6));
	var totalRow = countRowsNeeded(6);

	var table_6to10 = document.getElementById("idPayLevel_6to10");

	// console.log(table_6to10);

	for (var i = 0; i < totalRow; i++) 
	{
		// console.log(i);
		var newRow = table_6to10.insertRow(i+2);


		var cell0 = newRow.insertCell(0);
		var cell1 = newRow.insertCell(1);
		var cell2 = newRow.insertCell(2);
		var cell3 = newRow.insertCell(3);
		var cell4 = newRow.insertCell(4);
		var cell5 = newRow.insertCell(5);
		
		cell0.innerHTML = i+1;
		cell1.innerHTML = Global_Pay_Matrix[i][5];
		cell2.innerHTML = Global_Pay_Matrix[i][6];
		cell3.innerHTML = Global_Pay_Matrix[i][7];
		cell4.innerHTML = Global_Pay_Matrix[i][8];
		cell5.innerHTML = Global_Pay_Matrix[i][9];
	}

}

function loadMatrix_11to14() {
	// body...
	console.log(countRowsNeeded(11));
	var totalRow = countRowsNeeded(11);

	var table_11to14 = document.getElementById("idPayLevel_11to14");

	console.log(table_11to14);

	for (var i = 0; i < totalRow; i++) 
	{
		console.log(i);
		var newRow = table_11to14.insertRow(i+2);


		var cell0 = newRow.insertCell(0);
		var cell1 = newRow.insertCell(1);
		var cell2 = newRow.insertCell(2);
		var cell3 = newRow.insertCell(3);
		var cell4 = newRow.insertCell(4);
		var cell5 = newRow.insertCell(5);
		
		cell0.innerHTML = i+1;

		if (typeof Global_Pay_Matrix[i][10]== 'undefined') {
			cell1.innerHTML = " ";
		}
		else
		{
			cell1.innerHTML = Global_Pay_Matrix[i][10];
		}

		if (typeof Global_Pay_Matrix[i][11]== 'undefined') {
			cell2.innerHTML = " ";
		}
		else
		{
			cell2.innerHTML = Global_Pay_Matrix[i][11];
		}
		if (typeof Global_Pay_Matrix[i][12]== 'undefined') {
			cell3.innerHTML = " ";
		}
		else
		{
			cell3.innerHTML = Global_Pay_Matrix[i][12];
		}
		if (typeof Global_Pay_Matrix[i][13]== 'undefined') {
			cell4.innerHTML = " ";
		}
		else
		{
			cell4.innerHTML = Global_Pay_Matrix[i][13];
		}
		if (typeof Global_Pay_Matrix[i][14]== 'undefined') {
			cell5.innerHTML = " ";
		}
		else
		{
			cell5.innerHTML = Global_Pay_Matrix[i][14];
		}	
	}
}

function loadMatrix_15to18() {
	// body...
	console.log(countRowsNeeded(16));

	//due to extra level of 13A, the pay level 15 is actually 16th count
	var totalRow = countRowsNeeded(16);

	var table_15to18 = document.getElementById("idPayLevel_15to18");

	console.log(table_15to18);

	for (var i = 0; i < totalRow; i++) 
	{
		console.log(i);
		var newRow = table_15to18.insertRow(i+2);


		var cell0 = newRow.insertCell(0);
		var cell1 = newRow.insertCell(1);
		var cell2 = newRow.insertCell(2);
		var cell3 = newRow.insertCell(3);
		var cell4 = newRow.insertCell(4);
		
		cell0.innerHTML = i+1;

		if (typeof Global_Pay_Matrix[i][15]== 'undefined') {
			cell1.innerHTML = " ";
		}
		else
		{
			cell1.innerHTML = Global_Pay_Matrix[i][15];
		}

		if (typeof Global_Pay_Matrix[i][16]== 'undefined') {
			cell2.innerHTML = " ";
		}
		else
		{
			cell2.innerHTML = Global_Pay_Matrix[i][16];
		}
		if (typeof Global_Pay_Matrix[i][17]== 'undefined') {
			cell3.innerHTML = " ";
		}
		else
		{
			cell3.innerHTML = Global_Pay_Matrix[i][17];
		}
		if (typeof Global_Pay_Matrix[i][18]== 'undefined') {
			cell4.innerHTML = " ";
		}
		else
		{
			cell4.innerHTML = Global_Pay_Matrix[i][18];
		}
			
	}
}

//this function count the number of rows needed in a table based on the Pay level passe
function countRowsNeeded(payLevel){

	var rowCount =0;
	//the colCount will be 1 less than paylevel because array count start from zero. 
	var colCount = payLevel-1;

	while(Number.isInteger(Global_Pay_Matrix[rowCount][payLevel-1])) 
	{
		rowCount = rowCount+1;
		//console.log(rowCount);
		if (rowCount==40) {
			break;
		}
	}

	return rowCount;


}