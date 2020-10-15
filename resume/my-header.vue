
<template>
<header class="container-fluid mg-b-20">
	<div class="row pd-t-20">
		<div class="header-title col-md-6 text-xs-center text-md-left">
			<h1 title="Anov Siradj">
				<span class="btn-warning text-info">Mayendra Costanov</span>
			</h1>
		</div>
		<div class="header-info col-md-6 text-xs-center text-md-right">
			<br class="hidden-lg hidden-md"/>
			<div>Jogja, Yogyakarta, Indonesia</div>
			<div v-text="email_address"></div>
			<div v-text="phone_number"></div>
			<div title="Dihitung Secara Otomatis">Umur <span v-text="age"></span> Tahun</div>

			<div>
				<a href="https://ne-a-r.blogspot.com" target="_blank">WebLog</a>
			</div>
		</div>
	</div>
</header>
</template>

<script>
module.exports = {
	data: () => {
		return {
			email_address: atob('YW5vdi5zaXJhZGoyMkBnbWFpbC5jb20='),
			phone_number: ['2526', '9810' , '(+62)821'].reverse().join(' '),
			age: (((new Date()).getFullYear()) - 1996),
		}
	},
};
</script>
