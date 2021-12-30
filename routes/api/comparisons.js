const express = require("express");
const route = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Comparison = require("../../models/Comparison");

route.get("/", auth, async (req, res) => {
	try {
		const comparisons = await Comparison.find({ user: req.user.id });
		if (!comparisons) {
			return res.status(404).json({
				errors: [{ msg: "You have not compared any currencies" }],
			});
		}
		res.json(comparisons);
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res
				.status(404)
				.json({ errors: [{ msg: "You have not compared any currencies" }] });
		}
		res.status(500).json({ errors: [{ msg: "Server Error" }] });
	}
});

route.post(
	"/",
	[
		auth,
		[
			check("currencies", "At least two currencies are required").isLength({
				min: 2,
			}),
			check("currencies.*")
				.isIn(["BTC", "ETH", "MATIC", "DOGE", "DASH"])
				.withMessage("Currencies are not valid"),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const newComparison = new Comparison({
				user: req.user.id,
				currencies: req.body.currencies,
			});

			const comparison = await newComparison.save();

			res.json(comparison);
		} catch (err) {
			console.error(err.message);
			res.status(500).json({ errors: [{ msg: "Server Error" }] });
		}
	}
);

route.delete("/:id", auth, async (req, res) => {
	try {
		const comparison = await Comparison.findById(req.params.id);

		if (!comparison) {
			return res.status(404).json({
				errors: [{ msg: "Comparison not found" }],
			});
		}

		if (comparison.user.toString() !== req.user.id) {
			return res.status(401).json({
				errors: [{ msg: "User not authorized" }],
			});
		}
		await comparison.remove();
		res.json({ msg: "Comparison removed" });
	} catch (err) {
		console.error(err.message);
		if (err.kind === "ObjectId") {
			return res.status(404).json({
				errors: [{ msg: "Comparison not found" }],
			});
		}
		res.status(500).json({ errors: [{ msg: "Server Error" }] });
	}
});

route.delete("/", auth, async (req, res) => {
	try {
		await Comparison.deleteMany({ user: req.user.id });
		res.json({ msg: "All Comparisons removed" });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ errors: [{ msg: "Server Error" }] });
	}
});

module.exports = route;
