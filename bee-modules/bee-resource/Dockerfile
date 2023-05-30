FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER Lion Li

RUN mkdir -p /bee/resource/logs \
    /bee/resource/temp \
    /bee/skywalking/agent

WORKDIR /bee/resource

ENV SERVER_PORT=9204

EXPOSE ${SERVER_PORT}

ADD ./target/bee-resource.jar ./app.jar

ENTRYPOINT ["java", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-Dserver.port=${SERVER_PORT}", \
#            "-Dskywalking.agent.service_name=bee-resource", \
#            "-javaagent:/bee/skywalking/agent/skywalking-agent.jar", \
            "-jar", "app.jar"]
