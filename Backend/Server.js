const express = require("express");
const app = express();
//routes for navigation
const authRoutes = require('./Routes/Authentication_Routes');
const pwdRoutes = require('./Routes/Pwd_Routes');
//cross origin request
const cors = require('cors');
//express session to store cookies in mongodb store
const cookie = require('express-session');
//mongodb connection
const mongodb = require('mongoose');
//mongodb session store
const MongodbStore = require('connect-mongodb-session')(cookie);
//define port 
const port = 4000;
//define cookie age(time to expire)
const COOKIE_AGE = 2 * 60 * 60 * 1000;//(2 hours)
//body parser to get payload sent 
const bodyParser = require('body-parser');
//database url to connect to mongodb
const mongoDB_url = "mongodb://localhost:27017/pwdManager";

//connecting to database
mongodb.Promise = global.Promise;
mongodb.connect(mongoDB_url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(res => {
    console.log("Successfuly connected to databse");
  })
  .catch(err => {
    console.log("Error occured while connecting to database");
  });

//adding sessions to database
const MongoDB_Cookie_Store = new MongodbStore({
  uri: mongoDB_url,
  collection: "SESSION_DB"
});

//add cookies
app.use(
  cookie({
    name: "COOKIE",
    secret: 'SECRET TEXT',
    resave: true,
    store: MongoDB_Cookie_Store,
    saveUninitialized: false,
    cookie: {
      maxAge: COOKIE_AGE,
      sameSite: false
    }
  })
);

//enabling cross origin requestion 
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use("/pw-manager/auth", authRoutes);//login & registration
app.use("/pw-manager/pwd", pwdRoutes);//passwords actions

app.listen(port, (err) => {
  if (err) {
    console.log("Failed to start server");
  }
  else {
    console.log("Server started");
  }
});