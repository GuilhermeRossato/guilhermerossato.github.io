const path = require("path");

module.exports = {
	mode: "production",
	entry: "./assets/js/index.js",
	//devtool: "cheap-source-map",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "index.min.js"
	}
};