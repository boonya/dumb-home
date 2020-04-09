# SmartHome web application which is actually quite dumb

[![build](https://img.shields.io/travis/com/boonya/dumb-home)](https://travis-ci.com/boonya/dumb-home)
[![maintainability](https://img.shields.io/codeclimate/maintainability-percentage/boonya/dumb-home)](https://codeclimate.com/github/boonya/dumb-home/maintainability)
![dependencies](https://img.shields.io/david/boonya/dumb-home)

## Development

### Setup Commands

- `cd app` - to go into meteor applicaiton directory
- `meteor npm i` - to install dependencies
- `npm run lint` - to lint applicaation
- `npm run lint -- --fix` - to lint and fix all the fixable issues
- `npm run storybook` - to build and serve [Storybook](https://storybook.js.org/)
- `npm run build` - to build a static bundle
- `SUPERUSER_NAME="..." SUPERUSER_EMAIL="..." SUPERUSER_PASSWORD="..." RECORDER_FOLDER="..." RECORDER=DIR_SIZE_THRESHOLD="..." meteor` - to start dev environment
- `meteor run --production` - to start dev environment in [production like mode](https://guide.meteor.com/deployment.html#never-use-production-flag)
- `meteor mongo` - to start a minimongo shell
- `meteor shell` - to start a meteor shell
- `npm run` - to see a list of other commands

## OS

I am going to use Raspberry PI v3 as home server for that so, [there is an instuction](/docs/Ubuntu.md)
how to run Ubuntu server on this kind of hardware.

## Build meteor application

To run meteor application at your appliance you have to build it.
To get an instruction [follow the link](/docs/Build.md)

## NodeJS

Meteor application depends on NodeJS engine version 12. For installation execute:

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Mongo Database

Meteor application needs a database which is running on MongoDB.
So, to have it installed and running [follow the instruction](/docs/MongoDB.md).

## Install application dependencies

First you'll need to unpack your bundle:

`tar -xzvf app.tar.gz`

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

## Nginx to forward web requests from specific port to standart one

You'll need a proxy server to forward requests from the standard web port to specific one.
So, I recommend to install NGINX [follow the instruction](/docs/Nginx.md).

## Samba to share files on your server (optional)

[Read the doc](/docs/Samba.md)

## Firewall

When you have haproxy configured, you need to disable ports except of standarts by using `ufw` tool.

`sudo ufw enable`

Add some firewall rules to allow ssh & http connections

```bash
sudo ufw allow ssh
sudo ufw allow http
```

Also you need to add firewall rule below to allow onvif discovery process (finding of ip cameras on the local network).

`sudo ufw allow proto udp from 192.168.0.0/16`

If you have a samba server is running you’ll need to allow incoming UDP connections on ports 137 and 138 and TCP connections on ports 139 and 445. You can open the ports by enabling the ‘Samba’ profile:

`sudo ufw allow 'Samba'`

## Dependecies

- [nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04-quickstart)
- [nodejs](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)
- [pm2 (optional)](https://pm2.io/doc/en/runtime/quick-start/#installation)
- [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
- [ffmpeg](https://ffmpeg.org/download.html#build-linux)
- [samba (optional)](https://linuxize.com/post/how-to-install-and-configure-samba-on-ubuntu-18-04/)
