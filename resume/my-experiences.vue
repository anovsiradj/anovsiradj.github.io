<template>
	<div class="content-card">
		<div class="timeline">
			<div v-for="(exp, index) in experiences" :key="index" class="timeline-item" :class="{ 'mb-0 border-0': index === experiences.length - 1 }">
				<div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
					<h3 class="h5 fw-bold mb-0" v-text="exp.title"></h3>
					<span class="badge bg-light text-dark text-nowrap">
						<i class="bi bi-calendar-check me-1"></i>
						{{ getPeriod(exp) }}
					</span>
				</div>

				<h4 class="h6 text-accent mb-2" v-text="exp.company"></h4>

				<p class="text-muted small mb-0">
					<i class="bi bi-geo-alt me-1"></i>
					{{ exp.location }}
				</p>

				<div v-if="exp.details" class="mt-2">
					<div v-if="exp.details.label" class="p-3 rounded-3 bg-light bg-opacity-10">
						<p class="mb-2 fw-semibold">
							<i class="bi bi-journal-code me-1"></i>
							{{ exp.details.label }}
						</p>
						<p class="small text-muted mb-2" v-text="exp.details.description"></p>
						<ul class="small text-muted mb-0 ps-3" v-if="exp.details.items">
							<li v-for="(item, i) in exp.details.items" :key="i" v-html="item"></li>
						</ul>
					</div>
					<div v-else>
						<p class="small text-muted mb-2" v-text="exp.details.description"></p>
						<ul v-if="exp.details.items" class="small text-muted mb-0 ps-3">
							<li v-for="(item, i) in exp.details.items" :key="i" v-html="item"></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: () => ({
		experiences: []
	}),
	created() {
		this.experiences = window.ResumeDB.getExperiences();
	},
	methods: {
		getPeriod(exp) {
			return window.ResumeDB.formatPeriod(exp);
		}
	}
};
</script>
