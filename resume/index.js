if (typeof WebAppData === 'undefined') window.WebAppData = { debug: false };

const { loadModule } = window['vue3-sfc-loader'];

window.ResumeDB = {
	data: null,
	lang: 'id-ID',

	async init() {
		if (this.data) return this.data;
		try {
			const url = 'resume/db.json' + (WebAppData.debug ? `?_=${Date.now()}` : '');
			const res = await fetch(url);
			this.data = await res.json();
			this.lang = this.data.lang.default;
			return this.data;
		} catch (e) {
			console.error('ResumeDB: failed to load db.json', e);
			return null;
		}
	},

	getLocale() {
		return this.lang;
	},

	setLocale(lang) {
		if (this.data && this.data.lang.supported.includes(lang)) {
			this.lang = lang;
			return true;
		}
		return false;
	},

	t(key) {
		if (!this.data || !this.data.translations[this.lang]) return key;
		return this.data.translations[this.lang][key] || key;
	},

	decode(encoded) {
		try {
			return atob(encoded);
		} catch (e) {
			return encoded;
		}
	},

	getProfile() {
		if (!this.data) return null;
		const p = this.data.profile;
		return {
			name: p.name,
			address: this.decode(p.address),
			email: this.decode(p.email),
			phone: this.decode(p.phone),
			birthDate: this.decode(p.birth_date),
			socials: p.socials
		};
	},

	getExperiences() {
		return this.data ? this.data.experiences : [];
	},

	getCompetences() {
		return this.data ? this.data.competences : [];
	},

	getHobbies() {
		return this.data ? this.data.hobbies : [];
	},

	getFooter() {
		return this.data ? this.data.footer : {};
	}
};

const options = {
	moduleCache: {
		vue: Vue
	},
	async getFile(url) {
		if (WebAppData.debug) url += `?_=${Date.now()}`;
		const res = await fetch(url);
		return {
			getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
		}
	},
	addStyle(textContent) {
		const style = Object.assign(document.createElement('style'), { textContent });
		const ref = document.head.getElementsByTagName('style')[0] || null;
		document.head.insertBefore(style, ref);
	},
};

window.ResumeApp = Vue.createApp({
	components: {
		'my-header': Vue.defineAsyncComponent(() => loadModule('resume/my-header.vue', options)),
		'my-about': Vue.defineAsyncComponent(() => loadModule('resume/my-about.vue', options)),
		'my-experiences': Vue.defineAsyncComponent(() => loadModule('resume/my-experiences.vue', options)),
		'my-competences': Vue.defineAsyncComponent(() => loadModule('resume/my-competences.vue', options)),
		'my-random': Vue.defineAsyncComponent(() => loadModule('resume/my-random.vue', options)),
		'my-footer': Vue.defineAsyncComponent(() => loadModule('resume/my-footer.vue', options)),
	},
	async created() {
		await window.ResumeDB.init();
	},
}).mount(document.getElementById('index'));
