
<template>
	<div class="modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header px-2 py-1">
				  <h5 v-if="$data.snippet" class="modal-title" v-text="$data.snippet.title"></h5>
				  <button type="button" @click="hide" class="close">&times;</button>
				</div>

				<div v-if="$data.snippet" class="modal-body m-0 p-0">
					<div class="embed-responsive embed-responsive-16by9">
					  <iframe class="embed-responsive-item" v-bind:src="href_safe" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>
					<pre class="text-break px-2 py-1 m-0" v-text="$data.snippet.description"></pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: function() {
		return {
			snippet: null,
		};
	},

	mounted: function() {
		$(this.$el).modal({
			backdrop: 'static',
			show: false,
			focus: false,
		});
	},

	computed: {
		href_safe: function() {
			if (this.$data.snippet) {
				// dump(this.$data.snippet.resourceId.videoId);
				return `https://www.youtube.com/embed/${this.$data.snippet.resourceId.videoId}?VQ=HD720`;
			}
			return null;
		},
	},

	methods: {
		show: function(snippet) {
			$(this.$el).modal('show');
			if (snippet) this.$data.snippet = snippet;
		},
		hide: function() {
			this.$data.snippet = null;
			$(this.$el).modal('hide');
		},
	},
};
</script>
