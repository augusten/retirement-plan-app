// File creates a module that calculates compound interest

// helper functions
let roundDecimal = ( number ) => {
	return Math.round ( number * 100 ) / 100
}

let addCommas = ( number ) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let prettyNr = ( number ) => {
	return addCommas( roundDecimal ( number ))
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function dealWithExponents ( number ) {
	var n = number.toString();
	var parts = n.split("e+");
	var first = parts[0].replace('.', "");
	var zeroes = parseInt(parts[1], 10) - (first.length - 1);
	for(var i = 0; i < zeroes; i++){ first += "0"; }
	return first.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Function to calculate compound interest from a customer object
let calcCompound = ( customer, callback ) => {
	// Set end amount variable and calculate total duration
	customer.pension.endamount = {
		pessimistic: customer.finances.startcapital,
		average: 	 customer.finances.startcapital,
		optimistic:  customer.finances.startcapital
	}
	customer.pension.duration = customer.pension.age - customer.age

	// create an array for addition of the yearly increase only on the second loop! That is why the last item is 0, and others are 1
	let yearAddBool = new Array( customer.pension.duration )
	for( j = 0; j < yearAddBool.length; j++ ) {
		if ( j == yearAddBool.length-1 ) {
			yearAddBool[j] = 0
		} else {
			yearAddBool[j] = 1
		}
	}

	// do the interest math
	for (var i = customer.pension.duration - 1; i >= 0; i--) { // countdown from top to bottom is more efficient than counting form 0 up!!!
		// add monthly spend to all the scenarios
		customer.pension.endamount.pessimistic += ( customer.finances.monthlyadd * 12 * customer.finances.yearlyincrease * yearAddBool[i] )
		customer.pension.endamount.average	   += ( customer.finances.monthlyadd * 12 * customer.finances.yearlyincrease * yearAddBool[i] )
		customer.pension.endamount.optimistic  += ( customer.finances.monthlyadd * 12 * customer.finances.yearlyincrease * yearAddBool[i] )

		// multiply by the interest of all the scenarios
		customer.pension.endamount.pessimistic *= customer.pension.interest.pessimistic 
		customer.pension.endamount.average	   *= customer.pension.interest.average 
		customer.pension.endamount.optimistic  *= customer.pension.interest.optimistic
	}
	customer.pension.endamount.pessimistic = prettyNr( customer.pension.endamount.pessimistic )
	customer.pension.endamount.average	   = prettyNr( customer.pension.endamount.average )
	customer.pension.endamount.optimistic  = prettyNr( customer.pension.endamount.optimistic )
	// output our data
	callback ( customer )
}

let fluctCompound = ( customer, callback ) => {
	// function simulates reality to calculate pension when the pessimistic and optimistic interests fluctuate randomly

	// initialize first endamount
	customer.pension.endamount = {
		fluctuating: customer.finances.startcapital
	}
	customer.pension.duration = customer.pension.age - customer.age

	// create an array for addition of the yearly increase only on the second loop! That is why the last item is 0, and others are 1
	let yearAddBool = new Array( customer.pension.duration )
	for( j = 0; j < yearAddBool.length; j++ ) {
		if ( j == yearAddBool.length-1 ) {
			yearAddBool[j] = 0
		} else {
			yearAddBool[j] = 1
		}
	}

	for (var i = customer.pension.duration - 1; i >= 0; i--) {
		customer.pension.endamount.fluctuating += ( customer.finances.monthlyadd * 12 * customer.finances.yearlyincrease * yearAddBool[i] )
		// the interest will be any random number between the pessimistic and optimistic values
		customer.pension.endamount.fluctuating *= getRandomArbitrary(1.02, 1.08)
	}
	customer.pension.endamount.fluctuating = prettyNr( customer.pension.endamount.fluctuating )
	callback ( customer )
}

let spCompound = ( customer, spArray, callback ) => {
	// function simulates reality to calculate pension when the pessimistic and optimistic interests fluctuate randomly
	// initialize first endamount
	customer.pension.endamount = {
		sp500: customer.finances.startcapital
	}
		// create an array for addition of the yearly increase only on the second loop! That is why the last item is 0, and others are 1
	let yearAddBool = new Array( spArray.length )
	for( j = 0; j < yearAddBool.length; j++ ) {
		if ( j == yearAddBool.length-1 ) {
			yearAddBool[j] = 0
		} else {
			yearAddBool[j] = 1
		}
	}

	for (var i = spArray.length - 1; i >= 0; i--) {
		customer.pension.endamount.sp500 += ( customer.finances.monthlyadd * 12 * customer.finances.yearlyincrease * yearAddBool[i] )
		// the interest will be the index from that year in the SP 500 data
		customer.pension.endamount.sp500 *= spArray[spArray.length - 1 - i]
		// console.log(customer.pension.endamount.sp500)
	}
	customer.pension.endamount.sp500 = dealWithExponents( customer.pension.endamount.sp500 )
	console.log(customer.pension.endamount.sp500)
	// customer.pension.endamount.sp500 = prettyNr( customer.pension.endamount.sp500 )
	callback ( customer )
}

// Export module
module.exports = {
	calcCompound: calcCompound,
	fluctCompound: fluctCompound,
	spCompound: spCompound
}

