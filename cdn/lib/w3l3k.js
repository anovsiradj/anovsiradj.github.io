;(function() {
	'use strict';

	function welek(currents) {
		currents = currents || {};
		this.currents = {};
		for (var i in this.defaults) {
			this.currents[i] = this.defaults[i];
			if (currents[i]) this.currents[i] = currents[i];
		}
	}

	welek.prototype.defaults = {
		class: 'w3l3k'
	};

	welek.prototype.init = function() {
		this.elements = document.getElementsByClassName(this.currents.class);
		for (var i = 0; i < this.elements.length; i++) {
			this.execute(this.elements[i]);
		}
		return this;
	};

	welek.prototype.execute = function(element) {
		element[element.dataset.hell] = eval(element.dataset.evil);
		return this;
	};

	window.w3l3k = function(currents) {
		return (new welek(currents));
	};

	if (window.jQuery) {
		jQuery.fn.w3l3k = function() {
			var instance = new welek();
			this.each(function() {
				instance.execute(this);
			});
		};
	}
})();
