
/* @version: 20200204215315; @author: anovsiradj <anov.siradj22@gmail.com>; */

(unknown => {
	var 
	backdrop = document.createElement('div'),
	circle = document.createElement('div'),
	style = document.createElement('style')
	;

	backdrop.id = 'loader_v1_backdrop';
	circle.id = 'loader_v1_circle';

	style.innerHTML = `
		@keyframes loader_v1_animate_rotate {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
		}

		#loader_v1_backdrop {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.1);
			text-align: center;
		}

		#loader_v1_circle {
			border-width: 8px;
			border-style: solid;
			border-color: gray;

			border-top-color: #FF3300;
			border-left-color: #FFFF00;
			border-bottom-color: #33FF00;
			border-right-color: #3300FF;

			border-radius: 50%;
			width: 60px;
			height: 60px;
			animation: loader_v1_animate_rotate 0.9s linear infinite;

			position: absolute;
			top: 33%;
			display: inline-block;
		}
	`;

	/* TODO */
	window.loader_v1 = (params) => {
		if (params === unknown) return;
	};

	window.loader_v1.show = function() {
		backdrop.hidden = false;
	};

	window.loader_v1.hide = function() {
		backdrop.hidden = true;
	};

	document.head.appendChild(style);
	document.body.appendChild(backdrop);
	backdrop.appendChild(circle);

	window.loader_v1.hide();
})();
