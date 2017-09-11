class ElementGroup {
	constructor() {
		this.elements = {};
		this.initElementData();
		this.generated = false;
	}
	_createElementByData(elementName, elementData) {
		var element = document.createElement(data.type);
		var name, value;
		var parentless = [];
		for (name in elementData) {
			if (name === "parent") {
				value = elementData[name];
				if (this.elements[value]) {
					this.elements[value].appendChild(element);
				} else {
					console.warn(`Element ${elementName} couldn't be assigned to ${name} because the father doesn't exist at the time of creation`);
				}
			} else if (name !== "type" && elementData.hasOwnProperty(name)) {
				value = (name == "style")?(elementData[name].replace(/(\r\n|\n|  *|\r)/gm,"")):(elementData[name]);
				element.setAttribute(name, value);
			}
		}
		return element;
	}
	hasGenerated() {
		return (Object.keys(this.elements).length !== 0)
	}
	_generate() {
		if (this.hasGenerated()) {
			this.elements = {};
		}
		var elementsData = this.getElementData();
		for (var name in elementsData) {
			if (elementsData.hasOwnProperty(name)) {
				this.elements[name] = this._createElementByData(name, elementsData[name]);
			}
		}
		this.generated = true;
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
				`,
				innerText: "Replace this function!";
			}
		}
	}
}