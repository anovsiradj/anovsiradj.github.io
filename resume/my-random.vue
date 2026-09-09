<template>
	<div class="row g-3">
		<div v-for="hobby in hobbies" :key="hobby.id" class="col-6 col-md-4">
			<div class="content-card h-100 mb-0 text-center">
				<i :class="hobby.icon + ' text-accent display-4 mb-3 d-block'"></i>
				<p class="mb-0 fw-semibold" v-html="hobby.text"></p>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: () => ({ hobbies: [] }),
	created() {
		this.hobbies = window.ResumeDB.getHobbies();
	}
};
</script>
