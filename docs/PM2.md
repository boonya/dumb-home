# NodeJS Process Manager (PM2)

PM2 Runtime is a Production Process Manager for Node.js applications with a built-in Load Balancer. It allows you to keep applications alive forever, to reload them without downtime and facilitate common Devops tasks.

## Installation

`sudo npm install pm2 -g`

## Run the application

First you have to copy _application configuration file_ to your appliance:

`scp ./build/pm2.yml your-appliance:`

Make sure that this file contains all instruction that you need.

To start up the application run command below on your appliance:

`sudo pm2 start pm2.yml`

But if you want to create a superuser you must prepend commant above by appropriate env. vars. Like so:

`SUPERUSER_NAME="username" SUPERUSER_EMAIL="email@email" SUPERUSER_PASSWORD="password" sudo pm2 start pm2.yml`

## Autostart

Add pm2 service to system autostart:

`sudo pm2 startup`

## Status

If you want to see logs you may execute:

`pm2 logs dumb-home` or `pm2 logs -f dumb-home`

To see just current status pm2 deamon run:

`pm2 status`
