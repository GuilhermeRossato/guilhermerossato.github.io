class ContentController {
	constructor(date) {
		this.date = date;
		this.commits = [];
		this.releases = [];
		this.posts = [];
		StateMachine.call(this, {
			"idle": {},
			"waiting-response": {},
			"showing-error": {
				onEnter: function() {

				}
			}
		});
		this.timer = setInterval(contentController.iterate.bind(contentController),1000);
		this.iterate();
		this.requestSystem = new RequestSystem();
		this.requestSystem.dispatchAllRequests();
	}
	getRemainingScroll() {
		return (document.body.scrollHeight - window.innerHeight - window.scrollY);
	}
	iterate() {
		if (this.state === "idle") {
			if (getRemainingScroll() < Settings['next_data_threshold']) {
				this.promise = this.lineQuery.advance();
				this.promise.count = 0;
				this.state = "waiting-response";
			}
		} else if (this.state == "waiting-response") {
			if (this.promise.count < Settings['seconds_timeout']) {
				this.promise.count++;
			} else {
				this.dispatchEvent("error", "Timeout Error");
				this.state = "showing-error";
			}
		}
	}
	dispatchEvent(type, ...data) {
		if (type === "error") {
			console.warn(...data);
		}
	}
}