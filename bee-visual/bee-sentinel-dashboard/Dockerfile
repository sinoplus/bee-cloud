FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER Lion Li

RUN mkdir -p /bee/sentinel-dashboard/logs \
    /bee/skywalking/agent

WORKDIR /bee/sentinel-dashboard

EXPOSE 8718

ADD ./target/bee-sentinel-dashboard.jar ./app.jar

ENTRYPOINT ["java", \
            "-Djava.security.egd=file:/dev/./urandom", \
#            "-Dskywalking.agent.service_name=bee-sentinel-dashboard", \
#            "-javaagent:/bee/skywalking/agent/skywalking-agent.jar", \
            "-jar", "app.jar"]
