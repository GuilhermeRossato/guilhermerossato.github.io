class ModalWindow extends ElementGroup {
	constructor(title = "Confirm", text = "Are you sure?") {
		super();
		this.title = title;
		this.text = text;
		this.buttons = [];
	}
	static appendTo(element) {
		if (!this.generated) {
			this._generate();
		}
		this.appended = true;
		element.appendChild(this.flex);
	}
	static show() {
		if (!this.generated) {
			this._generate();
		}
		if (!this.appended) {
			this.appendTo(document.body);
		}
		this.elements.flex.style.display = "block";
	}
	static hide() {
		this.elements.flex.style.display = "none";
	}
	static getElementData() {
		return {
			"flex": {
				type: "div",
				style: `
					display: flex;
					position: fixed;
					z-index: 15;
					top: 0;
					left: 0;
					width: 100vw;
					height: 100vh;
					margin: 0;
					padding: 0;
				`
			},
			"base" {
				type: "div",
				parent: "flex",
			}
		}
	}
}