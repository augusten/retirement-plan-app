// module to read excel files
const xls = require ( 'xlsjs' )

function indexList ( filename, cb ) {
	// function returns a list of the values in column B from 41 to 106
	let workbook = xls.readFile( filename )
	let sheet_name_list = workbook.SheetNames
	let sheet = workbook.Sheets[sheet_name_list[0]]
	let start_cell = 41
	let current_cell = 0
	let duration = 2015 - 1950
	let SPindexList = []
	for (var i = 0; i <= duration; i++) {
		current_cell = start_cell + i
		SPindexList.push( Number(sheet['B' + current_cell].w.slice(0, -1))) 
	}
	// console.log(SPindexList)
	cb ( SPindexList )
}

module.exports = indexList