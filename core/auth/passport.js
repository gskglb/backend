"use strict";

let logger 			= require("../logger");
let config 			= require("../../config/globalConfig");
let fs 				= require("fs");
let passport 		= require("passport");
let path 			= require("path");
let chalk 			= require("chalk");

let User 			= require("../../models/user");

module.exports = function(app) {

	// Use passport session
	app.use(passport.initialize());
	app.use(passport.session());	

	passport.serializeUser(function(user, done) {
		return done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, "-password", function(err, user) {
			if (err)
				return done(err);
			
			// Check that the user is not disabled or deleted
			if (!user || user.status !== 1)
				return done(null, false);

			return done(null, user);
		});
	});

	logger.info("");
	logger.info(chalk.bold("Search passport strategies..."));

	 function requireAll(){
		fs.readdirSync(path.join(__dirname,"./strategies")).forEach(async file => {
			let fileWithoutExt = file.replace(/\.[^/.]+$/, "");
			let strategy = "./strategies/" + fileWithoutExt;
			logger.info("  Applying passport strategy  " + fileWithoutExt + " ...");
			await require(strategy)();
			logger.info("  Applied passport strategy  " + fileWithoutExt + " ...");
			return strategy;
		})
	}


	// function requireAll(r) { 
	// 	return r.keys().map(function(module) {
	// 		logger.info("  Loading passport strategy file " + path.basename(module) + "...");
	// 		let strategy = r(module);
	// 		strategy();

	// 		return strategy;
	// 	});
	// }

	//let modules = requireAll(require.context("./strategies", true, /\.js$/));
	let modules = requireAll();
};
