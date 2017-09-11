class RequestSystem {
	constructor () {
		this.requests = [];
		this.addRequestsFromSettings();
	}
	addRequestsFromSettings() {
		Settings.git.repositories.forEach(name => {
			this.addRequest(new ReleaseRequest(name));
			this.addRequest(new CommitRequest(name));
		});
		return this;
	}
	dispatchAllRequests() {
		this.requests.forEach(request => request.dispatch());
		return this;
	}
	addRequest(r) {
		this.requests.push(r);
		return this;
	}
}