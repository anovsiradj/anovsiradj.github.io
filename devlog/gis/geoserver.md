
unduh java, disarankan https://winget.run/pkg/AdoptOpenJDK

unduh "Platform Independent Binary" dari https://geoserver.org/release/stable/

ekstrak arsip, contoh: "D:/geoserver/geoserver-2.23.0-bin".

bikin folder baru untuk simpan data dari geoserver, contoh: "D:/geoserver/data".

ganti port server dengan ubah file "D:/geoserver/geoserver-2.23.0-bin/start.ini" baris "jetty.http.port=8080" menjadi "jetty.http.port=1100"

tambah env var windows dengan key "GEOSERVER_HOME" dan val "D:/geoserver/geoserver-2.23.0-bin".

tambah env var windows dengan key "GEOSERVER_DATA_DIR" dan val "D:/geoserver/data".

- `jetty.http.port=5110`

```cmd
cd C:\programs\geoserver\app\bin\

$env:GEOSERVER_HOME="C:/programs/geoserver/app"
$env:GEOSERVER_DATA_DIR="C:/programs/geoserver/data"
$env:JAVA_HOME="C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot"

./startup.bat
```

unduh ekstensi yang dibutuhkan dari https://geoserver.org/release/stable/. kalo saya butuhnya [mysql,gpkg]. lalu ekstrak ke "D:/geoserver/geoserver-2.23.0-bin\webapps\geoserver\WEB-INF\lib" dan restart geoserver.

mengaktifkan CORS, buka "D:\geoserver\geoserver-2.26.2-bin\webapps\geoserver\WEB-INF\web.xml" lalu diubah dibagian tomcat atau jetty.

buka cmd, lalu cd ke "D:/geoserver/geoserver-2.23.0-bin/bin" lalu, exec "startup.bat" lalu tunggi ~1 menit (sampai proses init selesai, menghindari race-cond)

buka "http://localhost:1100/geoserver" kemudian login dengan default account "admin/geoserver". jangan lupa ganti supaya tidak muncul warning terus.

kalo tempat kalian muncul error:

https://docs.geoserver.org/stable/en/user/production/java.html?highlight=java%20considerations#running-on-java-17-experimental
ubah file "marlin-0.9.3.jar" jadi "marlin-0.9.3.jar.tmp" yang berada di "D:/geoserver/geoserver-2.23.0-bin\webapps\geoserver\WEB-INF\lib"

selesai.
