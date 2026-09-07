
```sh
# mkdir flutter_skit

flutter create --template=package flutter_skit
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bantu aku untuk bikin kurasi/koleksi fungsi,widget,class,dst dari proyek yg sudah pernah aku kerjakan.

tujuannya:
- sebagai standard library package pribadi
- tidak perlu copas2 lalu cari2 di proyek mana fungsi terbaru/terupdate.
- konsistensi

package yg aku buat ku beri nama `flutter_skit` (simple kit).

proyek yg pernah aku kerjakan:
- `C:\works\tmp\kt_ifm_gtid_mob`
- `C:\works\tmp\mobapp_jdih_diy`
- `C:\works\tmp\simlpu_mob`
- `C:\works\tmp\stm_portal_mob`

paparkan kepada ku planning yg akan kamu lakukan,
catat dan simpan ke `.agents/plans/001.md`,
jangan eksekusi dulu, akan aku tinjau dulu, lalu kita diskusikan lagi.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

tambahan untuk proyek yg pernah aku kerjakan:
- `C:\works\tmp\jogjaprov_pamor_mob_masyarakat`
- `C:\works\tmp\jogjaprov_pamor_mob_responder`
- `C:\works\tmp\webview_dart`
- `C:\works\tmp\flutter-kitchen-sink`

lakukan audit ulang dan perbarui planning.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

untuk `Naming` tentu saja pakai skit.

untuk "hidden dep velvet_support" kalo bisa dihilangkan atau recreate from scratch, dipertahankan juga gak masalah.

untuk "Kontradiksi pubspec flutter_skit" pake current latest.

untuk "AUTOMATIC EXCLUDE per rule (no entry)", kalo itu berguna entah sekarang atau kedepannya, include aja.

untuk masalah state management, kalo bisa gausah disertakan kecuali builtin flutter.
tapi kalo bisa dibikin standalone/builtin tanpa getx/provider/etc, lebih bagus.

untuk masalah backend convertion, dibikin supaya bisa configurable,
seperti default headers atau default params atau dst supaya bisa akomodir method spoofing untuk backend API seperti laravel/dst.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

untuk finalisasi, lakukan audit ulang dengan evaluasi dan validasi semua projects.
pastikan tidak ada yg terlewat dan terlupakan, semuanya aku percayakan padamu.

hal penting yg perlu kamu catat di planning,
untuk setiap class/function/etc di kurasi harus mencantumkan komentar:
- origin: sumber project, sumber file
- author: tentu saja adalah aku "anovsiradj" atau kamu bisa cek commit nya dan tambahkan dirimu (model+provider) sebagai author juga.
- version: tanggal dibuat dan/atau tanggal revisi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bagus.

setelah aku tinjau, ada beberapa catatan dariku.

untuk author placeholder "model+provider" belum diganti,
harusnya diganti dengan kamu sebagai AI Assistant.

untuk dependencies dan dev_dependencies,
aku gak mau pinned version, harus selalu `>={version}`.
dengan asumsi packages tidak akan terjadi breaking-changes.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ketika menjalankan `fvm flutter pub publish --dry-run`,
flutter komplain bahwa semua dependencies dan dev_dependencies harus ada upper bound. 

untuk akomodir itu, aku menetapkan:
- untuk semua upper bound adalah major+2.
- jika versi major masih 0, berarti upper bound nya adalah `1.0.0`.

ubah semua upper bound jadi major+3.

ada beberapa hal yang harus kamu ingat di brain:
- versi package ini pakai `Y.m.d+build`.
- tentang komen origin,author,version.
