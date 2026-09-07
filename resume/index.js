if (typeof WebAppData === 'undefined') window.WebAppData = { debug: false };

const { loadModule } = window['vue3-sfc-loader'];

const MONTH_NAMES = [
	'', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
	'Agt', 'Sep', 'Okt', 'Nov', 'Des'
];

window.ResumeDB = {
	data: null,
	ready: false,

	async init() {
		if (this.data) return this.data;
		try {
			const url = 'resume/db.json' + (WebAppData.debug ? `?_=${Date.now()}` : '');
			const res = await fetch(url);
			this.data = await res.json();
			this.ready = true;
			return this.data;
		} catch (e) {
			console.error('ResumeDB: failed to load db.json', e);
			return null;
		}
	},

	decode(encoded) {
		try { return atob(encoded); }
		catch (e) { return encoded; }
	},

	formatPeriod(exp) {
		const start = this._composeDate(exp.tahun_mulai, exp.bulan_mulai);
		const end = this._composeDate(exp.tahun_selesai, exp.bulan_selesai);
		if (start && end) return `${start} - ${end}`;
		if (start) return `${start} - Sekarang`;
		return exp.mulai || '';
	},

	_composeDate(year, month) {
		if (!year) return null;
		if (month && MONTH_NAMES[month]) return `${MONTH_NAMES[month]} ${year}`;
		return String(year);
	},

	_diffMonths(tahun_mulai, bulan_mulai, tahun_selesai, bulan_selesai) {
		const now = new Date();
		const yEnd = tahun_selesai || now.getFullYear();
		const mEnd = bulan_selesai || (tahun_selesai ? 12 : now.getMonth() + 1);
		return (yEnd - tahun_mulai) * 12 + (mEnd - bulan_mulai);
	},

	getWorkExperience() {
		if (!this.data || !this.data.experiences) return '';
		let totalMonths = 0;
		for (const exp of this.data.experiences) {
			if (exp.tahun_mulai && exp.bulan_mulai) {
				totalMonths += this._diffMonths(
					exp.tahun_mulai, exp.bulan_mulai,
					exp.tahun_selesai, exp.bulan_selesai
				);
			}
		}
		const years = Math.floor(totalMonths / 12);
		const months = totalMonths % 12;
		if (years > 0 && months > 0) return `${years} Tahun ${months} Bulan`;
		if (years > 0) return `${years} Tahun`;
		return `${months} Bulan`;
	},

	getProfile() {
		if (!this.data) return null;
		const p = this.data.profile;
		return {
			name: p.name,
			address: this.decode(p.address),
			email: this.decode(p.email),
			phone: this.decode(p.phone),
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
	moduleCache: { vue: Vue },
	async getFile(url) {
		if (WebAppData.debug) url += `?_=${Date.now()}`;
		const res = await fetch(url);
		return { getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text() };
	},
	addStyle(textContent) {
		const style = Object.assign(document.createElement('style'), { textContent });
		const ref = document.head.getElementsByTagName('style')[0] || null;
		document.head.insertBefore(style, ref);
	},
};

window.ResumeApp = Vue.createApp({
	data() {
		return { loaded: false };
	},
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
		this.loaded = true;
	},
}).mount(document.getElementById('index'));
