FROM alpine:latest

ARG PB_VERSION=0.16.6

RUN apk add --no-cache \
    unzip \
    openssh

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY pb_data/* /pb/pb_data/

VOLUME /pb/pb_data/

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
