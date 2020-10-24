/* @version: 20200204, 20201024; @author: anovsiradj (mayendra costanov) <anov.siradj22@gmail.com>; */

'use strict';

function YouTubeExtra(gapi,callback) {
	this.gapi = gapi || window.gapi;
	this.data = {};

	this.data.params = {};
	this.params(YouTubeExtra.defaults.params);

	this.gapi.load('client',() => {
		this.init();
		if (callback) callback(this);
	});
}

YouTubeExtra.defaults = {
	kind: {
		playlist_items: {
			part: 'snippet,status',
		},
		channels_list: {
			part: 'contentDetails,snippet',
			pageToken: null,
		}
	},
	params: {
		part: 'snippet',
		pageToken: null,
		maxResults: 50, // free usage max limit //
	},
};

YouTubeExtra.prototype.params = function() {
	if (arguments[0] && typeof arguments[0] === 'string' && arguments[1]) {
		this.data.params[arguments[0]] = arguments[1];
	}
	if (arguments[0] && typeof arguments[0] === 'object') {
		this.data.params = Object.assign({},this.data.params,arguments[0]);
	}
};

YouTubeExtra.prototype.apikey = function(apikey) {
	apikey = apikey||null;

	if (apikey===null) return this.data.apikey;

	this.data.apikey = apikey;
	this.gapi.client.setApiKey(apikey);
};

YouTubeExtra.prototype.init = function(callback) {
	var that = this;

	this.gapi.client
	.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
	.then(
		() => (callback && callback(true)),
		function() {
			console.error("Error loading GAPI client for API",arguments);
			if (callback) callback(false);
		}
	);

	return this;
};

/*  */
YouTubeExtra.prototype.load_playlist_items = function(params,callback) {
	params = params || {};
	params = Object.assign({},this.data.params,params);
	// dump(params);

	gapi.client.youtube.playlistItems
	.list(params)
	.then(
		result => {
			if(callback) callback(true,result.result);
		},
		function() {
			console.error("Error execute GAPI",arguments);
			if (callback) callback(false,arguments);
		}
	);
};

YouTubeExtra.prototype.load_channels_list = function(params,callback) {
	params = params || {};
	params = Object.assign({},this.data.params,params);

	gapi.client.youtube.channels.list(params).then(
		result => {
			if (callback) callback(true, result?.result?.items || []);
		},
		() => {
			console.error("Error GAPI", arguments);
			if (callback) callback(false, arguments);
		}
	);
};
