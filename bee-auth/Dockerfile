FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER Lion Li

RUN mkdir -p /bee/auth/logs  \
    /bee/auth/temp  \
    /bee/skywalking/agent

WORKDIR /bee/auth

ENV SERVER_PORT=9210

EXPOSE ${SERVER_PORT}

ADD ./target/bee-auth.jar ./app.jar

ENTRYPOINT ["java", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-Dserver.port=${SERVER_PORT}", \
#            "-Dskywalking.agent.service_name=bee-auth", \
#            "-javaagent:/bee/skywalking/agent/skywalking-agent.jar", \
            "-jar", "app.jar"]
