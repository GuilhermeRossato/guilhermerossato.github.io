class GitRequest {
	constructor() {
		this.url = 'http://api.github.com.br';
		this.headers = [{
			name: 'Accept',
			value: 'application/vnd.github.v3.raw+json',
		},{
			name: 'Content-Type',
			value: 'application/vnd.github.v3.raw+json',
		}];
		this.callbacks = {};
	}
	user(username) {
		this.user = username;
		return this;
	}
	repository(name) {
		this.repository = name;
		return this;
	}
	commit(code) {
		this.commit = code;
		return this;
	}
	formatResponse(type) {
		var id = 0;
		if (this.headers.some((header, i)=>((header.type === 'Content-Type') && (id = i || true)))) {
			this.headers[id].value = 'application/vnd.github.v3.'+type;
		}
		return this;
	}
	dispatch() {
		if (this.waiting) {
			console.warn("Unable to dispatch, still waiting last request");
		} else {
			this.waiting = true;
			var xhr = new XMLHttpRequest();
			this.headers.forEach(header => {
				xhr.setRequestHeader(header.name, header.value);
			});
			xhr.open('GET', this.url);
			xhr.onload = (ev) => ((this.response = ev) && (this.callbacks.success instanceof Function) && (this.callbacks.success()) && (this.waiting = false));
			xhr.onerror = (ev) => ((this.response = ev) && (this.error = true) && (this.callbacks.error instanceof Function) && (this.callbacks.error() && (this.waiting = false)));
		}
		return this;
	}
	then(success, failure) {
		this.callbacks.success = success;
		this.callbacks.failure = failure;
		return this;
	}
	on(type, callback) {
		if (type == "load" || type == "sucess") {
			this.callbacks.success = callback;
		} else if (type == "error") {
			this.callbacks.error = callback;
		} else {
			console.warn("Couldn't attach callback due to unknown event type: "+type.toString());
		}
		return this;
	}
}