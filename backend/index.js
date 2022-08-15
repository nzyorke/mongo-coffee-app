// Setting up our dependencies
const express = require("express");
const app = express();
const port = 3100;
const cors = require("cors");
// passes information from the frontend to the backend
const bodyParser = require("body-parser");
// This is our middleware for talking to mongoDB
const mongoose = require("mongoose");
// grab our config file
const config = require('./config.json')
console.log(config)

// Schemas
// every schema needs a capital letter
const Coffee = require("./models/coffee.js");

// start our dependencies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());

// Start our server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// let's connect to mongoDB 
// cluster name: mycluster 
// username: billyridgway
// password: R1dgway1 
mongoose.connect(
`mongodb+srv://${config.username}:${config.password}@mycluster.lhxedgn.mongodb.net/?retryWrites=true&w=majority`,
// .then is a chaining method used with promises
// in simple terms, it will run something depending on the function before it

).then(() => {
    console.log(`You've connected to MongoDB!`)
    // .catch is a method to catch any errors that might happen in a promise
}).catch( (err) => {
    console.log(`DB connection error ${err.message}`)
})

// set up a route/endpoint which the frontend will access 
// app.post will send data to the database 
app.post(`/addCoffee`, (req, res) => {
  // create a new instance of the coffee schema 
  const newCoffee = new Coffee({
    // give our new coffee the details we sent from the frontend 
    _id: new mongoose.Types.ObjectId,
    name: req.body.name,
    price: req.body.price,
    image_url: req.body.image_url  
  });
    // to save the newcoffee to the database
    // use the variable declared above
    newCoffee.save()
        .then((result) => {
            console.log(`Added a new coffee successfully!`)
            // return back to the frontend what just happened
            res.send(result)
        })
        .catch( (err) => {
            console.log(`Error: ${err.message}`)
        })
});

// here we are setting up the /allCoffee route
app.get('/allCoffee', (req, res) => {
  // .then is method in which we can chain functions on
  // chaining means that once something has run, then we can
  // run another thing
  // the result variable is being returned by the .find() then we ran earlier
  Coffee.find().then(result => {
          // send back the result of the search to whoever asked for it
          // send back the result to the front end. I.E the go the button
          res.send(result)
  })
})
