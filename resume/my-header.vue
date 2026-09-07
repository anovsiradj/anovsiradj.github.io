<template>
	<div class="profile-card text-center mb-4">
		<div class="row align-items-center">
			<div class="col-md-4 mb-4 mb-md-0">
				<h1 class="h2 fw-bold mb-1" v-text="profile.name"></h1>
			</div>
			<div class="col-md-8 text-md-start">
				<ul class="info-list d-flex flex-wrap gap-4 justify-content-center justify-content-md-start mb-4">
					<li class="mb-0">
						<i class="bi bi-geo-alt-fill"></i>
						<span v-text="profile.address"></span>
					</li>
					<li class="mb-0">
						<i class="bi bi-envelope-fill"></i>
						<span v-text="profile.email"></span>
					</li>
					<li class="mb-0">
						<i class="bi bi-telephone-fill"></i>
						<span v-text="profile.phone"></span>
					</li>
					<li class="mb-0">
						<i class="bi bi-calendar2-heart-fill"></i>
						<span v-text="age"></span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	function calculateAge(birthDateString) {
		const today = new Date();
		const birthDate = new Date(birthDateString);

		let years = today.getFullYear() - birthDate.getFullYear();
		let months = today.getMonth() - birthDate.getMonth();
		let days = today.getDate() - birthDate.getDate();

		if (days < 0) {
			months--;
		}

		if (months < 0) {
			years--;
			months += 12;
		}

		const t = window.ResumeDB.t.bind(window.ResumeDB);
		return `${years} ${t('years_label')}, ${months} ${t('months_label')}.`;
	}

	module.exports = {
		data: () => {
			return {
				profile: {
					name: '',
					address: '',
					email: '',
					phone: '',
					birthDate: ''
				},
				age: ''
			}
		},
		created: function() {
			const db = window.ResumeDB;
			if (db.data) {
				this.profile = db.getProfile();
				this.age = calculateAge(this.profile.birthDate);
			}
		}
	};
</script>
