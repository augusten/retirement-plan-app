// Add some requirements to the file
const express 	 = require( 'express' )
const fs	     = require( 'fs' )
const xls = require ( 'xlsjs' )
const bodyParser = require( 'body-parser' )
const compound = require( __dirname + "/includes/js/calc-compound")
const indexList = require( __dirname + "/includes/js/read-excel")
const app 	     = express()

// Some initial settings to use PUG
app.set( 'view engine', 'pug' )
app.set( 'views', __dirname + '/views' )

let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use( express.static( 'includes' ) )

app.get( '/', (req, res) => {
	res.render( 'index' )
} )

app.post( '/result', urlencodedParser, (req, res) => {
	let user = {
		name: req.body.name,
		"age": Number(req.body.age),
		"finances": {
			"startcapital": Number(req.body.scapital),
			"monthlyadd": Number(req.body.monthly),
			"yearlyincrease": Number(req.body.yearIncrease) / 100 + 1
		},
		"pension": {
			"age": Number(req.body.rage),
			"interest": {
				"pessimistic": 1.02,
				"average": 1.04,
				"optimistic": 1.08
			}
		}
	}
	// choose what to render based on the button pushed
	if (req.body.enter === "subm") {
		// console.log("submitted")
		compound.calcCompound( user, ( data ) => {
			res.render( 'result', {userData: data} )
		} )
	} else if ( req.body.enter === "simulate" ) {
		// console.log("simulated")
		compound.fluctCompound( user, ( data ) => {
			res.render( 'result', {userData: data} )
		} )
	} else if ( req.body.enter === "history" ) {
		indexList( __dirname + '/includes/historical_data/histretSP.xls', ( array ) => {
			compound.spCompound( user, array, ( data ) => {
				res.render('sp500', {userData: data})
			})
		})
	}
} )

app.listen( 8000, () => {
	console.log( 'The server is running' )
})