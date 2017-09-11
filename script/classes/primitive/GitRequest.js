class GitRequest {
	constructor() {
		this.baseUrl = 'http://api.github.com.br';
		this.user = 'GuilhermeRossato';
		this.headers = [{
			name: 'Accept',
			value: 'application/vnd.github.v3.raw+json',
		},{
			name: 'Content-Type',
			value: 'application/vnd.github.v3.raw+json',
		}];
		this.callbacks = {};
	}
	handleHttpReturn(response, eventType) {
		this.response = response;
		this.error = (eventType == "error");
		this.waiting = false;
	}
	dispatch() {
		if (this.waiting) {
			setTimeout(()=>{
				this.dispatchEvent("error", "Unable to dispatch, still waiting last request");
			}, 1);
		} else {
			this.waiting = true;
			var xhr = new XMLHttpRequest();
			this.headers.forEach(header => {
				xhr.setRequestHeader(header.name, header.value);
			});
			xhr.onload = (ev) => this.handleHttpReturn(ev, "success");
			xhr.onerror = (ev) => this.handleHttpReturn(ev, "error");
			xhr.open('GET', this.url);
		}
		return this;
	}
	then(success, failure) {
		this.callbacks.success = success;
		this.callbacks.failure = failure;
		return this;
	}
	on(type, callback) {
		if (type == "load" || type == "success") {
			this.callbacks.success = callback;
		} else if (type == "error") {
			this.callbacks.error = callback;
		} else {
			// I hope no one ever sees this
			setTimeout(()=>{
				this.dispatchEvent("error", "Couldn't attach callback due to unknown event type: "+type.toString());
			}, 1);
		}
		return this;
	}
	dispatchEvent(type, ...data) {
		if (this.callbacks[type]) {
			this.callbacks[type].call(this, ...data);
		}
		if (type == "error") {
			console.warn("GitRequest Error: ", ...data);
		}
	}
}