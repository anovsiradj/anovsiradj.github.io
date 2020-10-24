
<template>
	<form @submit.prevent="submit" class="my-3">
	  <div class="form-row">
	    <div class="col">
	      <input v-model="apikey" class="form-control" placeholder="YouTube API KEY">
	    </div>

	    <div v-once v-if="$props.type === 'channels_list'" class="col">
	      <select name="params[uuid]" class="form-control" required>
	      	<option value="">Channel By</option>
	      	<option>id</option>
	      	<option>forUsername</option>
	      </select>
	    </div>

	    <div class="col">
	      <input v-model="uuid" class="form-control" placeholder="UUID">
	    </div>
	    <div class="col">
	    	<button type="submit" class="btn btn-danger">submit</button>
	    </div>
	  </div>
	</form>
</template>

<script>
module.exports = {
	props: ['type'],
	data: () => {
		return {
			params_re: /^.+\[(.+)\]$/,

			apikey: null,
			uuid: null,
		};
	},
	created: function() {
		if (window.WebAppData.debug) {
			XHRGET(`data.json?_=${timestamp}`, result => {
				this.$data.apikey = result.apikey;

				for (var i in result.samples[this.$props.type]) {
					if (i in this.$data) {
						this.$data[i] = result.samples[this.$props.type][i];
					} else {
						let el = this.$el.elements.namedItem(i);
						if (el) {
							el.value = result.samples[this.$props.type][i];
						}
					}
				}
			});
		}
	},
	methods: {
		submit: function() {
			let data0 = {};
			Array.from(this.$el.elements).forEach(e => {
				if (e.name) data0[e.name] = e.value;
			});

			let data1 = {
				apikey: this.$data.apikey,
				params: {},
			};
			for (var i in data0) {
				if (this.$data.params_re.test(i)) {
					let re = i.match(this.$data.params_re);
					if (re[1] in this.$data && this.$data[re[1]]) {
						data1['params'][data0[i]] = this.$data[re[1]];
					}
				}
			}

			this.$parent.init(data1);
		},
	},
};
</script>
