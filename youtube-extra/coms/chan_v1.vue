<template>
	<div class="card">
	  <div class="row no-gutters">
	    <div class="col-4">
	      <img :src="cover()" class="card-img">
	    </div>
	    <div class="col-8">
	      <div class="card-body">
	        <a class="h5 card-title" :href="href()" target="_blank" v-text="chan.snippet.title"></a>
	        <p class="card-text" v-text="chan.snippet.description"></p>
	        <p class="card-text text-muted" v-text="chan.snippet.publishedAt"></div>
	      </div>
	    </div>
	  </div>
	</div>
</template>

<script>
module.exports = {
	props: {
		chan: {
			type: Object,
			"default": {
				title: null,
				thumbnails: {},
			},
		},
	},
	data: {},
	methods: {
		href: function() {
			if (this.chan.snippet.customUrl === '') {
				return `https://www.youtube.com/channel/${this.chan.id}`;
			} else {
				return `https://www.youtube.com/c/${this.chan.snippet.customUrl}`;
			}
		},
		cover: function() {
			return (i => i?.high||i?.standard||i?.default)(this.chan.snippet.thumbnails)?.url;
		},
	},
};
</script>