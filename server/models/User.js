const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Schema = mongoose.Schema; // Equivalent to above

// Define user schema using Object of <field:datatype> pairs
const userSchema = new Schema({
	googleID: String
});

// Create model class
mongoose.model('User', userSchema);

