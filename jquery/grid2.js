/**
 * @version 20230831
 * @author anovsiradj <anov.siradj22@gmail.com>
 */

class AnoopGrid2 {
	static defaults = {
		limit: 5,
		current: 1,
		tableWrapperSelector: '.grid-table-wrapper',
		pagerWrapperSelector: '.grid-pager-wrapper',
		pagerContentSelector: '.grid-pager-content',
		changeCallback: $.noop,
	};
	options = {};

	constructor(element = '#grid', options = {}) {
		this.element = $(element);
		this.config(options);

		this.pagerFactory();
		this.change(this.options.current);
	}

	config(options) {
		let defaults = Object.assign({}, this.constructor.defaults);
		this.options = Object.assign(defaults, options);
	}

	get tableWrapper() {
		return $(this.element).find(this.options.tableWrapperSelector);
	}

	get tableContents() {
		return $(this.tableWrapper).children();
	}

	get tableCount() {
		return $(this.tableWrapper).children().length;
	}

	get pagerWrapper() {
		return $(this.element).find(this.options.pagerWrapperSelector);
	}

	get pagerContents() {
		return $(this.pagerWrapper).children();
	}

	get pagerCount() {
		return Math.ceil(this.tableWrapper.children().length / this.options.limit);
	}

	pagerFactory() {
		this.options.pagerContentTemplate ??= this.pagerContents.get(0).cloneNode(true);
		this.pagerContents.remove();

		for (var i = 1; i <= this.pagerCount; i++) {
			let template = this.options.pagerContentTemplate.cloneNode(true);
			$(template).appendTo(this.pagerWrapper);
			$(template).find(this.options.pagerContentSelector).text(i);
			$(template).find(this.options.pagerContentSelector).data('current', i);
			$(template).find(this.options.pagerContentSelector).on('click', (event) => {
				event.preventDefault();
				this.change($(event.target).data('current'));
			});
		}
	}

	change(current) {
		this.options.current = current;
		this.options.offset = (this.options.current - 1) * this.options.limit;

		$(this.tableWrapper).children().hide();
		$(this.tableWrapper).children().slice(this.options.offset, this.options.offset + this.options.limit).show();

		this.options.changeCallback.apply(this, arguments);
	}
}

$.fn.anoopGrid2 = function (options) {
	if (this.data('grid')) {
		let grid = this.data('grid');
		grid.config(Object.assign(grid.options, options));
	} else {
		let grid = new AnoopGrid2(this, options);
		this.data('grid', grid);
	}
};
