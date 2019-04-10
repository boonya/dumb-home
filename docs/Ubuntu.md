# Ubuntu server 18.04 arm64

## Run Ubuntu on Raspberry PI 3

Download official Ubuntu 18.04.02 arm64 server image from resource [http://cdimage.ubuntu.com/ubuntu/releases/bionic/release/](http://cdimage.ubuntu.com/ubuntu/releases/bionic/release/)
or directly using [this link](http://cdimage.ubuntu.com/ubuntu/releases/bionic/release/ubuntu-18.04.2-preinstalled-server-arm64+raspi3.img.xz)

You can write an image to SD card using [balena etcher](https://www.balena.io/etcher/).

## Connect to your little server

Connect to you raspi with ubuntu server on board using predefined ubuntu user like so:

```ssh ubuntu@IP```

password is `ubuntu` also.

## Change hostname permanently (optional)

Execute next to set new hostname:
```sudo hostnamectl set-hostname {your-new-hostname}```

Run to recheck:
```hostnamectl```

Reboot:
```sudo reboot```

SRC:
- https://www.cyberciti.biz/faq/ubuntu-18-04-lts-change-hostname-permanently/

## Change Prompt (optional)

Open:
```vim ~/.bashrc```

Replace all occurrences of `\h` to `\H`

## Locale (optional)

```sudo dpkg-reconfigure locales```

## Create your own sudo user

```sudo adduser {username}```

```sudo usermod -aG sudo {username}```

```su - {username}```

```mkdir ~/.ssh```

```echo "{your-public-key}" > ~/.ssh/authorized_keys```
or execute from machine you are going to connect via ssh
```scp ~/.ssh/id_rsa.pub {hostname}:.ssh/authorized_keys```

```sh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

SRC:
- https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart

## Delete default ubuntu user

```sudo deluser ubuntu```

## Install useful (optional)

```sh
sudo apt-get update
sudo apt-get install -y wget curl mc htop screen vim
```

## Generate OVPN client cert (if your VPN server running on [kylemanna docker openvpn](https://github.com/kylemanna/docker-openvpn))

Pick a name for the $OVPN_DATA data volume container

```OVPN_DATA={absolute-path-to-volume}```

Generate a client certificate without a passphrase

```docker run -v $OVPN_DATA:/etc/openvpn --log-driver=none --rm -it kylemanna/openvpn easyrsa build-client-full CLIENTNAME nopass```

Retrieve the client configuration with embedded certificates

```docker run -v $OVPN_DATA:/etc/openvpn --log-driver=none --rm kylemanna/openvpn ovpn_getclient CLIENTNAME > CLIENTNAME.ovpn```

SRC:
- https://www.digitalocean.com/community/tutorials/how-to-run-openvpn-in-a-docker-container-on-ubuntu-14-04
- https://hub.docker.com/r/kylemanna/openvpn/
- https://github.com/kylemanna/docker-openvpn

## Install and configure openvpn client

Install OpenVPN
```sudo apt install openvpn```

Copy the client configuration file from the server and set secure permissions:
```sudo install -o root -m 400 CLIENTNAME.ovpn /etc/openvpn/CLIENTNAME.conf```

Configure the init scripts to autostart all configurations matching /etc/openvpn/*.conf:

```sudo systemctl enable openvpn```

Restart the OpenVPN client's server process:

```sudo systemctl start openvpn```

SRC:
- https://www.digitalocean.com/community/tutorials/how-to-run-openvpn-in-a-docker-container-on-ubuntu-14-04
