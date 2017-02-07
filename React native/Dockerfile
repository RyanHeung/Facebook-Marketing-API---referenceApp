## BUILDING
##   (from project root directory)
##   $ docker build -t node-js-for-htc2u-facebook-marketing-api-referenceapp .
##
## RUNNING
##   $ docker run -p 3000:3000 node-js-for-htc2u-facebook-marketing-api-referenceapp
##
## CONNECTING
##   Lookup the IP of your active docker host using:
##     $ docker-machine ip $(docker-machine active)
##   Connect to the container at DOCKER_IP:3000
##     replacing DOCKER_IP for the IP of your active docker host

FROM gcr.io/stacksmith-images/minideb-buildpack:jessie-r9

MAINTAINER Bitnami <containers@bitnami.com>

ENV STACKSMITH_STACK_ID="ohk5hgs" \
    STACKSMITH_STACK_NAME="Node.js for htc2u/Facebook-Marketing-API---referenceApp" \
    STACKSMITH_STACK_PRIVATE="1"

# Install required system packages
RUN install_packages libc6 libssl1.0.0 libncurses5 libtinfo5 zlib1g libbz2-1.0 libreadline6 libstdc++6 libgcc1 ghostscript imagemagick libmysqlclient18

RUN bitnami-pkg install node-7.5.0-0 --checksum 349c41abb63045755df76ce84cc60dac1d98278f9508e4b476bc65130942ab1d

ENV PATH=/opt/bitnami/node/bin:/opt/bitnami/python/bin:$PATH \
    NODE_PATH=/opt/bitnami/node/lib/node_modules

## STACKSMITH-END: Modifications below this line will be unchanged when regenerating

# Node base template
COPY . /app
WORKDIR /app

RUN npm install

CMD ["node"]
