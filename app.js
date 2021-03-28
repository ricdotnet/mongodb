/**
 * example connection for mongodb
 * it lets us use external js files to connect and .fecth(data)
 *      - these files can be ran when the app loads or whenever the user runs or clicks a certain button
 *      - works just like a normal API with php
 *      - better to retrieve data directly from the main link (webapp.com/api/users and webapp.com/api/users/ricardo)
 * the find() function is case sensitive 
*/


/**
 * MAIN FILE EXAMPLE
 * APP.JS
 */
//main connection
const { MongoClient } = require('mongodb')

//this is for parsing parameters from the url
const { ObjectId } = require('mongodb') //not mandatory

//database url from mongodb.com
const uri = 'url'

/**
 * main connection
 * mongo supports promises so we can use .then
 * 
 * this part needs to be inserted after initializing the app
 * (const app = express())
 */
MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(client => {
        console.log("Connected to the database."); //succes message
        const database = client.db('database-name');
        const collectionName = database.collection('colleciton-name');

        app.locals.collectionName = collectionName; //used to connect all throughout the app
        //app.locals.collectionName2 = collectionName2;
    })
    .catch(error => {
        console.error(error)
    })

//app.use(express,json())
//app.use(express.urldecoded({ extended: true }))


/**
 * VIEW EXAMPLE
 * API.JS
 */
//retieving all form a collection
router.get('/users', function(req, res) {

    //get the colleciton from app.js
    const collection = req.app.locals.collectionName;

    //find all from a collection and send the response to the page as json (res.json(results))
    collection.find().toArray()
        .then(results => {
            res.json(results)
        })
        //if there is an error show on the console
        .catch(error => {
            console.error(error)
        })
})

//retrieving one result with username
router.get('/users/get/:username', function(req, res) {

    //get the collection
    const collection = req.app.locals.collectionName; //repeated const can be global

    //get the username from the parameters
    const username = req.params.username;

    //find only the :username from the collection
    collection.find( { username: username }).toArray()
        .then(results => {
            res.json(results)
        })
        //if there is any error show the error
        .catch(error => {
            console.error(error)
        })
})

//deleting a document/record
router.get('users/del/:username', function(req, res) {

    const collection = req.app.locals.usersCollection;
    const username = req.params.username; //get the parameter from the url

    /**
     * if using ID need to parse it as object id
     * const id = new ObjectId(req.params.id)
     */

    collection.deleteOne({ //can also use deleteMany()
        username: username
    })
    .then(result => {
        res.json(result.result.n) //this line shows how many documents where deleted.
    })

})



/**
 * to add a new item we use again router
 * instead of find() we use insertOne() or insertMany()
 * for more commands visit mongodb docs
 * 
 * inserting data we need to pass the info onto the page of insert
 * app.use(express,json())
 * app.use(express.urldecoded({ extended: true }))
 */
