## BUILDING
##   (from project root directory)
##   $ docker build -t jetty-for-htc2u-facebook-marketing-api-referenceapp .
##
## RUNNING
##   $ docker run -p 8080:8080 jetty-for-htc2u-facebook-marketing-api-referenceapp
##
## CONNECTING
##   Lookup the IP of your active docker host using:
##     $ docker-machine ip $(docker-machine active)
##   Connect to the container at DOCKER_IP:8080
##     replacing DOCKER_IP for the IP of your active docker host

FROM gcr.io/stacksmith-images/minideb-buildpack:jessie-r9

MAINTAINER Bitnami <containers@bitnami.com>

ENV STACKSMITH_STACK_ID="x6z0r7c" \
    STACKSMITH_STACK_NAME="Jetty for htc2u/Facebook-Marketing-API---referenceApp" \
    STACKSMITH_STACK_PRIVATE="1"

# Install required system packages
RUN install_packages libc6 libxext6 libx11-6 libxcb1 libxau6 libxdmcp6 libglib2.0-0 libfreetype6 libfontconfig1 libstdc++6 libgcc1 zlib1g libselinux1 libpng12-0 libexpat1 libffi6 libpcre3 libxml2 liblzma5

RUN bitnami-pkg install java-1.8.0_121-0 --checksum 2743f753fd1ea88bf90352d95694f89ab0a0fb855cf0d1c7b2a6d92835f9ad27
RUN bitnami-pkg install jetty-9.3.14.v20161028-1 --checksum 02066e043461c91d62fcf7c85b248c5416c775ad2f094b0f0ffea84996c85170

ENV PATH=/opt/bitnami/java/bin:$PATH \
    JAVA_HOME=/opt/bitnami/java \
    JETTY_BASE=/opt/bitnami/jetty

## STACKSMITH-END: Modifications below this line will be unchanged when regenerating

# Jetty server template
RUN ln -s $JETTY_BASE/webapps /app
WORKDIR /app
COPY . /app

EXPOSE 8080
CMD ["nami", "start", "--foreground", "jetty"]
