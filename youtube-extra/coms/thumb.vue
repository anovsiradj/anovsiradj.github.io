<template>
	<section class="card">
		<a v-if="cover()" href="#" @click.prevent="$emit('cover_click')" :title="snippet.publishedAt">
			<img v-lazy="cover()" class="card-img-top">
		</a>

		<div v-if="snippet.title.trim().length > 0" class="card-body p-1">
			<p class="card-title text-truncate font-weight-bold m-0">
				<a href="#" @click.prevent="$emit('title_click')" v-text="snippet.title" :title="snippet.title"></a>
			</p>
		</div>
	</section>
</template>

<script>
module.exports = {
	props: {
		snippet: {
			type: Object,
			"default": {},
		},
	},
	methods: {
		cover: function() {
			return (i => i?.high||i?.standard||i?.default)(this.snippet?.thumbnails)?.url;
		},
	},
};
</script>
