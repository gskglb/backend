"use strict";

let chalk 		    = require("chalk");
let moment 		    = require("moment");
let config		    = require("./config");

let logger 		    = require("./core/logger");
let init		    = require("./core/init");

let dbAdapter       = require("./core/bettermongo");
let app		        = require("./core/express");

let dbConnection;

async function startApp() {
    logger.info("Application root path: " + config.app.rootPath);

    logger.info("Starting database connection ");
    dbConnection = await dbAdapter.getDatabaseConnection();
    app = await app.initializeServer(dbConnection);

    logger.info("Starting server ");
    require("./utils/gracefulExit");
    
    app.listen(config.port, config.ip, function() {

        logger.info(config.app.title + " v" + config.app.version + " application started!");
        logger.info("----------------------------------------------");
        logger.info("Environment:\t" + chalk.underline.bold(process.env.NODE_ENV));
        logger.info("IP:\t\t" + config.ip);
        logger.info("Port:\t\t" + config.port);
        logger.info("Database:\t\t" + config.db.uri);
        //logger.info("Redis:\t\t" + (config.redis.enabled ? config.redis.uri : "Disabled"));
        logger.info("");
        require("./utils/sysinfo")();
        logger.info("----------------------------------------------");
    
        // let Service = require("./core/services");
        // if (config.isDevMode)
        //     Service.printServicesInfo();
    });


}

startApp();