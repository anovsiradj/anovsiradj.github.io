
panduan
https://www.elastic.co/docs/deploy-manage/deploy/self-managed/install-elasticsearch-with-zip-on-windows

https://www.elastic.co/downloads/elasticsearch
download zip, lalu extract `C:\tools\elasticsearch\app`.

https://www.elastic.co/docs/deploy-manage/deploy/self-managed/configure-elasticsearch
ubah `C:\tools\elasticsearch\app\config\elasticsearch.yml`
untuk atur config berikut

```sh
cluster.name: geonw
network.host: 0.0.0.0
http.port: 5130
# xpack.security.enabled: false
# xpack.security.enrollment.enabled: false
```

```cmd
cd C:\tools\elasticsearch\app\bin\

$env:Path += ";C:\Program Files\Eclipse Adoptium\jdk-11.0.30.7-hotspot\bin"
$env:JAVA_HOME="C:\Program Files\Eclipse Adoptium\jdk-11.0.30.7-hotspot"

.\elasticsearch.bat
```
