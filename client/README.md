# live-client-springboot

all services:

live-server-nginx

live-server-callback

<b>live-client-springboot</b>

live-config


*this service has spring cloud config in it, so we get configuration from config server.

http-flv-apollo是对应的apollo配置中心，启动时需要配置以下参数：apollo.meta=http://106.75.249.249:8080 env=dev

*adding a env to locate a config server url as below:

docker run -d -p port:8000 -e APOLLO_URL=http://106.75.249.249:8080 -e ENV=dev IMAGENAME


又改为支持springcloud的config-server
启动时添加参数
-Dcustom.config.server.url=http://你的配置服务器地址:端口

docker启动时

docker run -d -p port:8000 -e CONFIG_SERVER_URL=http://你的配置服务器地址:端口 IMAGENAME
