#!/usr/bin/env bash

set -e

errorLabelColor=""
errorTextColor=""
infoLabelColor=""
infoTextColor=""
timeColor=""
resetColor=""
if [[ "$TERM" == "xterm-color" || -n "$FORCE_COLOR" ]]; then
    errorLabelColor="\e[101m"
    errorTextColor="\e[91m"
    infoLabelColor="\e[46m"
    infoTextColor="\e[36m"
    timeColor="\e[93m"
    resetColor="\e[0m"
elif [[ "$TERM" == "xterm-256color" ]]; then
    errorLabelColor="\e[48;5;202m"
    errorTextColor="\e[38;5;202m"
    infoLabelColor="\e[48;5;30m"
    infoTextColor="\e[38;5;30m"
    timeColor="\e[38;5;228m"
    resetColor="\e[0m"
fi

log() {
    if [[ -n "$NO_TIMESTAMP" ]]; then
        time=""
    else
        time=`date +"$timeColor[%H:%M:%S]$resetColor "`
    fi
    echo -e "$time$1"
}

error () {
    if [[ -z "$2" ]]; then
        log "$errorTextColor $1$resetColor"
    else
        log "$errorLabelColor$1:$resetColor $errorTextColor$2$resetColor"
    fi
}

info () {
    if [[ -z "$2" ]]; then
        log "$infoTextColor$1$resetColor$resetColor"
    else
        log "$infoLabelColor$1:$resetColor $infoTextColor$2$resetColor"
    fi
}

info "Dependencies to build up meteor application"
sudo apt-get update
sudo apt-get install -y \
  gcc \
  g++ \
  make \
  build-essential

info "Just nice stuff"
sudo apt-get update
sudo apt-get install -y \
  wget \
  curl \
  mc \
  htop \
  screen \
  vim

info "OpenVPN"
sudo apt-get install -y openvpn

info "NodeJS 8"
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

info "MongoDB 3.6"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

info "FFMPEG"
sudo apt-get update
sudo apt-get install -y ffmpeg

info "NGINX"
sudo apt-get update
sudo apt-get install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

info "Samba"
sudo apt-get update
sudo apt-get install -y samba

info "Mosquitto"
sudo apt-get update
sudo apt-get install -y mosquitto
