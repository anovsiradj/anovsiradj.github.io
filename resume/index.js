
const { loadModule } = window['vue3-sfc-loader'];
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

Vue.createApp({
	components: {
		'my-header': Vue.defineAsyncComponent(() => loadModule('resume/my-header.vue', options)), 
		'my-experiences': Vue.defineAsyncComponent(() => loadModule('resume/my-experiences.vue', options)), 
		'my-competences': Vue.defineAsyncComponent(() => loadModule('resume/my-competences.vue', options)), 
		'my-random': Vue.defineAsyncComponent(() => loadModule('resume/my-random.vue', options)), 
		'my-footer': Vue.defineAsyncComponent(() => loadModule('resume/my-footer.vue', options)), 
	}, 
}).mount(document.getElementById('index'));
