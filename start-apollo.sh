#bash -c /root/apollo-adminservice/scripts/startup.sh && bash -c /root/apollo-configservice/scripts/startup.sh
docker run -d -p 8090:8090 apollo-adminserver
docker run -d -p 8080:8080 apollo-configserver
