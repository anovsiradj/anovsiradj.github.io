bantu bikin CLI `config.py` yang digunakan untuk eksekusi `config.json` untuk management proyek ini.

untuk actions di CLI nya ada:
- create, untuk melakukan clone `source.link` kalo belum ada.
- update, untuk melakukan update `source.link` ke latest.
- delete, kalo di `./tmp/` gak ada, skip.

ketika melakukan action update tapi belum ada, route ke action create.
ketika melakukan action create tapi sudah ada, route ke action update.

untuk format item di config `sources.*.*` dan `others.*.*` sama plek,
bedanya di item ada `others.*.skills`, untuk penjelasannya nanti saja.

untuk dignature item di others/sources:
- property result, default `folder`.
- property type, default `git`.
- property branch, default `trunk`.
- property name, default pakai "basename" dari property link.

setiap item di others/sources kamu clone ke `./tmp/`, dengan cara:
- perintah clone pakai `git clone --branch <branch_name> --depth 1 --single-branch <repository_url>`
- perintah update pakai `git fetch --depth 1 origin <branch_name>` lalu `git pull origin <branch_name>`
- untuk nama folder reponya nya, gunakan property `item.name`.

sebelum kamu eksekusi, kita diskusikan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ada beberapa penyesuaian dariku.
untuk basename, use as-is `os.path.basename(item.link)`.
untuk create/update bisa filter sources/others, default semua.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
kalo cli di eksekusi tanpa args, munculin usage/manpage sebagai panduan cara pakai script.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
untuk `type:git` supaya bisa di tracking,
setiap eksekusi action create/update, untuk selalu set `item.commit` di json.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
karena sudah ada `item.commit`, untuk action create perlu disesuaikan.
untuk handle commit tidak ketemu, langsung default HEAD (latest).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
aku ubah property others di config.json jadi agents,
bantu adjust config.py.

bantu realisasi `agents.*.skills`.
property item `agent.skills` berisi array yang setiap item ada input yang perlu di copy-paste dari `./tmp/{name}/{input}` ke `./{output}`.
