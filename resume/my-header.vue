<template>
	<div class="profile-card text-center mb-4">
		<div class="row align-items-center">
			<div class="col-md-4 mb-4 mb-md-0">
				<!-- <div class="d-flex justify-content-center">
					<div class="profile-avatar d-flex align-items-center justify-content-center bg-dark text-white mx-auto">
						<i class="bi bi-person-circle" style="font-size: 5rem;"></i>
					</div>
				</div> -->
				<h1 class="h2 fw-bold mb-1">Mayendra Costanov</h1>
				<!-- <p class="text-muted mb-0">Web Developer / Programmer</p> -->
			</div>
			<div class="col-md-8 text-md-start">
				<ul class="info-list d-flex flex-wrap gap-4 justify-content-center justify-content-md-start mb-4">
					<li class="mb-0">
						<i class="bi bi-geo-alt-fill"></i>
						<span v-text="address"></span>
					</li>
					<li class="mb-0">
						<i class="bi bi-envelope-fill"></i>
						<span v-text="email_address"></span>
					</li>
					<li class="mb-0">
						<i class="bi bi-telephone-fill"></i>
						<span v-text="phone_number"></span>
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

		// Adjust if the birthday hasn't occurred yet this month
		if (days < 0) {
			months--;
		}

		// Adjust if the birth month hasn't occurred yet this year
		if (months < 0) {
			years--;
			months += 12;
		}

		return `${years} Tahun, ${months} Bulan.`;
	}

	module.exports = {
		data: () => {
			return {
				address: atob('WW9neWFrYXJ0YSwgSW5kb25lc2lh'),
				email_address: atob('YW5vdi5zaXJhZGoyMkBnbWFpbC5jb20='),
				phone_number: atob('KCs2Mik4MjEgOTgxMCAyNTI2'),
				age: calculateAge(atob('MTk5Ni0wNS0yMg==')),
			}
		}
	};
</script>