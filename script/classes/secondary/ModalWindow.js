class ModalWindow extends ElementGroup {
	constructor(title = "Confirm", text = "Are you sure?") {
		super();
		this.title = title;
		this.text = text;
		this.buttons = [];
		this.rows = [];
	}
	appendTo(element) {
		if (!this.generated) {
			this._generate();
			this.rows.push(this.elements.row0);
		}
		element.appendChild(this.elements.flex);
	}
	show() {
		if (!this.generated) {
			this._generate();
			this.appendTo(document.body);
		}
		this.elements.flex.style.display = "flex";
	}
	hide() {
		this.elements.flex.style.display = "none";
	}
	addButton(text, row=0) {
		var element = this._createElementByData({
			tag: "input",
			value: text,
			type: "button"
		});
		this.elements.push(element);
		return element;
	}
	addRow() {
		var element = this._createElementByData({
			tag: "div"
		});
		this.elements.push(element);
		return element;
	}
	getElementData() {
		return {
			"flex": {
				tag: "div",
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
					background-color: rgba(0,0,0,0.2);
				`
			},
			"base": {
				tag: "div",
				parent: "flex",
				style: `
					border-radius: 3px;
					background-color: rgba(0,0,0,0.4);
					padding: 10px;
					margin: auto;
					min-width:200px;
				`
			},
			"container": {
				tag: "ul",
				parent: "base",
				style: `
					border: 1px solid #000;
					border-radius: 3px;
					background-color: #eee;
					padding: 0;
					margin: 0;
					list-style-type: none;
				`
			},
			"header": {
				tag: "li",
				parent: "container",
				style: `
					background-color: #444;
					color: white;
					padding: 5px 10px 5px 10px;
					margin: 0;
					display: flex;
				`
			},
			"title": {
				tag: "h1",
				parent: "header",
				style: `
					font-weight: bold;
					padding: 0;
					margin: 0;
					font-size: 16px;
					flex-grow: 1;
				`,
				innerText: this.title
			},
			"close": {
				tag: "a",
				parent: "header",
				style: `
					cursor: pointer;
					font-size: 16px;
					font-weight: bold;
					padding: 0;
					margin: 0;
					float: right;
					display: inline-block;
					width: 20px;
					height: 20px;
					border-radius: 10px;
					background-color: #111;
				`,
				innerText: "x"
			},
			"row0": {
				tag: "li",
				parent: "container",
				innerText: this.text,
				style: `
					margin: 0;
					padding: 20px 25px 20px 25px;
					font-size: 14px;
					color: #333;
				`
			}
		}
	}
}