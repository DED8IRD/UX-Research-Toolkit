// Determine environment and extract keys -- commit
if (process.env.NODE_ENV === "production") {
	// extract keys from environment variables
	module.exports = require("./prod-keys");
} else {
	// extract keys from hardcoded secret file
	module.exports = require("./dev-keys");
}
