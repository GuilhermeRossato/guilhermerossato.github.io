function ContentController() {
	
	StateMachine.call(this, {
		"idle": {
			onEnter: function() {
				
			},
			onExit: function() {
				
			}
		},
		"waiting-response": {
			onEnter: function() {
			}
		}
	});
}

ContentController.prototype = {
	constructor: ContentController,
	getRemainingScroll: function() {
		return (document.body.scrollHeight - window.innerHeight - window.scrollY);
	},
	iterate: function() {
		
	}
}