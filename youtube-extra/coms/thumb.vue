<template>
	<section class="card">
		<a v-if="snippet.thumbnails" href="#" @click.prevent="$emit('cover_click')" :title="snippet.publishedAt">
			<img v-lazy="(snippet.thumbnails.high||snippet.thumbnails.standard||snippet.thumbnails.default).url" class="card-img-top">
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
};
</script>
