class ReleaseRequest extends GitRequest {
	constructor(repository) {
		super();
		this.repository = repository;
	}
	dispatch() {
		if (this.user && this.repository) {
			this.url = `${this.url}/repos/${this.user}/${this.repository}/releases/`;
			if (this.commit) {
				this.url += this.commit;
			}
			super.dispatch();
		} else {
			console.warn("Couldn't dispatch commit request due to missing parameters");
		}
		return this;
	}
	dispatchEvent(type, ...data) {
		if (type == "success") {
			console.log("Got an answer for '"+this.repository+"' - Releases");
			console.log(...data);
		}
		return super.dispatchEvent(type, ...data);
	}
}