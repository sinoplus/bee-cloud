FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER Lion Li

RUN mkdir -p /bee/system/logs \
    /bee/system/temp \
    /bee/skywalking/agent

WORKDIR /bee/system

ENV SERVER_PORT=9201

EXPOSE ${SERVER_PORT}

ADD ./target/bee-system.jar ./app.jar

ENTRYPOINT ["java", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-Dserver.port=${SERVER_PORT}", \
#            "-Dskywalking.agent.service_name=bee-system", \
#            "-javaagent:/bee/skywalking/agent/skywalking-agent.jar", \
            "-jar", "app.jar"]
