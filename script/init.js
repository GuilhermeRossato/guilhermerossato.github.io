const App = (function() {

	function getRemainingScroll() {
		return (document.body.scrollHeight - window.innerHeight - window.scrollY);
	}

	var contentController = new ContentController();

	function onLoad() {
		var timer = setInterval(contentController.iterate.bind(contentController),1000);
		//contentController.askAuth();
	}

	window.addEventListener("load", onLoad);

	return {}
})();
