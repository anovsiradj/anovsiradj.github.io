## Agent Bootstraping, Context States & Context Entries.

Read and follow state in `./.agents/*.json` before execution.
Maintain current state only. Overwrite immediately if code changes (sync out-of-sync).
No history, no changelog. Keep files highly condensed.

- `./.agents/context-memories.json`
- `./.agents/context-workflows.json`
- `./.agents/context-references.json`
- `./.agents/context-definitions.json`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
create agent bootstrap context files for this project.
FYI tujuannya untuk mengurangi beban context dan mempercepat indeks context.

you must Understand this project 100%.
interogate me until you have 100% confident about what I actually want, not what I think I should want.

When in doubt, prompt it out.
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ada laporan bug dari tester.

```
SPK jenis Pasang Baru.

- Ketika check in dalam offline mode mendapat notif “Exception: Format data tidak sesuai” (namun tidak blocking) → ⛔
- Tidak dapat melakukan Scan SN dengan keterangan “Data tidak ada atau sudah digunakan!” → ⛔

catatan:
Qty yang dibutuhkan : (1 AC KF-50 & 1 AC KF-50) | 1 Indoor KF-50 | 1 Outdoor KF-50)
Laporan Stok Toko sudah ada SN di toko tersebut dengan kondisi Stok Baru jadi seharusnya dapat digunakan di SPK Pasang Baru
```
