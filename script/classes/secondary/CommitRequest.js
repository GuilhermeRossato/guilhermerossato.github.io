class CommitRequest extends GitRequest {
	constructor(repository) {
		super();
		this.repository = repository;
	}
	dispatch() {
		if (this.user && this.repository) {
			this.url = `${this.baseUrl}/repos/${this.user}/${this.repository}/commits/`;
			if (this.commit) {
				this.url += this.commit;
			}
			super.dispatch();
		} else {
			setTimeout(()=>{
				this.dispatchEvent("error", "Couldn't dispatch commit request due to missing parameters");
			}, 1);
		}
		return this;
	}
	dispatchEvent(type, ...data) {
		if (type == "success") {
			console.log("Got an answer for '"+this.repository+"' - Commits");
			console.log(...data);
		}
		return super.dispatchEvent(type, ...data);
	}
}