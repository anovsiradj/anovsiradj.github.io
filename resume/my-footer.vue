<template>
	<footer class="content-card text-center mt-5">
		<div class="mb-3">
			Diberdayakan oleh
			<template v-for="(credit, idx) in footerData.credits" :key="credit.label">
				<a :href="credit.url" target="_blank" class="fw-semibold mx-1">
					<i v-if="credit.icon" :class="credit.icon"></i>
					{{ credit.label }}
				</a><span v-if="idx < footerData.credits.length - 1">, </span>
			</template>.
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
	data: () => ({
		footerData: { credits: [], github_api_url: '', cache_key: 'git-resume-revision' },
		revision_count: 0,
		revision_last: new Date(),
		revision_first: new Date()
	}),
	created() {
		const db = window.ResumeDB;
		this.footerData = db.getFooter();
		if (datastore_isa) {
			var commits = localStorage.getItem(this.footerData.cache_key);
			if (commits === null) this.github_api_ajax();
			else this.github_api_exec(JSON.parse(commits));
		} else this.github_api_ajax();
	},
	methods: {
		github_api_exec(commits) {
			this.revision_count = commits.length;
			this.revision_last = new Date(commits[0].commit.committer.date);
			this.revision_first = new Date(commits[commits.length - 1].commit.committer.date);
		},
		github_api_ajax() {
			XHRGET(this.footerData.github_api_url, commits => {
				if (datastore_isa) localStorage.setItem(this.footerData.cache_key, JSON.stringify(commits));
				this.github_api_exec(commits);
			});
		}
	}
};
</script>
