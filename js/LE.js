
function ResetValues() {
	// body...
	var basic_pay = document.getElementById("basicPay");
	var DA_rate = document.getElementById("DA");
	var Amt_Text = document.getElementById("total_amt_LE");

	basic_pay.value="";
	DA_rate.value = "";
	Amt_Text.innerHTML="";
}

function ResetValues_RLE() {
	// body...
	var basic_pay = document.getElementById("basicPay_RLE");
	var DA_rate = document.getElementById("DA_RLE");
	var numEL = document.getElementById("num_EL");
	var numHPL = document.getElementById("num_HPL");

	var txt_Leave = document.getElementById("total_admissible_leave");
	var txt_Amt = document.getElementById("total_amt_RLE");

	basic_pay.value="";
	DA_rate.value = "";
	numEL.value="";
	numHPL.value = "";
	txt_Amt.innerHTML="";
	txt_Leave.innerHTML = "";
}

function calc_LTC_LE(){

	var basic_pay = parseInt(document.getElementById("basicPay").value);
	var DA_rate = parseInt(document.getElementById("DA").value);
	var Amt_Text = document.getElementById("total_amt_LE");

	if (basic_pay>=0) {

		if (DA_rate>=0) {

			var calc_Amt = Math.round((basic_pay*(1+DA_rate/100))/3);
			Amt_Text.innerHTML = "The Total Leave Encashment is Rs " +calc_Amt + "/-  (" + inWords(calc_Amt) +")";

		}

		else{
			Amt_Text.innerHTML="Please Enter the Correct DA rate";
		}
	}
	else{
		Amt_Text.innerHTML = " Please Enter the Basic Pay first";
	}
	// console.log(basic_pay);
}

function calc_RLE(){

	var basic_pay = parseInt(document.getElementById("basicPay_RLE").value);
	var DA_rate = parseInt(document.getElementById("DA_RLE").value);
	var numEL = parseInt(document.getElementById("num_EL").value);
	var numHPL = parseInt(document.getElementById("num_HPL").value);

	var txt_Leave = document.getElementById("total_admissible_leave");
	var txt_Amt = document.getElementById("total_amt_RLE");

	var admissible_Leave = 0;
	var amt_RLE = 0;

	if (numEL>=300) {
		admissible_Leave = 300;
	} 
	else
	{
		var leave_gap = 300-numEL;

		if (numHPL>=leave_gap) {
			admissible_Leave = numEL+leave_gap/2;
		}
		else
		{
			admissible_Leave = numEL+numHPL/2;
		}
	} 

	if (admissible_Leave>=0) {
		amt_RLE = Math.round(admissible_Leave*((basic_pay*(1+DA_rate/100))/30));
		txt_Leave.innerHTML = "The total leave admissible for encashment is "+ admissible_Leave;
		txt_Amt.innerHTML = "The total leave encashment amount is Rs "+amt_RLE+"/- ("+ inWords(amt_RLE)+")";
	}
	else{
		txt_Leave.innerHTML = "Leave input is incorrect";
		txt_Amt.innerHTML = "";
	}
	

}


// Code to convert number to its spelling

var a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}