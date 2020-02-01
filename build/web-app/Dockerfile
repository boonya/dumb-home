FROM node:12.14.1-alpine

RUN apk add python make g++ ffmpeg
RUN npm install pm2 -g

COPY app.tar.gz app.tar.gz
COPY pm2.yml pm2.yml
RUN tar -xzvf app.tar.gz
RUN rm app.tar.gz

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN (cd bundle/programs/server && npm install)

CMD ["pm2-runtime", "start", "pm2.yml"]
