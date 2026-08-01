untuk masalah fungsi yang ada di php 8 ke atas tapi gak ada di php 7.4,
sudah diakomodir oleh `symfony/polyfill-php*` tapi tidak jadi dependency package ini,
biar user yg install sendiri, sengaja aku bikin begitu.

untuk `passing array to CURLOPT_POSTFIELDS triggers multipart/form-data internally`
aku cek aman aja sih gak pakai `http_build_query`,
bisa dibukti lewat cli `php7 .\tests\curl\post.php`.

untuk `stderr` biarin gitu aja.

untuk `exec()` yang tidak return sengaja aku bikin begitu.
untuk `data()` supaya bisa transform outputnya.

untuk line 179, biar `$stdout` bisa ada pemisah log nya, karena sudah concat bukannya akan jadi string walaupun null?

untuk penamaan `TYPE_URLE` memang sengaja, biar 4 huruf (karena aku OCD).

untuk method lainnya (PUT/PATCH/DELETE) aku setuju, bisa jadi fitur baru.

untuk `data() only auto-decodes JSON`, tapi kan kalo jadi XML/HTML kan bagi PHP pada dasarnya string? beda kalo json, bisa jadi array.

untuk `$handle` bisa null, aku setuju.

ini respon ku, coba kamu pelajari.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Fix str_starts_with (show-stopper for PHP 7.4 users).
2. Fix url() empty ? — guard http_build_query with a check for empty $params.
3. Fix post() + array URL-encoded — call http_build_query($params) for TYPE_URLE.
4. Reset resHeaders at the top of exec().
5. Add basic error handling (curl_error/curl_errno) after curl_exec.
6. Rename stderr method to avoid collision with property/parameter.
7. Drop the 3-blank-line append in $stdout write (or make it configurable).
8. Add setMethod('PUT') / method('DELETE') shortcuts.
9. Un-deprecate or properly replace multipart().

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

untuk `resHeaders gak pernah di-reset` memang sengaja,
kalo mau ubah headers bisa clear manual atau bikin instance baru,
bisa dibilang 1 instance adalah 1 session.

btw untuk `multipart()` aku sendiri masih bingung,
kalo kamu cek cli `php7 .\tests\curl\upload.php`,
upload bisa berhasil tanpa perlu set jadi `TYPE_MPFD`,
mungkin karena ada CURLFile otomatis autoset jadi `multipart/form-data`.
btw aku baru tau ada hal ini `well-known PHP curl quirk: multipart/form-data`,
info yg menarik, perlu didokumentasikan di brains, terutama yang ngefek ke lib CURL ini.

btw tujuan lib CURL ini dibikin adalah untuk debug API secara programmatically.

barusan aku kepikiran, bikin fungsi baru `file()` untuk generate `CURLFile`.

ini respon ku, coba kamu pelajari.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

untuk fungsi `file()` harusnya gak hanya sekedar wrapper.
tapi juga autoset $mime/$postname dengan deteksi dari file path nya.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

aku melakukan penyesuaian dari garapan mu, ada beberapa rename dan adjust.

untuk `$fileMimes` sengaja publik biar user custom.
aku bikin fungsi `nonHtmlFormMethod()` biar gak redundant.

coba kamu pelajari.
