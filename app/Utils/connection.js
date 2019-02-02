
'use strict';

let mongoose = require('mongoose'),
    Config = require('../Config'),
    DAO = require('../DAOManager').queries,
    Models = require('../Models');


let db_config={};

if(process.env.NODE_ENV       === "test"){
    console.log("===========test===============");
    db_config = {
        PORT : 8000,
        dbURI : "mongodb://localhost:27017/requestOnline1"

    };
}else if(process.env.NODE_ENV === "live"){
    console.log("===========live===============");
    db_config = {
        PORT : 8000,
        dbURI : "mongodb://localhost:27017/requestOnline1"

    };
}else if(process.env.NODE_ENV === "client"){
    console.log("===========client===============");
    db_config = {
        PORT : 8000,
        dbURI : "mongodb://localhost:27017/requestOnline1"

    };
}else{
    db_config = {
        PORT : 8000,
        dbURI : "mongodb://localhost:27017/requestOnline1"

    };
}



mongoose.Promise = Promise;


//Connect to MongoDB
mongoose.connect(db_config.dbURI,  { useNewUrlParser: true }).then(success => {

}).catch(err => {
    console.log("====================", err)
    process.exit(1);
});


