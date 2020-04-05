# Manual

## Install docker itself

1. You need to install a few additional packages that may be needed by docker.service.
2. Add GPG key
3. Add repository to get a sources of docker.service
4. Install `docker-ce` package
5. Add your current user to the docker group to not type `sudo` command everytime

```bash
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=arm64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
sudo apt install -y docker-ce
sudo usermod -aG docker ${USER}
```

If you want to check whether docker.service is running or not just execute:

```bash
sudo systemctl status docker
```

[link](https://www.digitalocean.com/community/tutorials/docker-ubuntu-18-04-1-ru)

## Install docker-compose

1. Install dependenies
2. Install `docker-compose` from `pip` as root user

```bash
sudo apt update
sudo apt install -y python-pip libffi-dev libssl-dev
sudo su -c "pip install docker-compose"
```

## Run dumb-home service

```bash
sudo cp ~/dumb-home/dumb-home.service /etc/systemd/system/dumb-home.service
sudo systemctl daemon-reload
sudo systemctl enable dumb-home
sudo systemctl start dumb-home
```
