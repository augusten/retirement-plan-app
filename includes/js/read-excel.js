function indexList ( filename, cb ) {
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