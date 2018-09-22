"use strict";

let logger 			= require("./logger");
let config 			= require("../config/globalConfig");

let chalk 			= require("chalk");
let mongoose 		= require("mongoose");
let autoIncrement 	= require("mongoose-auto-increment");

function getDatabaseConnection(){
    return new Promise(async function(resolve, reject){
        let connection;
        try{
            if(mongoose.connection.readyState !== 1){
                logger.info("Connecting to Mongo " + config.db.uri + " using " + config.db.options.user);
                connection = await mongoose.connect(config.db.uri, config.db.options);
            }else{
                logger.info("Database already connected");
                connection = mongoose;
            }
            autoIncrement.initialize(connection);		
            resolve(connection);
        }catch(error){
            logger.error("Something went wrong with DB connection.");
            logger.error(error);
            reject(error);
        }

    });
} 

mongoose.connection.on("error", function mongoConnectionError(err) {
    if (err.message.code === "ETIMEDOUT") {
        logger.warn("Mongo connection timeout!", err);
        setTimeout(() => {
            mongoose.connect(config.db.uri, config.db.options);
        }, 1000);
        return;
    }
    logger.error("Could not connect to MongoDB!");
    return logger.error(err);
});

mongoose.connection.once("open", function mongoAfterOpen() {
    logger.info("Mongo DB connected.");
    if (config.isDevMode()) {
        logger.info("Running in development mode, so nothing to do after ");
    }else if (config.isTestMode()) {
        logger.warn("Drop test database...");
        //mongoose.connection.db.dropDatabase((err) => {
        //	autoIncrement.initialize(db);
        // require("./seed-db")();		
        //);
    }
    else {
        if (!config.isProduction) {
            //require("./seed-db")();	
        }
    }
});


module.exports.getDatabaseConnection =  getDatabaseConnection;
