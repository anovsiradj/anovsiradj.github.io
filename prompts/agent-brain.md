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

setelah aku pikir2, perlu ada beberapa penyesuaian.

ubah struktur dari `.agents/context-*.md` jadi `.agents/brains/*.md`,
sehingga lingkupnya hanya di satu tempat, yaitu didalam folder `.agents/brains/`.

aku gak nyangka isi AGENTS.md akan sebanyak itu, tapi gak masalah sih.
gimana kalo bikin file khusus yang terpisah dari AGENTS.md dengan nama BRAINS.md.
yang mana dari AGENTS.md untuk menginstruksikan selalu cek BRAINS.md.
dengan demikian tidak masalah isi dari BRAINS.md banyak atau tidak dan instruksinya bisa lebih lengkap karena terpisah dari AGENTS.md.

gimana menurut mu?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
untuk agent beri laporan singkat apa yang dicatat, menurutku tidak perlu.
karena tujuannya dari BRAINS.md adalah untuk agent itu sendiri, bukan untuk orangnya.

coba aku simpulkan:
- 5W1H
- tidak ada versioning atau chhangelog, harus selalu kondisi saat ini
- bisa lintas agent
- sebagai static context, static memory, knowledge, dst.
- iterasi dan workloop sudah sangat jelas
- bukan untuk manusia tapi untuk agent

menurutmu apa yang bisa ditambahkan pada BRAINS.md supaya bisa sepurna.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
aku ada adjutsment untuk BRAINS.md dan AGENTS.md
- path spesifik untuk BRAINS.md
- 80 jadi hundreds, supaya relative.

aku ada keluhan setelah aku coba dibeberapa projects dan beberapa agents.

beberapa agents menganggap kalo batasan .md files itu untuk semua .md.
jadi mereka salah tangkap, karena seharusnya batasan itu khusus .md files punya brains.

agents masih sering tidak simpan knowledges di `.agents/brains/*`,
jadi kadang aku harus manual minta secara dibuatkan,
padahal itu seharusnya mereka otomatis bikin sendiri.
ketika scanning/browsing/indexing source code.

sebelum kamu kasih aku adjustment BRAINS.md dan AGENTS.md,
kita diskusikan dulu, supaya konsep static context benar2 universal.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

untuk:
- `Directory Scope Isolation`
- `Explicit Scope Boundary`

aku setuju untuk itu, jadi aturan untuk brains hanya digunakan untuk brains.

untuk `Write-On-Discovery` ini bagus, menjadikan itu task nyata.

aku coba dulu penyesuaian darimu,
berikan BRAINS.md dan AGENTS.md terbaru yg lengkap.