"use strict";

let config    = require("../config/globalConfig");
let logger    = require("../core/logger");
let chalk 	  = require("chalk");
let moment    = require("moment");
let mongoose  = require("mongoose");
//let agenda    = require("../core/agenda");

let gracefulExit = function() {
	if (mongoose.connection.readyState === 0) {
		return process.exit(0);
	}
	mongoose.connection.close(function() {
        logger.info("---------------------[ Server stopped at %s Uptime: %s ]---------------------------", moment().format("YYYY-MM-DD HH:mm:ss.SSS"), moment.duration(process.uptime() * 1000).humanize());
        // return agenda.stop(function() {
		// 	logger.info();
		// 	logger.info(chalk.bold("---------------------[ Server stopped at %s Uptime: %s ]---------------------------"), moment().format("YYYY-MM-DD HH:mm:ss.SSS"), moment.duration(process.uptime() * 1000).humanize());
		// 	return process.exit(0);
		// });
	});
};

process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);
