
;(unknown => {

loader_v1.show();
var ytx = new YouTubeExtra(gapi,() => loader_v1.hide());
var cache_id = () => `YTX_CACHE_ID_${(new URLSearchParams(ytx.data.params)).toString()}`;

window.channels_list = new Vue({
	el: document.getElementById('channels_list'),
	components: {
		form_v1: httpVueLoader(`coms/form_v1.vue?_=${timestamp}`),
		chan_v1: httpVueLoader(`coms/chan_v1.vue?_=${timestamp}`),
		thumb: httpVueLoader(`coms/thumb.vue?_=${timestamp}`),
		player_v1: httpVueLoader(`coms/player_v1.vue?_=${timestamp}`),
	},
	data: {
		chans: [],
		videos: [],

		search_term: null,

		page_curr: 1,
		page_each: 12,
	},
	methods: {
		reset: function() {
			if ('id' in ytx.data.params) delete ytx.data.params.id;
			if ('forUsername' in ytx.data.params) delete ytx.data.params.forUsername;
			if ('playlistId' in ytx.data.params) delete ytx.data.params.forUsername;
		},

		search_handler: debounce(function(event) {
			let term = event.target.value.replace(/\s{2,}/g,' ').trim();
			if (term === this.$data.search_term) return;

			this.$data.page_curr = 1;

			if (term.length === 0) this.$data.search_term = null;
			if (term.length >= 3) this.$data.search_term = term;
		},1500),

		videos_filter: function() {
			return this.$data.videos.filter(i => {
				if (this.$data.search_term) {
					if (fuzzysearch(this.$data.search_term.toLowerCase(),i.snippet.title.toLowerCase())) return true;
					if (fuzzysearch(this.$data.search_term.toLowerCase(),i.snippet.description.toLowerCase())) return true;
					return false;
				}
				return true;
			});
		},
		videos_result: function() {
			let curr = this.$data.page_curr * this.$data.page_each;
			let index = curr - this.$data.page_each;
			return this.videos_filter().slice(index, curr);
		},
		page_handler: function(curr) {
			this.$data.page_curr = curr;
		},
		page_counter: function() {
			return Math.ceil(this.videos_filter().length / this.$data.page_each);
		},

		init: function(data) {
			this.reset();

			ytx.apikey(data.apikey);
			ytx.params(YouTubeExtra.defaults.kind.channels_list);
			ytx.params(data.params);

			this.$set(this.$data, 'chans', []);
			this.$set(this.$data, 'videos', []);

			let cache = datastore_get(cache_id());
			if (cache) {
				this.$set(this.$data, 'chans', cache);
				this.load();
			}
			else {
				loader_v1.show();
				ytx.load_channels_list({}, (is, list) => {
					loader_v1.hide();
					if (is) {
						let cache = [];
						list.forEach(item => {
							cache.push(item);
							this.$data.chans.push(item);
						});
						datastore_set(cache_id(), cache);
						this.load();
					}
				});
			}
		},
		load: function() {
			this.reset();

			ytx.params(YouTubeExtra.defaults.kind.playlist_items);

			ytx.params('pageToken', null);
			ytx.params('playlistId', this.$data.chans.map(i => i?.contentDetails?.relatedPlaylists?.uploads).join(','));

			this.loop();
		},
		loop: function(params) {
			params = params || {};

			let cache = datastore_get(cache_id());
			if (cache) {
				this.$data.videos.push(...cache);
			} else {
				loader_v1.show();
				ytx.load_playlist_items({},(is, result) => {
					loader_v1.hide();

					let list = result.items.filter(videos_ajax_filter);

					datastore_set(cache_id(), list);
					this.$data.videos.push(...list);
				});
			}
		},
	},
});

var videos_ajax_filter = function(i) {
	if (i?.status?.privacyStatus !== 'public') return false;
	if (i?.snippet?.title === 'Private video') return false;
	return true;
};

})();
