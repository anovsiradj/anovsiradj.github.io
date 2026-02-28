Buat game Android sederhana bergenre top-down action dungeon crawler dengan kontrol joystik. Pemain mengendalikan karakter yang bisa bergerak bebas di dalam dungeon (ruangan terbatas), menyerang musuh, dan memiliki health bar. Game ini adalah MVP (Minimum Viable Product) dengan fitur dasar: gerakan, satu jenis musuh, sistem serangan, collision, dan UI sederhana.

## Teknologi yang Digunakan
- Flutter (latest stable)
- Flame engine (latest) sebagai game engine
- Paket tambahan:
  - `flame_tiled` untuk mendukung map dari Tiled (opsional, jika ingin pakai tilemap)
  - `flame_joystick` untuk joystick virtual
  - `flame_forge2d` jika ingin menggunakan physics (tidak diperlukan untuk MVP sederhana, cukup collision manual)
- State management: sederhana, cukup menggunakan `ChangeNotifier` atau `ValueNotifier` jika diperlukan, atau langsung di dalam komponen Flame.

## Fitur MVP yang Harus Diimplementasikan
1. **Layar Game** dengan ukuran tetap (misal 800x600) atau fullscreen dengan rasio aspek tertentu.
2. **Karakter Pemain**:
   - Dapat digerakkan menggunakan joystick virtual di kiri bawah layar.
   - Memiliki kecepatan gerak konstan.
   - Memiliki area collision berbentuk lingkaran atau persegi.
   - Animasi sederhana (misal: satu sprite idle, satu sprite bergerak). Untuk MVP, bisa gunakan warna atau bentuk saja.
3. **Joystick**:
   - Komponen joystick yang sudah tersedia di `flame_joystick` atau buat manual dengan mendeteksi sentuhan.
   - Output berupa arah dan kekuatan (normalisasi vektor).
4. **Musuh Sederhana**:
   - Satu musuh di dalam ruangan.
   - Bergerak secara random atau diam di tempat.
   - Memiliki area collision.
   - Jika terkena serangan pemain, musuh akan hilang (atau health berkurang, untuk MVP langsung hilang saja).
5. **Sistem Serangan**:
   - Tombol serang di kanan bawah layar.
   - Ketika ditekan, pemain menghasilkan area serangan (misal: lingkaran di depan karakter) yang aktif dalam waktu singkat.
   - Jika area serangan bertabrakan dengan musuh, musuh mati.
   - Cooldown serangan (misal 0.5 detik) agar tidak spam.
6. **Health Pemain**:
   - Pemain memiliki 3 nyawa.
   - Jika musuh menyentuh pemain, health berkurang 1 dan pemain menjadi tidak terkalahkan sementara (invincibility frames) selama 1 detik.
   - Jika health habis, game over dan kembali ke menu utama (atau tampilkan layar game over).
7. **Tilemap / Dinding**:
   - Ruangan dungeon dibatasi oleh dinding yang tidak bisa ditembus.
   - Bisa menggunakan tilemap sederhana (grid 10x10) dengan Tilemap dari Flame, atau buat manual dengan daftar persegi panjang sebagai dinding.
   - Implementasi collision dengan dinding menggunakan `CollisionDetection` dari Flame (misal menggunakan `CollisionBox`).
8. **UI Sederhana**:
   - Tampilkan health pemain (3 hati atau angka).
   - Tombol serang dan joystick (sudah termasuk).
   - Game over overlay dengan tombol "Restart" dan "Menu".
9. **Manajemen Scene**:
   - Gunakan `FlameGame` dengan sistem komponen.
   - Pisahkan scene: `MainMenu`, `Game`, `GameOver`.

## Detail Implementasi yang Disarankan
- **Game Loop**: Override method `update(double dt)` di `MyGame` untuk memperbarui posisi komponen, deteksi collision, dll.
- **Collision Detection**:
  - Gunakan `CollisionDetection` mixin pada game dan komponen yang ingin dideteksi.
  - Setiap komponen yang memiliki collision harus mengimplementasikan `CollisionCallbacks` dan mendefinisikan `shape` (misal `CircleHitbox` atau `RectangleHitbox`).
  - Contoh: `PlayerComponent` memiliki `CircleHitbox()`, `EnemyComponent` juga, `WallComponent` memiliki `RectangleHitbox()`.
- **Input**:
  - Joystick: Bisa pakai `JoystickComponent` dari `flame_joystick`. Letakkan di game dengan posisi kiri bawah.
  - Tombol serang: Buat `AttackButtonComponent` yang merupakan `SpriteComponent` dengan `TapCallbacks`. Ketika ditekan, aktifkan serangan.
- **Serangan**:
  - Buat `AttackComponent` yang muncul selama beberapa frame. Posisinya di depan pemain (berdasarkan arah terakhir).
  - Tambahkan hitbox pada `AttackComponent`. Jika ada tabrakan dengan musuh, musuh dihapus.
- **Invincibility Frames**:
  - Di `PlayerComponent`, tambahkan variabel `bool isInvincible` dan `double invincibleTimer`.
  - Saat terkena musuh, set `isInvincible = true` dan `invincibleTimer = 1.0`. Kurangi timer setiap update. Jika timer <= 0, set false.
  - Selama invincible, pemain tidak bisa terkena damage lagi (bisa juga efek visual, misal berkedip).
- **Tilemap** (opsional):
  - Jika menggunakan `flame_tiled`, buat map sederhana di Tiled (format .tmx) dengan layer tile dan object collision.
  - Load map di game, ambil tile layers, dan buat komponen tile. Untuk collision, ambil object layers dan buat `WallComponent` dari tiap objek.

## Langkah Pengujian
- Pastikan game dapat dijalankan di emulator Android atau perangkat fisik.
- Tes gerakan joystick: karakter bergerak sesuai arah.
- Tes collision dengan dinding: karakter tidak bisa menembus dinding.
- Tes serangan: ketika menekan tombol serang, musuh di dekat pemain akan mati.
- Tes damage: jika karakter menyentuh musuh, health berkurang dan karakter kebal sementara.
- Tes game over: jika health habis, tampilkan layar game over.

## Catatan Tambahan
- Untuk aset sementara, gunakan shape/ warna: misal pemain berupa lingkaran biru, musuh lingkaran merah, dinding persegi abu-abu.
- Jangan terlalu kompleks di MVP, fokus pada gameplay loop yang berfungsi.
- Gunakan `FlameGame` dengan `world` dan `camera` untuk mengatur tampilan.
