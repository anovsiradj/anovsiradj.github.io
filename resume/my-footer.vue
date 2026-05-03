<template>
<footer class="content-card text-center mt-5">
	<div class="mb-3">
		Diberdayakan oleh 
		<a href="https://github.com/" target="_blank" class="fw-semibold mx-1"><i class="bi bi-github"></i> GitHub</a>,
		<a href="https://fonts.google.com/" target="_blank" class="fw-semibold mx-1">Google Fonts</a>,
		<a href="https://getbootstrap.com/" target="_blank" class="fw-semibold mx-1"><i class="bi bi-bootstrap-fill"></i> Bootstrap</a>,
		<a href="https://lesscss.org/" target="_blank" class="fw-semibold mx-1">Less</a>,
		<a href="https://vuejs.org/" target="_blank" class="fw-semibold mx-1">Vue 3</a>.
	</div>
	<div class="small text-muted">
		Revisi Ke <code class="fw-bold bg-light bg-opacity-10 px-2 py-1 rounded" v-text="revision_count"></code> Kali.
		Terakhir diubah <code class="bg-light bg-opacity-10 px-2 py-1 rounded" v-text="revision_last.toTGL()"></code>.
		Pertama dibuat <code class="bg-light bg-opacity-10 px-2 py-1 rounded" v-text="revision_first.toTGL()"></code>.
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
