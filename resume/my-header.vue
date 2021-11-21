
<template>
<header class="container-fluid my-5">
	<div class="row">
		<div class="col text-center text-md-start">
			<h1 title="anovsiradj">
				<span>Mayendra Costanov</span>
			</h1>
		</div>
		<div class="col text-center text-md-end">
			<div>
				<a href="https://ne-a-r.blogspot.com" target="_blank">WebLog</a>
				<span>&nbsp;</span>
				<a href="https://twitter.com/anovsiradj" target="_blank">Twitter</a>
				<span>&nbsp;</span>
				<a href="https://www.linkedin.com/in/anovsiradj" target="_blank">LinkedIn</a>
			</div>
			<address v-text="address"></address>
			<div v-text="email_address"></div>
			<div v-text="phone_number"></div>
			<div title="Dihitung Secara Otomatis">Umur <span v-text="age">umur</span> Tahun</div>
		</div>
	</div>
</header>
</template>

<script>
module.exports = {
	data: () => {
		return {
			address: atob('Sm9namEsIFlvZ3lha2FydGEsIEluZG9uZXNpYQ=='),
			email_address: atob('YW5vdi5zaXJhZGoyMkBnbWFpbC5jb20='),
			phone_number: atob('KCs2Mik4MjEgOTgxMCAyNTI2'),
			age: (((new Date()).getFullYear()) - 1996),
		}
	},
};
</script>
