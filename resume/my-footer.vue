
<template>
<footer class="container-fluid">
	<div class="row text-muted">
		<div class="col-md-6">
			Font <a href="https://fonts.google.com/specimen/Ubuntu+Mono" target="_blank">Ubuntu Mono</a>.
			Tema
			<a href="https://getbootstrap.com/docs/3.3/" target="_blank">Bootstrap v3</a>
			&amp;
			<a href="https://web.archive.org/web/20171011213844/http://design.ubuntu.com/web-style-guide/" target="_blank">Ubuntu Web Style</a>
			(<a href="https://vanillaframework.io/" target="_blank">Vanilla</a>).
			<br>
		</div>
		<div class="col-md-6">
			Revisi Ke <code v-text="revision_count"></code> Kali. <br>
			Terakhir diubah <code v-text="revision_last.toTGL()"></code>. <br>
			Pertama dibuat <code v-text="revision_first.toTGL()"></code>. <br>
		</div>
	</div>
</footer>
</template>

<script>
module.exports = {
	created: function() {
		if (datastore_isa) {
			var commits = localStorage.getItem('git-resume-revision');
			if (commits === null) this.github_api_ajax();
			else this.github_api_exec(JSON.parse(commits));
		} else this.github_api_ajax();
	},
	methods: {
		github_api_exec: function(commits) {
			this.$data.revision_count = commits.length;
			this.$data.revision_last = new Date(commits[0].commit.committer.date);
			this.$data.revision_first = new Date(commits[commits.length-1].commit.committer.date);
		},
		github_api_ajax: function() {
			XHRGET('https://api.github.com/repos/anovsiradj/anovsiradj.github.io/commits?path=resume.html', commits => {
				if (datastore_isa) localStorage.setItem('git-resume-revision', JSON.stringify(commits));
				this.github_api_exec(commits);
			});
		},
	},
	data: () => {
		return {
			revision_count: 0,
			revision_last: (new Date),
			revision_first: (new Date),
		};
	},
};
</script>
