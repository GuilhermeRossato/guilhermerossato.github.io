function LineQuery(date) {
	this.date = date;
	this.commits = [];
	this.releases = [];
	this.posts = [];
}

LineQuery.prototype = {
	constructor: LineQuery,
	initialize: function() {

	},
	advance: function() {

	},
	request: function() {
		if (this.state === "idle") {
			this.state = "waiting-response";
			return true;
		} else {
			return false;
		}
	}
}