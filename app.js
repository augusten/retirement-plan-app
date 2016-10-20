// Add some requirements to the file
const express 	 = require( 'express' )
const fs	     = require( 'fs' )
const bodyParser = require( 'body-parser' )
const app 	     = express()

// Some initial settings to use PUG
app.set( 'view engine', 'pug' )
app.set( 'views', __dirname + '/views' )

let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use( express.static( 'includes' ) )

app.get( '/', (req, res) => {
	res.render( 'index' )
} )

app.post( '/result', (req, res) => {
	res.render( 'index' )
} )

app.listen( 8000, () => {
	console.log( 'The server is running' )
})