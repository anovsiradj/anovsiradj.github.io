/* @version: 20200204, 20201024; @author: anovsiradj (mayendra costanov) <anov.siradj22@gmail.com>; */

'use strict';

function YouTubeExtra(gapi,callback) {
	this.gapi = gapi || window.gapi;
	this.data = {};

	this.data.params = {};
	this.params(YouTubeExtra.defaults.params);

	this.gapi.load('client',() => {
		this.init((is) => {
			if (callback) callback(is);
		});
	});
}

YouTubeExtra.defaults = {
	href: {
		playlist: list => `https://www.youtube.com/playlist?list=${i}`,
		video: v => `https://www.youtube.com/watch?v=${v}`,
		channel_by_id: channel => `https://www.youtube.com/channel/${channel}`,
		channel_by_name: channel => `https://www.youtube.com/user/${channel}`,
	},
	predefined: {
		params: {
			safeSearch: ['none','moderate','strict'],
			videoCaption: ['any','none','closedCaption'],
			videoDuration: ['any','short','medium','long'],
			videoDimension: ['any','2d','3d'],
			videoDefinition: ['any','standard','high'],
			type: ['channel','playlist','video'],
			part: [
				'contentOwnerDetails',
				'contentDetails',
				'auditDetails',
				'topicDetails',
				'snippet',
				'status',
				'id',
			],
			order: ['date','rating','relevance','title','videoCount','viewCount'],
			order_default: 'relevance',
		}
	},
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
		maxResults: 50,
	},
};

YouTubeExtra.prototype.params = function() {
	if (arguments[0] && typeof arguments[0] === 'object') {
		this.data.params = Object.assign({}, this.data.params, arguments[0]);
	}
	if (arguments[0] && typeof arguments[0] === 'string' && typeof arguments[1] !== 'undefined') {
		this.data.params[arguments[0]] = arguments[1];
	}
};

YouTubeExtra.prototype.apikey = function(apikey) {
	this.data.apikey = apikey;
	this.gapi.client.setApiKey(apikey);
};

YouTubeExtra.prototype.init = function(callback) {
	this.gapi.client
	.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
	.then(
		() => {
			if (callback) callback(true);
		},
		() => {
			console.error("Error loading GAPI client for API", arguments);
			if (callback) callback(false);
		}
	);
};

YouTubeExtra.prototype.load_playlist_items = function(params,callback) {
	params = params || {};
	params = Object.assign({},this.data.params,params);

	gapi.client.youtube.playlistItems.list(params).then(
		result => {
			if(callback) callback(true, result?.result || []);
		},
		() => {
			console.error("Error GAPI", arguments);
			if (callback) callback(false, arguments);
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
