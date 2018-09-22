"use strict";

let path = require("path");
require('dotenv').config();

module.exports = {
	
	// Secret for ID hashing
	hashSecret: "AxRjgKzPcx49eZ4VT4FUCcwwBI82paok0gYzxRs5JlG",

	// Secret for session hashing
	sessionSecret: "9NEzUGYB8oObDyxU54zE6cz1R57x4mgD5Sok0FhdRqt",

	// Application settings
	app: {
		title: "A Demo APP",
		version: "0.1.0",
		description: "This is backend system for demo app",
		contactEmail: "gskglb@gmail.com",
		rootPath: path.normalize(path.join(__dirname, "..", ".")),
	},

	ip: process.env.NODE_IP || "0.0.0.0",
	port: process.env.NODE_PORT || 3000,

	dataFolder: path.normalize(path.join(__dirname, "..", "data")),
	

	// Database (Mongo) settings. The URL etc are in env file. 
	db: {
		uri: process.env.MONGO_URI || "mongodb://localhost/school",
		options: {
			useNewUrlParser: true,
			user: process.env.MONGO_USERNAME || "",
			pass: process.env.MONGO_PASSWORD || ""
		}
	},

	sessions: {
		cookie: {
			// session expiration is set by default to one week
			maxAge: 7 * 24 * (60 * 60 * 1000),

			// httpOnly flag makes sure the cookie is only accessed
			// through the HTTP protocol and not JS/browser
			httpOnly: true,

			// secure cookie should be turned to true to provide additional
			// layer of security so that the cookie is set only when working
			// in HTTPS mode.
			secure: false
		},

		// Cookie key name
		name: "sessionId",

		// Mongo store collection name
		collection: "sessions"
	},



	// Redis settings for caching
	redis: {
		enabled: false,
		uri: process.env.REDIS_URI || "redis://localhost:6379",
		options: null
	},	

	// Mail sending settings
	mailer: {
		from: "noreply@gmail.com",

		/*
		transport: "smtp",
		smtp: {
			host: "mailtrap.io",
			port: 2525,
			auth: {
				user: "",
				pass: ""
			}
		}*/

		/*transport: "smtp",
		smtp: {
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "",
				pass: ""
			}
		}*/

		/*
		transport: "mailgun",
		mailgun: {
			apiKey: '',
			domain: ''
		}*/

		/*
		transport: "sendgrid",
		sendgrid: {
			apiKey: ""
		}*/
	},

	// Features of application
	features: {
		disableSignUp: false,
		verificationRequired: true
	},	

	// Social authentication (OAuth) keys
	authKeys: {

		google: {
			clientID: null,
			clientSecret: null
		},

		facebook: {
			clientID: null,
			clientSecret: null
		},

		github: {
			clientID: null,
			clientSecret: null
		},

		twitter: {
			clientID: null,
			clientSecret: null
		}		
	},

	// Logging settings
	logging: {
		
		console: {
			level: "debug"
		},

		file: {
			enabled: false,
			path: path.normalize(path.join(__dirname, "..", "logs")),
			level: "info",
			json: false,
			exceptionsSeparateFile: true
		}
	}

};

