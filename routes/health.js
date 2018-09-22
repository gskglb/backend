"use strict";

let config 			= require("../config");
let logger 			= require("../core/logger");

module.exports = function(app, db) {

	app.get("/health", (req, res) => {
		logger.info("Got request for /health");
		res.send("All is well");
	});

};