;(function(undefined) {
var id = 'simplead';
var adsed = {};
var ads = {
	CashTree: {
		url: 'https://goo.gl/Giv1mD',
		icon: 'https://www.cashtree.id/favicon.ico',
		title: 'Kamu Mau Pulsa Gratis?',
    headline: 'Cuma Lewat Smartphone Android Kamu',
		description: 'Install Aplikasinya dan Dapatkan Saldo Awal 2000 Poin. Jika beruntung, kamu bisa mendapatkan Smartphone Gratis!'
	},
	NiagaHoster: {
    url: 'https://panel.niagahoster.co.id/ref/12399',
		title: 'Dapatkan Hosting Tanpa Batas Sekarang!',
		banner: 'https://panel.niagahoster.co.id/banners/Set1-niagahoster-728x90.jpg'
	}
};

var components = {
	title: function(root, ad) {
		if(ad.title === undefined) return;
		if(ad.banner) {
			root.title = ad.title;
		} else {
			root.insertAdjacentElement('beforeend', dom_create_element('p', {
      	className: (id + '-title'),
				innerHTML: ad.title,
				style: 'font-size: 14px; margin: 0; padding: 0; font-weight: 600;'
			}));
		}
	},
  headline: function(root, ad) {
  	if(ad.headline === undefined) return;
  	if(ad.banner) return;
    root.insertAdjacentElement('beforeend', dom_create_element('p', {
    	className: (id + '-headline'),
    	innerHTML: ad.headline,
      style: 'font-size: 12px; margin: 0; padding: 0; font-weight: 600;' // sama dengan ad.title, hanya font-size yg beda
    }));
  },
	description: function(root, ad) {
		if(ad.description === undefined) return;
		if(ad.banner) return;
		root.insertAdjacentElement('beforeend', dom_create_element('p', {
    	className: (id + '-description'),
			innerHTML: ad.description,
			style: 'font-size: 12px; width: 100%; margin: 0; padding: 0; text-align: justify;'
		}));
	},
	banner: function(root, ad) {
		if(ad.banner === undefined) {
			root.style.border = '1px solid #d2d2d2';
			root.style.padding = '2px 4px';
		} else {
			root.appendChild(dom_create_element('img', {
      	className: (id + '-banner'),
				src: ad.banner,
				style: 'width: 100%; height: auto; display: block;'
			}));
		}
	}
};

function ad_random_pick() {
	// https://stackoverflow.com/a/4550514
	var array = Object.keys(ads);
	var selected = array[Math.floor(Math.random() * array.length)];
	console.log(selected);
	adsed[selected] = (adsed[selected] || 0) + 1;
	return ads[selected];
}

function ad_init(container) {
	if(container.dataset[id]) return;
	var ad = ad_random_pick();
	var root = dom_create_element('a', {
		href: ad.url,
		target: '_blank',
		style: 'display: block; color: #111; background-color: #eee; text-decoration: none; font-family: sans-serif; position:relative; margin: 0 auto; max-width: 720px; min-height: 50px;'
	});
	container.appendChild(root);
	for(var com in components) components[com](root, ad);
  // components.banner(root, ad);
  // components.title(root, ad);
  // components.headline(root, ad);
  // components.description(root, ad);

container.dataset[id] = true;
}

function dom_create_element(tagname, attributes) {
	attributes = attributes || {};
	var element = document.createElement(tagname);
	for(var attribute in attributes) {
		element[attribute] = attributes[attribute];
	}
	return element;
}

window['avirtualzr_' + id] = function() {
	var elements = document.body.getElementsByClassName(id);
	for(var i = 0; i < elements.length; i++) {
		ad_init(elements[i]);
	}
};
})();

