
Vue.use(VueLazyload);

(unknown => {
	'use strict';

	var data_params_re = /^.+\[(.+)\]$/;
	var cache_id = () => `YTX_CACHE_ID_${JSON.stringify(ytx.data.params)}`;
	var loop_delay = 150;

	loader_v1.show();
	var ytx = new YouTubeExtra(gapi,() => loader_v1.hide());

	var form_apikey = document.getElementById('form_apikey');

	function fetch(params) {
		ytx.params(params);

		var id = cache_id(); dump(id);
		var result = datastore_get(id);
		if (result) return parse(result);

		loader_v1.show();
		ytx.load_playlist_items({},(yn,result) => {
			loader_v1.hide();
			datastore_set(id,result);
			parse(result);
		});
	}

	// var parse_ai = 0, parse_min = 19, parse_max = 19;
	function parse(result) {
		// parse_ai++;

		if (result.nextPageToken) {
			loader_v1.show();
			setTimeout(() => {
				loader_v1.hide();
				fetch({pageToken:result.nextPageToken});
			},100);
		}

		// if (parse_ai < parse_min) return;
		// if (parse_ai > parse_max) return;
		for (var i = result.items.length - 1; i >= 0; i--) {
			if (result.items[i].status === unknown) continue;
			if (result.items[i].status.privacyStatus !== 'public') continue;
			if (result.items[i].snippet.title === 'Private video') continue;
			playlist_items.$data.items.push(result.items[i]);
		}
	}

	$(form_apikey).on('submit',event => {
		event.preventDefault();

		$(form_apikey).find('[name]').each(function() {
			if (data_params_re.test(this.name)) {
				ytx.params(this.name.match(data_params_re)[1],this.value);
				return;
			}
			if (this.name === 'apikey') ytx.apikey(this.value);
		});

		playlist_items.$set(playlist_items.$data,'items',[]);

		ytx.params('pageToken',null);
		fetch();
	});

	$(document).ready(event => {
		$.get(`data.json?_=${timestamp}`,result => {
			$(form_apikey).find('[name=apikey]').prop('value',result.apikey);
			$(form_apikey).find('[name^=params]').each(function() {
				var name = this.name.match(data_params_re)[1];
				if (name === 'playlistId') this.value = result.samples.playlist[1];
			});
		});
	});

	var playlist_items = new Vue({
		el: document.getElementById('playlist_items'),
		data: {
			search: null,
			items:[],
		},
		computed: {
			filteredItems: function() {
				if (this.$data.search && this.$data.search.length > 0) {
					return (new Fuse(this.$data.items,{
						// shouldSort: true,
						// includeScore: true,
						tokenize: true,
						matchAllTokens: true,
						threshold: 0.49,
						distance: 10,
						keys: [
						  'snippet.title',
						  // 'snippet.description',
						]
					})).search(this.$data.search);
				}
				return this.$data.items;
			},
		},
		methods: {
			search_event: debounce(function(event) {
				var search = event.target.value.trim();
				if (search === this.$data.search) return;

				if (search.length === 0) this.$set(this.$data,'search',null);
				if (search.length >= 3) this.$set(this.$data,'search',search);
			},666),
		},
		components: {
			'player_v1': httpVueLoader(`coms/player_v1.vue?_=${timestamp}`),
		},
	});

	window.vlistx = playlist_items;
})();
