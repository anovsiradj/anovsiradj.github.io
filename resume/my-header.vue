<template>
	<div class="profile-card text-center mb-4">
		<div class="row align-items-center">
			<div class="col-md-4 mb-4 mb-md-0">
				<h1 class="h2 fw-bold mb-1" v-text="profile.name"></h1>
			</div>
			<div class="col-md-8 text-md-start">
				<ul class="info-list d-flex flex-wrap gap-4 justify-content-center justify-content-md-start mb-4">
					<li class="mb-0">
						<i class="bi bi-geo-alt-fill" title="Alamat" data-bs-toggle="tooltip"></i>
						<span v-text="profile.address"></span>
					</li>
					<li class="mb-0">
						<i class="bi bi-envelope-fill" title="Email" data-bs-toggle="tooltip"></i>
						<span v-text="profile.email"></span>
					</li>
					<li class="mb-0">
						<i class="bi bi-telephone-fill" title="Phone (+62)" data-bs-toggle="tooltip"></i>
						<span v-text="profile.phone"></span>
					</li>
					<li class="mb-0">
						<i class="bi bi-clock-fill" title="Pengalaman" data-bs-toggle="tooltip"></i>
						<span v-text="workExperience"></span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: () => ({
		profile: { name: '', address: '', email: '', phone: '' },
		workExperience: ''
	}),
	created() {
		const db = window.ResumeDB;
		this.profile = db.getProfile();
		this.workExperience = db.getWorkExperience();
	},
	mounted() {
		$(this.$el).find('[data-bs-toggle="tooltip"]').tooltip();
	}
};
</script>
