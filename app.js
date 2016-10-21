// Add some requirements to the file
const express 	 = require( 'express' )
const fs	     = require( 'fs' )
const bodyParser = require( 'body-parser' )
const calcComp = require( __dirname + "/includes/js/calc-compound")
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
	calcComp( user, ( data ) => {
		res.render( 'result', {userData: data} )
	} )
} )

app.listen( 8000, () => {
	console.log( 'The server is running' )
})