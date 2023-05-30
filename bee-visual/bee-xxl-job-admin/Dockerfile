FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER Lion Li

RUN mkdir -p /bee/xxl-job-admin/logs \
    /bee/skywalking/agent

WORKDIR /bee/xxl-job-admin

ENV TZ=PRC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 9900

ADD ./target/bee-xxl-job-admin.jar ./app.jar

ENTRYPOINT ["java", \
            "-Djava.security.egd=file:/dev/./urandom", \
#            "-Dskywalking.agent.service_name=bee-xxl-job-admin", \
#            "-javaagent:/bee/skywalking/agent/skywalking-agent.jar", \
            "-jar", "app.jar"]
