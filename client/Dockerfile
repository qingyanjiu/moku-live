FROM maven:3.5.2-jdk-8-alpine
COPY . /client
WORKDIR /client
RUN mvn package -Dmaven.test.skip=true
RUN ls target
EXPOSE 8000
CMD java -jar -Dapollo.meta=$APOLLO_URL -Denv=$ENV target/*.jar
