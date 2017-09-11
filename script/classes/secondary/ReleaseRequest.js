class ReleaseRequest extends GitRequest {
	constructor(repository) {
		super();
		this.repository = repository;
	}
	dispatch() {
		if (this.user && this.repository) {
			this.url = `${this.baseUrl}/users/${this.user}/repos/${this.repository}/releases/`;
			if (this.release) {
				this.url += this.release;
			}
			super.dispatch();
		} else {
			console.warn("Couldn't dispatch release request due to missing parameters");
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