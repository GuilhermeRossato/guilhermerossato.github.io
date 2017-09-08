class RequestMachine extends StateMachine {
	constructor(name, array) {
		this.name = name;
		this.array = array;
		super({
			"idle": {},
			"waiting-response": {}
		});
	}
	request(string) {
		if (this.name === "posts") {
			
		}
	}
}