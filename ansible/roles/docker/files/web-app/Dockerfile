# TODO: Compare this line with .nvmrc, "engines" section from package.json and .meteor/local/build/.node_version.txt
FROM node:12.16.1-alpine

RUN apk add tzdata python make g++ ffmpeg
RUN npm install -g pm2

# TODO: Downloading from github artifactory if no local file.
COPY dumb-home.tar.gz dumb-home.tar.gz
COPY pm2.yml pm2.yml
RUN tar -xzvf dumb-home.tar.gz
RUN rm dumb-home.tar.gz

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN (cd bundle/programs/server && npm install)

CMD ["pm2-runtime", "start", "pm2.yml"]
