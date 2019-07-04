FROM maven:3.5.2-jdk-8-alpine
COPY . /mokulive
WORKDIR /mokulive
RUN mvn package -Dmaven.test.skip=true

FROM openjdk:8
COPY --from=0 /mokulive/target/*.jar .
EXPOSE 8000
CMD java -jar
-Dapollo.meta=$APOLLO_URL \
-Denv=$ENV \
-Dcustom.config.server.url=$CONFIG_SERVER_URL \
*.jar
