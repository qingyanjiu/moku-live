# live-server-nginx
nginx live server for pushing stream

all services:

<b>live-server-nginx</b>

live-server-callback

live-client-springboot

live-config

*we need to use live server callback api to sychronize live status in database

*so we added a custom ENV in dockerfile:

docker run -d -p 1935:1935 -p 8099:80 -e CALLBACK_URL="http:\/\/localhost:8000" IMAGENAME

please notice that 

1. [/] symbol need to be changed to [\\/\]

2. the url dont need to end with [/]

3. url only support http so far
