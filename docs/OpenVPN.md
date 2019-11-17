# OpenVPN client

## Generate OVPN client cert (if your VPN server running on [kylemanna docker openvpn](https://github.com/kylemanna/docker-openvpn))

Pick a name for the \$OVPN_DATA data volume container

`OVPN_DATA={absolute-path-to-volume}`

Generate a client certificate without a passphrase

`docker run -v $OVPN_DATA:/etc/openvpn --log-driver=none --rm -it kylemanna/openvpn easyrsa build-client-full CLIENTNAME nopass`

Retrieve the client configuration with embedded certificates

`docker run -v $OVPN_DATA:/etc/openvpn --log-driver=none --rm kylemanna/openvpn ovpn_getclient CLIENTNAME > CLIENTNAME.ovpn`

SRC:

- https://www.digitalocean.com/community/tutorials/how-to-run-openvpn-in-a-docker-container-on-ubuntu-14-04
- https://hub.docker.com/r/kylemanna/openvpn/
- https://github.com/kylemanna/docker-openvpn

## Install and configure openvpn client

Install OpenVPN
`sudo apt install openvpn`

Copy the client configuration file from the server and set secure permissions:
`sudo install -o root -m 400 CLIENTNAME.ovpn /etc/openvpn/CLIENTNAME.conf`

Configure the init scripts to autostart all configurations matching /etc/openvpn/\*.conf:

`sudo systemctl enable openvpn`

Restart the OpenVPN client's server process:

`sudo systemctl start openvpn`

SRC:

- https://www.digitalocean.com/community/tutorials/how-to-run-openvpn-in-a-docker-container-on-ubuntu-14-04
