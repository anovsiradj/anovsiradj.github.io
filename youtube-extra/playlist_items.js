
Vue.use(VueLazyload);
Vue.component('paginate', VuejsPaginate);

/* jika 1 playlist dengan 1000 video. maka 1x ajax = 50 video. maka 1000 video = 20x ajax. */
WebAppData.ytx_api_fetch_ajax_limit = Number.MAX_SAFE_INTEGER;
if (WebAppData.debug) WebAppData.ytx_api_fetch_ajax_limit = 20;

WebAppData.ytx_parse_result_min = 0;
WebAppData.ytx_parse_result_max = Number.MAX_SAFE_INTEGER;

(unknown => {
	'use strict';

	var data_params_re = /^.+\[(.+)\]$/;
	var cache_id = () => `YTX_CACHE_ID_${JSON.stringify(ytx.data.params)}`;

	var finder = new SearchQueryParser;

	loader_v1.show();
	var ytx = new YouTubeExtra(gapi, () => loader_v1.hide());

	ytx.params({
		part: 'snippet,status',
	});
	if (WebAppData.debug) {
		ytx.params('order', 'date');
		// ytx.params('q','loona'); // ignored //
	}

	var form_apikey = document.getElementById('form_apikey');

	var fetch_ai = 0;
	function fetch() {
		fetch_ai++;
		if (fetch_ai > WebAppData.ytx_api_fetch_ajax_limit) return;

		var result = datastore_get(cache_id());
		if (result) return parse(result);

		loader_v1.show();
		ytx.load_playlist_items({}, (is, result) => {
			loader_v1.hide();

			if (is) {
				datastore_set(cache_id(), result);
				parse(result);
			}
		});
	}

	var parse_ai = 0;
	function parse(result) {
		parse_ai++;
		if (parse_ai < WebAppData.ytx_parse_result_min) return;
		if (parse_ai > WebAppData.ytx_parse_result_max) return;

		playlist_items.$data.items.push(...result.items.filter(i => {
			if (i?.status?.privacyStatus !== 'public') return false;
			if (i?.snippet?.title === 'Private video') return false;
			return true;
		}));

		if (result.nextPageToken) {
			loader_v1.show();
			setTimeout(() => {
				loader_v1.hide();

				ytx.params('pageToken', result.nextPageToken);
				fetch();
			}, 0);
		}
	}

	$(form_apikey).on('submit', event => {
		event.preventDefault();

		fetch_ai = parse_ai = 0;
		playlist_items.$data.page_curr = 1;
		playlist_items.$set(playlist_items.$data, 'items', []);

		$(form_apikey).find('[name]').each(function () {
			if (this.name === 'apikey') {
				return ytx.apikey(this.value);
			}
			if (data_params_re.test(this.name)) {
				return ytx.params(this.name.match(data_params_re)[1], this.value);
			}
		});

		ytx.params('pageToken', null);
		fetch();
	});

	window.playlist_items = new Vue({
		el: document.getElementById('playlist_items'),
		data: {
			search: null,
			search_ok: [],
			search_no: [],
			items: [],

			page_curr: 1,
			page_each: 12,
		},
		computed: {
			videos_filter: function () {
				return this.$data.items.filter(i => {
					if (this.$data.search) {
						if (
								stringSimilar(this.$data.search, i.snippet.title, 5) >= 0.09 ||
								stringSimilar(this.$data.search, i.snippet.description, 5) >= 0.09
						) {
							return true;
						}

						return false;
					}
					return true;
				});
			},
			videos_pager: function () {
				let curr = this.$data.page_curr * this.$data.page_each;
				let index = curr - this.$data.page_each;
				return this.videos_filter.slice(index, curr);
			},
		},
		methods: {
			search_event: debounce(function (event) {
				var search = event.target.value.trim();
				if (search === this.$data.search) return;

				// this.$data.page_curr = 1;

				if (search.length === 0) this.$data.search = null;
				if (search.length >= 3) this.$data.search = search;

				if (this.$data.search) {
					finder.parse(search.toLowerCase());

					this.$set(this.$data, 'search_ok', []);
					this.$set(this.$data, 'search_no', []);

					finder.get_term().forEach(i => {
						if (typeof i.sign === 'undefined' || i.sign === '+') {
							this.$data.search_ok.push(i.term);
						}
						if (i.sign === '-') {
							this.$data.search_no.push(i.term);
						}
					});

					dump(finder, this.$data.search_ok, this.$data.search_no);
				}
			}, 1500),

			page_handler: function (curr) {
				this.$data.page_curr = curr;
			},
			page_counter: function () {
				let page_counter = Math.ceil(this.videos_filter.length / this.$data.page_each);
				if (page_counter > 0 && this.$data.page_curr > page_counter) this.page_handler(page_counter);
				return page_counter;
			},
		},
		components: {
			'player_v1': httpVueLoader(`coms/player_v1.vue?_=${timestamp}`),
			'thumb': httpVueLoader(`coms/thumb.vue?_=${timestamp}`),
		},
	});

	if (WebAppData.debug) {
		$.get(`data.json?_=${timestamp}`, result => {
			$(form_apikey).find('[name=apikey]').prop('value', result.apikey);
			$(form_apikey).find('[name^=params]').each(function () {
				var name = this.name.match(data_params_re)[1];
				if (name === 'playlistId') this.value = result.samples.playlist[1];
			});
		});
	}
})();
