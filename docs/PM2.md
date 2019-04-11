# NodeJS Process Manager (PM2)

PM2 Runtime is a Production Process Manager for Node.js applications with a built-in Load Balancer. It allows you to keep applications alive forever, to reload them without downtime and facilitate common Devops tasks.

## Installation

`sudo npm install pm2 -g`

## Run the application

First you have to copy _application configuration file_ to your appliance:

`scp ./pm2-config.yml your-appliance:`

Make sure that this file contains all instruction that you need.

To start up the application run command below on your appliance:

`sudo pm2 start ./pm2-config.yml`

## Autostart

Add pm2 service to system autostart:

`sudo pm2 startup`

## Status

If you want to see logs you may execute:

`pm2 logs DumbHome` or `pm2 logs -f DumbHome`

To see just current status pm2 deamon run:

`pm2 status`
