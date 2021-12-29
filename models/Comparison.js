const mongoose = require("mongoose");

const ComparisonSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	currencies: [{ type: String }],
	date: {
		type: Date,
		default: Date.now,
	},
});

const Comparison = mongoose.model("comparison", ComparisonSchema);

module.exports = Comparison;
