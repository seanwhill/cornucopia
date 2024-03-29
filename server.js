const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

const app = express();

// Bodyparser Middleware
app.use(express.json());
// Cookieparser Middleware
app.use(cookieParser());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/groups', require('./routes/api/groups'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/recipes', require('./routes/api/recipes'));

const Group = require("./models/Group");

app.post('/' , (req, res) => {
  const newGroup = new Group({
    name: req.body.name
  });

  newGroup.save().then(group => res.json(group));

});

// app.get('/api/customers', (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];

//   res.json(customers);
// });

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);