//import log from "./log.js";

function on_page_load() {
	function ignore_input(evt) {
		(evt.preventDefault && evt.preventDefault());
		return false;
	}
	Array.prototype.forEach.call(document.querySelectorAll("nav > a[selected]"), function(element) {
		element.onclick = ignore_input;
	});
}



window.addEventListener("load", on_page_load);