
# persyaratan

butuh `elasticsearch` tapi terpisah jadi pasang sendiri.

https://docs.geonetwork-opensource.org/4.4/install-guide/installing-index/


# konfigurasi

# database

ubah `C:\tools\geonetwork\app\apps\geonetwork\WEB-INF\config-node\srv.xml`
untuk atur database

```xml
<import resource="../config-db/postgres.xml"/>
```

ubah `C:\tools\geonetwork\app\apps\geonetwork\WEB-INF\config-spring-geonetwork.xml`
untuk atur schema database

```xml
<entry key="hibernate.default_schema" value="geonw"/>
```

ubah `C:\tools\geonetwork\app\apps\geonetwork\WEB-INF\config-db\jdbc.properties`
untuk atur config database

- `jdbc.host=#{systemEnvironment['GEONETWORK_DB_HOST']?:'127.0.0.1'}`
- `jdbc.port=#{systemEnvironment['GEONETWORK_DB_PORT']?:5432}`
- `jdbc.connectionProperties=#{systemEnvironment['GEONETWORK_DB_CONNECTION_PROPERTIES']?:'currentSchema=geonw'}`

ubah `C:\tools\geonetwork\app\apps\geonetwork\WEB-INF\config-db\postgres.xml`
untuk atur postgresql

# elasticsearch

ubah `C:\tools\geonetwork\app\apps\geonetwork\WEB-INF\config.properties`
untuk atur config port,username,password.

# jetty (server)
ubah `C:\tools\geonetwork\app\jetty\start.ini`
untuk atur config
- `jetty.http.host=0.0.0.0`
- `jetty.http.port=5120`

# eksekusi

```cmd
cd C:\tools\geonetwork\app\bin\

$env:geonetwork_dir="C:\tools\geonetwork\data"
$env:JAVA_OPTS="${JAVA_OPTS} -Dgeonetwork.dir=C:\tools\geonetwork\data"

$env:Path += ";C:\Program Files\Eclipse Adoptium\jdk-11.0.30.7-hotspot\bin"
$env:JAVA_HOME="C:\Program Files\Eclipse Adoptium\jdk-11.0.30.7-hotspot"

.\startup.bat
```
