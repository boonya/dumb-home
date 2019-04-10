# SmartHome web application which is actually quite dumb

## OS

I am going to use Raspberry PI v3 as home server for that so, [there is an instuction
how to run Ubuntu server on this kind of hardware](/docs/Ubuntu.md).

## Software

[This is an instruction how to prepare softwarte we need.](/docs/Preparation.md)

## Run meteor-react-js application

```bash
cd bundle
cd programs/server && npm install)
export MONGO_URL='mongodb://meteor:password@localhost:27017/DumbHome'
export ROOT_URL='http://example.com'
node main.js
```

Dependecies:

- [haproxy](https://haproxy.debian.net/#?distribution=Ubuntu&release=bionic&version=1.8)
- [nodejs](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)
- [pm2 (optional)](https://pm2.io/doc/en/runtime/quick-start/#installation)
- [mongodb](https://medium.com/@mhagemann/how-to-install-mongodb-3-6-on-ubuntu-17-10-ac0bc225e648)
- [ffmpeg](https://ffmpeg.org/download.html#build-linux)
