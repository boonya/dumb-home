# SmartHome web application which is actually quite dumb

## OS

I am going to use Raspberry PI v3 as home server for that so, [there is an instuction](/docs/Ubuntu.md)
how to run Ubuntu server on this kind of hardware.

## Build meteor application

To run meteor application at your appliance you have to build it.
To get an instruction [follow the link](/docs/Build.md)

## NodeJS

Meteor application depends on NodeJS engine version 8. For installation execute:

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Mongo Database

Meteor application needs a database which is running on MongoDB.
So, to have it installed and running [follow the instruction](/docs/MongoDB.md).

## Install application dependencies

First you'll need to unpack your bundle:

`tar -xzvf meteor-react-js.tar.gz`

As result you got a directory called `./bundle`

To install all dependencies web application needs you have to run as usual `npm install`
from `./bundle/programs/server` directory. But some of dependecies will build from source code and
for that purpose you'll have to install packages below:

```bash
sudo apt-get update
sudo apt-get install -y \
  gcc \
  g++ \
  make
```

When it's done, just call:

`(cd bundle/programs/server && npm install)`

## NodeJS Process Manager (PM2)

PM2 Runtime is a Production Process Manager for Node.js applications with a built-in Load Balancer. It allows you to keep applications alive forever, to reload them without downtime and facilitate common Devops tasks.

To install and run [follow this](/docs/PM2.md).

## FFMPEG

If you are going to watch video streams from IP cam you will need to have ffmpeg package installed

```bash
sudo apt-get update
sudo apt-get install -y ffmpeg
```

No configuration needed

## Haproxy to forward web requests from specific port to standart one

To install latest haproxy LTS use:

```bash
sudo apt-get update
sudo apt-get install -y haproxy=1.8.\*
```

To configure it, visit this page later. This work in progress.

## Firewall

When you have haproxy configured, you need to disable ports except of standarts by using `ufw` tool.

`sudo ufw enable`

## Dependecies

- [haproxy](https://haproxy.debian.net/#?distribution=Ubuntu&release=bionic&version=1.8)
- [nodejs](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)
- [pm2 (optional)](https://pm2.io/doc/en/runtime/quick-start/#installation)
- [mongodb](https://medium.com/@mhagemann/how-to-install-mongodb-3-6-on-ubuntu-17-10-ac0bc225e648)
- [ffmpeg](https://ffmpeg.org/download.html#build-linux)
