class ElementGroup {
	constructor() {
		this.elements = {};
		this.generated = false;
	}
	static minifyStyle(style) {
		var mode = 0;
		return style.replace(/(\r\n|\t|\n|\r)/gm,"").split('').filter((char, index) => (((((mode == 1)&&(mode = 2))||true)&&(((char == ':')&&(mode = 1))||true)&&(char == ';')&&(mode = 0)||true)&&mode == 0)?(char !== ' '):((mode == 2)?((mode = 3)&&(char != ' ')):true)).join('');
	}
	_createElementByData(elementName, elementData) {
		var element = document.createElement(elementData.tag);
		var name, value;
		var parentless = [];
		element.setAttribute("name", elementName);
		for (name in elementData) {
			if (name === "parent") {
				value = elementData[name];
				if (this.elements[value]) {
					this.elements[value].appendChild(element);
				} else {
					console.warn(`Element ${elementName} couldn't be assigned to ${name} because the father doesn't exist at the time of creation`);
				}
			} else if ((name == "innerText") || (name == "innerHTML")) {
				element[name] = elementData[name];
			} else if (name !== "tag" && elementData.hasOwnProperty(name)) {
				value = (name == "style")?(ElementGroup.minifyStyle(elementData[name])):(elementData[name]);
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
	getElementData() {
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
				innerHTML: "<span>Replace this function!</span>"
			}
		}
	}
}