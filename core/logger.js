"use strict";


let winston = require("winston");
require('winston-daily-rotate-file');
let logform = require("logform")

let path = require("path")
let config = require("../config/globalConfig")
let	transports = [];
let format = logform.format;

// Console Logger
transports.push(new winston.transports.Console({
	level: config.logging.console.level,
	colorize: true,
	prettyPrint: true,
	handleExceptions: process.env.NODE_ENV === "production"
}));

// Daily Roate Logger - rotation happens every hour
transports.push(new (winston.transports.DailyRotateFile)({
	filename: path.join(config.logging.file.path, ".", 'application-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  }));

const logger = winston.createLogger({
	level: config.logging.file.level,
	//format: winston.format.json(),
	format: format.combine(
		format.label({ label: '[my-label]' }),
		format.timestamp({
		  format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
	  ),

	transports: transports,
});

module.exports = logger;
