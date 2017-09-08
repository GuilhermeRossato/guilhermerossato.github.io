class LineQuery {
	constructor(date) {
		this.date = date;

		var aggregatorList = [{
				"name": "commit",
				"repositories": ""
			}, {
				"name": "release"
			}, {
				"name": "post",
				"link": "http://"
		}];
		this.aggregators = aggregatorList.map(data => {
			this[data.name+"s"] = [];
			return (this[data.name+"Machine"] = new RequestMachine(data.name, data.link, this[data.name+"s"]));
		});
	}
	initialize: function() {
		this.aggregators.forEach(obj => obj.request());
	}
	advance: function() {

	}
	request: function() {
		if (this.state === "idle") {
			this.state = "waiting-response";
			return true;
		} else {
			return false;
		}
	}
}