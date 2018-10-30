# live-server-nginx-edge

直播边缘服务器，用于从中心服务器拉取直播流供用户观看，可以做集群

![mokulive picture](https://raw.githubusercontent.com/qingyanjiu/live-server-nginx-edge/http-flv/mokulive.png)

整个服务包含：<br/>
1.<a href="https://github.com/qingyanjiu/live-server-nginx-edge">live-server-nginx-edge</a>(master是rtmp直播，http-flv支持http-flv媒体直播)<br/>
对应的docker镜像：<a href="https://hub.docker.com/r/alaien/live-server-nginx-edge/">alaien/live-server-nginx-edge</a><br/>
<s>2.<a href="https://github.com/qingyanjiu/live-server-callback">live-server-callback</a>(监听直播的开播停播事件，做一些数据库更新处理)<br/>
对应的docker镜像：<a href="https://hub.docker.com/r/alaien/mokulive-server-callback/">alaien/mokulive-server-callback</a><br/></s>
*callback项目已经归档废弃 callback api 已经集成到live-client项目中了<br/>
3.<a href="https://github.com/qingyanjiu/live-client-springboot">live-client-springboot</a>(基于spring-boot的直播客户端，master支持rtmp直播，http-flv支持http-flv直播)<br/>
对应的docker镜像：<a href="https://hub.docker.com/r/alaien/live-client-springboot/">alaien/live-client-springboot</a><br/>
4.<a href="https://github.com/qingyanjiu/live-config">live-config</a>(基于spring-cloud的config服务器，用于统一配置所有spring服务需要的配置文件)<br/>
对应的docker镜像：<a href="https://hub.docker.com/r/alaien/live-config/">alaien/live-config</a><br/>
5.<a href="https://github.com/qingyanjiu/live-server-nginx">live-server-nginx</a>(基于rtmp-nginx的直播源服务器，用于接收用户的推流[通过obs等软件])<br/>
对应的docker镜像：<a href="https://hub.docker.com/r/alaien/mokulive-nginxserver/">alaien/mokulive-nginxserver</a><br/>

PS: 服务端的组织方式请参考 <a href="https://github.com/qingyanjiu/mokulive-compose">mokulive-compose</a><br/>

nginx edge live server which pull stream from nginx live server
                  
             
live-server ----> (pull) edge-server1/edge-server2...  ----  Users


all services:

live-server-nginx

<s>live-server-callback</s>

live-client-springboot

live-config

<b>live-server-nginx-edge</b>

*we need to use live server callback api to sychronize live status in database

*so we added a custom ENV in dockerfile:

docker run -d -p 1935:1935 -p 8099:80 -e PULL_URL="xxx.xxx.xxx.xxx" IMAGENAME

please notice that 

1. [/] symbol need to be changed to [\\/\]

2. the url dont need to end with [/]


*关于spring config的配置变量值修改后通过rabbitmq来实现自动更新项目配置的方法请参考以下链接：<br/>
http://www.mamicode.com/info-detail-1932516.html <br/>
http://www.itmuch.com/spring-cloud/spring-cloud-bus-auto-refresh-configuration/ <br/>
