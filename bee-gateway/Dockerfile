FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER Lion Li

RUN mkdir -p /bee/gateway/logs  \
    /bee/gateway/temp  \
    /bee/skywalking/agent

WORKDIR /bee/gateway

ENV SERVER_PORT=8080

EXPOSE ${SERVER_PORT}

ADD ./target/bee-gateway.jar ./app.jar

ENTRYPOINT ["java", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-Dserver.port=${SERVER_PORT}", \
#            "-Dskywalking.agent.service_name=bee-gateway", \
#            "-javaagent:/bee/skywalking/agent/skywalking-agent.jar", \
            "-jar", "app.jar"]
