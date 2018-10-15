// Production keys -- commit 
module.exports = {
	google: {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,		
	},
	mongo: {
		URI: process.env.MONGO_URI,
	},
	session: {
		cookieKey: process.env.COOKIE_KEY
	} 
}