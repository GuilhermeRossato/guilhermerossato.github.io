class GitRequest {
	constructor() {
		this.baseUrl = 'https://api.github.com';
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
	handleHttpReturn(response, eventType, status) {
		if (status !== 200) {
			this.response = response;
			this.error = (eventType == "error");
			this.waiting = false;
		} else {
			if (this.retryCount) {
				this.retryCount++;
			} else {
				this.retryCount = 1;
			}
			console.log("Retrying due to invalid response to:",this.url);
			setTimeout(this.dispatch.bind(this), Settings['requests']['delay_after_fail_seconds']*1000);
		}
	}
	dispatch() {
		if (this.waiting) {
			setTimeout(()=>{
				this.dispatchEvent("error", "Unable to dispatch, still waiting last request");
			}, 1);
		} else {
			console.log("Dispatching: ", this.url);
			this.waiting = true;
			var xhr = new XMLHttpRequest();
			xhr.onload = (ev) => this.handleHttpReturn(ev, "success", xhr.status);
			xhr.onerror = (ev) => this.handleHttpReturn(ev, "error", xhr.status);
			xhr.onreadystatechange = (function(ev) {
				if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				    console.log("response ", this.responseText);
				}
			}).bind(xhr);
			xhr.open('GET', this.url);
			this.headers.forEach(header => {
				xhr.setRequestHeader(header.name, header.value);
			});
			xhr.send();
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