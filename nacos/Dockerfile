FROM openjdk:8-alpine
COPY . /nacos
WORKDIR /nacos/target
ENV HEAP_SIZE=512m
ENV PORT=8848
EXPOSE $PORT
CMD java \
    -Xms$HEAP_SIZE \
    -Xmx$HEAP_SIZE \
    -Dnacos.standalone=true \
    -Dserver.port=$PORT \
    -jar \
    nacos-server.jar