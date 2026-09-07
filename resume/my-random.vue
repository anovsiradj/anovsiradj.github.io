<template>
	<div class="row g-3">
		<div v-for="hobby in hobbies" :key="hobby.id" class="col-md-6 col-lg-4">
			<div class="content-card h-100 mb-0 text-center">
				<i :class="hobby.icon + ' text-accent display-4 mb-3 d-block'"></i>
				<p class="mb-0 fw-semibold" v-html="getText(hobby)"></p>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data: () => {
			return {
				hobbies: [],
				lang: 'id-ID'
			}
		},
		created: function() {
			const db = window.ResumeDB;
			if (db.data) {
				this.hobbies = db.getHobbies();
				this.lang = db.getLocale();
			}
		},
		methods: {
			getText(hobby) {
				return this.lang === 'en-US' && hobby.text_en ? hobby.text_en : hobby.text;
			}
		}
	};
</script>
