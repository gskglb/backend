"use strict";

let path 			= require("path");
let fs 				= require("fs");
let _ 				= require("lodash");
let chalk			= require("chalk");
let logger 		    = require("./core/logger");


module.exports = {
	isDevMode() {
		return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
	}, 
	isProductionMode() {
		return process.env.NODE_ENV === "production";
	},
	isTestMode() {
		return process.env.NODE_ENV === "test";
	}
};

let externalConfig = {};
const extConfigFile = path.join(__dirname, "globalConfig.js"); 
externalConfig = require('./globalConfig');
try {
	if (!fs.existsSync(extConfigFile)) {
		logger.info("Configuration file not found!. Create `config.js` file at the root of application");
    }
    
} catch (error) {
	logger.error("\r\n==============================================");
	logger.error("  Unable to load globalConfig.js file!");
    logger.error(" ", error);
    logger.error("  Exiting now. Fix the issue and start server again");
	logger.error("==============================================\r\n");
	process.exit(1);
}


module.exports = _.defaultsDeep(externalConfig, module.exports);
