var currentTab = "default";

function set_memory_for_element(elementName, value) {
	localStorage.setItem(currentTab+"-input-value-"+elementName.toLowerCase(), value);
}

function on_memory_element_change(elementName, event) {
	if (!elementName) {
		return console.log("Changed element without name!");
	}
	set_memory_for_element(elementName, this.value);
}

function clear_memory_for_element(elementName) {
	localStorage.setItem(currentTab+"-input-value-"+elementName.toLowerCase(), "");
}

window.addEventListener("load", function() {
	document.querySelectorAll('input[type="text"]').forEach(element => {
		var elementName = element.getAttribute("name").toLowerCase();
		var binded = on_memory_element_change.bind(element, elementName);
		element.addEventListener("change", binded);
		element.addEventListener("keyup", binded);
		var elementValue = localStorage.getItem(currentTab+"-input-value-"+elementName);
		if (elementValue) {
			element.setAttribute("value", elementValue);
		}
	})
});