define(["fo"], function(fo) {
	
	var Event = {
		POPUP_OPEN:		"popupOpen",
		POPUP_CLOSE:	"popupClose",
		MODAL_OPEN:		"modalOpen",
		MODAL_CLOSE:	"modalClose"
	}

	Event.init = function(){
		//console.log("Event init");
	}

	Event.trigger = function(type, args){
		console.log("Event.trigger:: "+type);
		this[type](args ? args : null);
	}
	


	Event.popupOpen = function(args){
		// 처리 후
		if(args){
			args["callback"] ? args["callback"]() : null;
		}
	}

	Event.popupClose = function(args){
		// 처리 후
		args["callback"] ? args["callback"]() : null;
	}

	Event.modalOpen = function(args){
		// 처리 후
		args["callback"] ? args["callback"]() : null;
	}

	Event.modalClose = function(args){
		// 처리 후
		args["callback"] ? args["callback"]() : null;
	}
	


	Event.init();

	fo.addEvent(Event);

	return Event;
});
