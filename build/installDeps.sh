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

info "Samba"
sudo apt-get update
sudo apt-get install -y samba
