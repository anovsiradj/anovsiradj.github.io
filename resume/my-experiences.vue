<template>
	<div class="content-card">
		<div class="timeline">
			<div v-for="(exp, index) in experiences" :key="exp.title" class="timeline-item" :class="{ 'mb-0 border-0': index === experiences.length - 1 }">
				<div class="d-flex justify-content-between align-items-center mb-2">
					<h3 class="h5 fw-bold mb-0" v-text="exp.title"></h3>
					<span class="badge bg-light text-dark"><i class="bi bi-calendar-check me-1"></i> {{ getPeriod(exp) }}</span>
				</div>
				<h4 class="h6 text-accent mb-2" v-text="exp.company"></h4>
				<p class="text-muted small mb-0"><i class="bi bi-geo-alt me-1"></i> {{ exp.location }}</p>
				<p class="text-muted small mb-0" v-if="index === experiences.length - 1"></p>
				
				<div v-if="exp.details" class="mt-2">
					<div v-if="exp.details.label" class="p-3 rounded-3 bg-light bg-opacity-10">
						<p class="mb-2 fw-semibold"><i class="bi bi-journal-code me-1"></i> {{ getDetailsLabel(exp) }}</p>
						<p class="small text-muted mb-2" v-text="getDetailsDesc(exp)"></p>
						<ul class="small text-muted mb-0 ps-3" v-if="getDetailsItems(exp)">
							<li v-for="item in getDetailsItems(exp)" :key="item" v-html="item"></li>
						</ul>
					</div>
					<div v-else>
						<p class="small text-muted mb-2" v-text="getDetailsDesc(exp)"></p>
						<ul v-if="getDetailsItems(exp)" class="small text-muted mb-0 ps-3">
							<li v-for="item in getDetailsItems(exp)" :key="item" v-html="item"></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data: () => {
			return {
				experiences: [],
				lang: 'id-ID'
			}
		},
		created: function() {
			const db = window.ResumeDB;
			if (db.data) {
				this.experiences = db.getExperiences();
				this.lang = db.getLocale();
			}
		},
		methods: {
			getPeriod(exp) {
				return this.lang === 'en-US' && exp.period_en ? exp.period_en : exp.period;
			},
			getDetailsLabel(exp) {
				if (!exp.details) return '';
				return this.lang === 'en-US' && exp.details.label_en ? exp.details.label_en : exp.details.label;
			},
			getDetailsDesc(exp) {
				if (!exp.details) return '';
				return this.lang === 'en-US' && exp.details.description_en ? exp.details.description_en : exp.details.description;
			},
			getDetailsItems(exp) {
				if (!exp.details) return null;
				const items = this.lang === 'en-US' && exp.details.items_en ? exp.details.items_en : exp.details.items;
				return items && items.length > 0 ? items : null;
			}
		}
	};
</script>
