menurut mu, apa yang bisa dihilangkan/ditambahkan dari file json ini:
- `./.agents/context-memories.json`
- `./.agents/context-workflows.json`
- `./.agents/context-references.json`
- `./.agents/context-definitions.json`

aku merasa `context-memories.json` tidak dibutuhkan,
karena untuk pengerjaan (task,backlog,dst) berada diluar dari konteks proyek,
karena itu diurus oleh PMT (project management tool) yang terpisah dari proyek.

give honest reviews with explicit reasons,
give constructive/destructive criticisms,
give a better idea from your perspective as an agent.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

pendapatmu cukup menarik.
kalo begitu berikan pembaruan instruksi AGENTS.md.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

dari yang aku baca, instruksi di `AGENTS.md` akan langsung membuat semua json files,
yang mana jika ukuran proyek sangat besar dan banyak files akan memakan waktu lama dan menghabiskan token.

apakah bisa dibuat bertahap sesuai task, jadi bisa hemat token dan prosesnya bersifat kumulatif.

contoh prompt task:
- bikin form ubah password pada modul user.
- perbaiki bug yang terjadi di modul x karena y
- testing modul x
- cari kenapa modul y begini, seharusnya begitu.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

terakhir.

untuk format json nya, biarkan agent yang menentukan sendiri, tidak usah dibatasi.
toh setiap proyek/aplikasi kebutuhannya aku yakin akan berbeda2.

json tidak perlu human readable, yang penting bisa dipahami semua agent secara universal.

yang penting work loop nya jelas untuk memanajemen files json itu:
- create
- update
- adjust
- repeat

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

setelah aku coba langsung pada suatu existing proyek,
ada beberapa hal yang belum sesuai dan belum dicatat.

(contoh1) proyek pakai library bootstrap-icons,
tapi entah kenapa agent tidak mengecek itu,
malah halusinasi pakai library Material Design Icons.

(contoh2) aku minta agent bikin skrip js untuk handle form,
pada proyek dengan framework laravel yang pakai vite.
di layout blade sudah jelas pakai `@vite(...)` yang akan generate `<script type="module" src="...">`,
karena harus pakai jquery tanpa tau kalo harus pakai `<script type="module">`,
jadi dia halusinasi pakai polling untuk cek jquery sudah ada ada atau belum dengan `<script>`.

apakah `AGENTS.md` perlu disesuaikan:
- supaya tidak terlalu ketat yang melarang agent untuk tidak cek keseluruhan proyek?
- supaya punya kebebasan untuk ngecek keseluruhan atau tidak.
- sepertinya perlu ada instruksi supaya mengurangi halusinasi
- sepertinya perlu ada kebebasan agent untuk bertanya

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

tidak perlu ada izin tertulis, terserah agent sesuka hari mau cek atau tidak, berikan mereka kebebasan (free will).

untuk kalimat instruksi ini menurutku terlalu specific menyebutkan vite/jquery, dibuat lebih generic/general saja `(e.g., verifying if Vite is used, checking the specific icon library, or how jQuery is injected)`.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
