<template>
	<div class="content-card">
		<div class="row g-4">
			<div v-for="cat in competences" :key="cat.id" :class="cat.id === 'others' ? 'col-12' : 'col-md-6'">
				<h4 class="h6 fw-bold mb-3"><i :class="cat.icon + ' me-2 text-accent'"></i> {{ getTitle(cat) }}</h4>
				<div class="d-flex flex-wrap gap-2">
					<span v-for="skill in cat.skills" :key="skill" class="badge-skill" v-text="skill"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data: () => {
			return {
				competences: [],
				lang: 'id-ID'
			}
		},
		created: function() {
			const db = window.ResumeDB;
			if (db.data) {
				this.competences = db.getCompetences();
				this.lang = db.getLocale();
			}
		},
		methods: {
			getTitle(cat) {
				return this.lang === 'en-US' && cat.title_en ? cat.title_en : cat.title;
			}
		}
	};
</script>
