# live-client-springboot

all services:

live-server-nginx

live-server-callback

<b>live-client-springboot</b>

live-config


*this service has spring cloud config in it, so we get configuration from config server.

*adding a env to locate a config server url as below:

docker run -d -p port:8000 -e CONFIG_SERVER_URL=YOUR_CONFIG_SERVER_URL
