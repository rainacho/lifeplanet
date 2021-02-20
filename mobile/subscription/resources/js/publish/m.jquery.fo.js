define(function () {
	var pluginObject = {};
	var globalObject = {};
	var eventObject = {};
	var pluginReference = {};

	//$("body").css("background", "cyan");

	var fo = {
		addPlugin: function (fn, selector) {
			!pluginObject[fn.name] ? (pluginObject[fn.name] = []) : null;
			!pluginReference[fn.name] ? (pluginReference[fn.name] = { fn: fn, selector: selector }) : null;

			registPlugin(fn, selector);
		},
		addGlobal: function (object, name) {
			if (typeof object === 'object') {
				!globalObject[name] ? (globalObject[name] = object) : null;
			}
		},
		addEvent: function (object, name) {
			if (typeof object === 'object') {
				//!eventObject[name] ? eventObject[name] = object : null;
				$.extend(eventObject, object);
			}
		},
	};

	fo.plugin = (function () {
		return pluginObject;
	})();

	fo.global = (function () {
		return globalObject;
	})();

	fo.event = (function () {
		return eventObject;
	})();

	fo.pluginReference = (function () {
		return pluginReference;
	})();

	function registPlugin(fn, selector) {
		$(selector).each(function (i, el) {
			if (!$.data(this, 'plugin_' + fn.name)) {
				var index = pluginObject[fn.name].length;
				var object = new fn($.extend({ element: this, selector: selector }, $(this).data()));
				$.data(this, 'plugin_' + fn.name, { index: index, object: object });
				pluginObject[fn.name].push(object);
			}
		});
	}

	// Subscription Only
	$(document).bind('changeSubscription', function (e) {
		pluginObject['Subscription'] = [];
		var fn = pluginReference['Subscription'].fn;
		var selector = pluginReference['Subscription'].selector;
		$(selector).data('plugin_Subscription', null);
		registPlugin(fn, selector);
	});

	return fo;
});
