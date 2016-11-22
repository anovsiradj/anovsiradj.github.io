/*

	REMAKE OF JQUERY: FNAVI (ADVANCED - 2016)

*/

;(function(w, d, $) {

	(function() {
		var csses = {
			'.avz-fnavi-parent': [
				'position: relative;',
			],
			'.avz-fnavi-base': [
				// 'display:none;',
				// 'position:relative;',
				'position:absolute;',
				'top:0px;',
				'left:0px;',
				'right:0px;',
				// 'color:#222;',
				'border-bottom: 10px solid #222;',
				'background: #8CC220;',
				'color: #222;',
			],
			'.avz-fnavi-content': [
				// 'position: absolute;',
				'position: relative;',
				'overflow: hidden;',
				// 'height: 0px;',
				// 'background: #8CC220;',
				// 'color: #222;',
				// 'display: none;',
				'width: 100%;',
				'margin: 0px;',
				// 'top: 0px;',
				// 'left: 0px;',
				// 'right: 0px;',
				// 'height:0px;',
			],
			'.avz-fnavi-bar': [
				// 'padding: 5px 10px;',
				'padding: 6px 10px;',
				'display: inline-block;',
				'position: absolute;',
				// 'right: 15px;',
				'right: 13px;',
				'bottom: -34px;',
				'background-color: #222;',
				'font-size: 13px;',
				'font-weight: bold;',
				'font-family:monospace;',
				'cursor: pointer;',
				'color: #ddd;',
			]
		};
		var rule, style = d.createElement('style');
		for(var css in csses) {
			rule = css + "{" + csses[css].join('') + "}";
			style.appendChild(d.createTextNode(rule));
		}
		d.head.appendChild(style);
	})();

	function fnavi(elm) {
		elm.classList.add('avz-fnavi-content');
		elm.style.height = '0px';

		fnavi_parent(elm.parentElement);

		elm.insertAdjacentHTML('beforeBegin', '<div class="avz-fnavi-base"></div>');
		elm.previousSibling.appendChild(elm);

		elm.insertAdjacentHTML('afterEnd', '<div class="avz-fnavi-bar">+</div>');

		// elm.parentElement.style.display = 'block';
		fnavi_bar(elm.nextSibling, elm.parentElement, elm);
	}

	function fnavi_bar(elm, base, content) {

		elm.textContent = '+';
		elm.classList.add('avz-fnavi-bar');

		elm.addEventListener('click', function() {
			if (content.style.height == '0px') {
				// $(content).slideDown();
				content.style.height = '';
				base.style.zIndex = '1024';
			} else {
				content.style.height = '0px';
				base.style.zIndex = '';
				// elm.previousSibling.parentElement.style.zIndex = '+1';
			}
		});
	}

	function fnavi_parent(elm) {
		elm.classList.add('avz-fnavi-parent');
		elm.style.paddingTop = (Number(elm.style.paddingTop.match(/^[0-9]+/)) + 10) + 'px';
	}

	w.fnavi = fnavi;

	// $.fn.fnavi = function() {
	// 	this.each(function() {
	// 		this.parentElement.classList.add('fnavi-parent');

	// 		this.insertAdjacentHTML('beforeBegin', '<div class="fnavi-base"></div>');

	// 		this.previousSibling.appendChild(this);
	// 	});
	// };

})(window, document, function() {
	return (jQuery || null);
});
