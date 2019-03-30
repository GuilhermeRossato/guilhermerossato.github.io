(function loadCurrentTab() {
	window.currentTab = localStorage.getItem("last-selected-tab");
	if (!window.currentTab) {
		window.currentTab = 0;
	}
	if (typeof window.currentTab === "string") {
		window.currentTab = parseInt(window.currentTab);
	}
})()

function get_current_tab_prefix() {
	if (isNaN(parseInt(window.currentTab))) {
		console.warn("Current Tab is not a number!");
		return "00";
	}
	return get_tab_prefix(window.currentTab);
}

function get_tab_prefix(index = -1) {
	if (index === -1) {
		index = (typeof window.currentTab === "string")?parseInt(window.currentTab):window.currentTab
	}
	if (index < 10) {
		return "0"+index;
	} else {
		return index.toString();
	}
}

function set_memory_for_element(elementName, value, specificTab = -1) {
	var prefix = get_tab_prefix(specificTab);
	//console.log("wrting to '"+prefix+"-input-value-"+elementName.toLowerCase()+"'", value);
	localStorage.setItem(prefix+"-input-value-"+elementName.toLowerCase(), value);
	console.log(localStorage.getItem(prefix+"-input-value-"+elementName.toLowerCase()))
}

function get_memory_for_element(elementName, specificTab = -1) {
	var prefix = get_tab_prefix(specificTab);
	//console.log("getting from '"+prefix+"-input-value-"+elementName.toLowerCase()+"'");
	return localStorage.getItem(prefix+"-input-value-"+elementName.toLowerCase());
}

function on_memory_element_change(elementName, event) {
	if (!elementName) {
		return console.log("Changed element without name!");
	}
	if (elementName === "nome-da-proposta") {
		on_current_tab_name_input_change(this.value);
	}
	set_memory_for_element(elementName, this.value);
}

function clear_memory_for_element(elementName) {
	set_memory_for_element(elementName, "");
}

function load_element(element) {
	var elementName = element.getAttribute("name");
	var elementValue = get_memory_for_element(elementName);

	if (elementValue) {
		element.value = elementValue;
	} else if (element.getAttribute("default-value")) {
		element.value = element.getAttribute("default-value");
	} else if (element.getAttribute("value")) {
		element.value = element.getAttribute("value");
	} else {
		element.value = "";
	}

	if (element.classList.contains("mdl-textfield__input") && element.parentNode.classList.contains("mdl-js-textfield")) {
		if (element.value !== "") {
			element.parentNode.classList.add("is-dirty");
		} else {
			element.parentNode.classList.remove("is-dirty");
		}
	}
}

function load_all_inputs() {
	document.querySelectorAll('input[type="text"]').forEach(load_element);
}

window.addEventListener("load", function() {
	document.querySelectorAll('input[type="text"]').forEach(element => {
		var elementName = element.getAttribute("name").toLowerCase();
		var binded = on_memory_element_change.bind(element, elementName);
		element.addEventListener("change", binded);
		element.addEventListener("keyup", binded);
	});
});