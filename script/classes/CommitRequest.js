class CommitRequest extends GitRequest {
	constructor() {
		super();
		this.headers = [{
			name: 'Accept',
			value: 'application/vnd.github.v3.raw+json',
		},{
			name: 'Content-Type',
			value: 'application/vnd.github.v3.raw+json',
		}];
	}
	dispatch() {
		if (this.user && this.repository) {
			this.url = `${this.url}/repos/${this.user}/${this.repository}/commits/`;
			if (this.commit) {
				this.url += this.commit;
			}
			super();
		} else {
			console.warn("Couldn't dispatch commit request due to missing parameters");
		}
		return this;
	}
}