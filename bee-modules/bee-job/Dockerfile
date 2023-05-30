FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER Lion Li

RUN mkdir -p /bee/job/logs \
    /bee/job/temp \
    /bee/skywalking/agent

WORKDIR /bee/job

ENV SERVER_PORT=9203

EXPOSE ${SERVER_PORT}

ADD ./target/bee-job.jar ./app.jar

ENTRYPOINT ["java", \
            "-Djava.security.egd=file:/dev/./urandom", \
            "-Dserver.port=${SERVER_PORT}", \
#            "-Dskywalking.agent.service_name=bee-job", \
#            "-javaagent:/bee/skywalking/agent/skywalking-agent.jar", \
            "-jar", "app.jar"]
