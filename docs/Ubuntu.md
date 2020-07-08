# Ubuntu 20.04 LTS (Focal Fossa) arm64 server

## Run Ubuntu on Raspberry PI 3

Download official Ubuntu 20.04 LTS (Focal Fossa) arm64 server image from resource [http://cdimage.ubuntu.com/ubuntu/releases/20.04/release/](http://cdimage.ubuntu.com/ubuntu/releases/bionic/release/)
or directly using [this link](http://cdimage.ubuntu.com/ubuntu/releases/20.04/release/ubuntu-20.04-preinstalled-server-arm64+raspi.img.xz)

You can write an image to SD card using [balena etcher](https://www.balena.io/etcher/).

## Connect to your little server

Connect to you raspi with ubuntu server on board using predefined ubuntu user like so:

`ssh ubuntu@IP`

password is `ubuntu` also.

## Change hostname permanently (optional)

Execute next to set new hostname:
`sudo hostnamectl set-hostname {your-new-hostname}`

Run to recheck:
`hostnamectl`

SRC:

- https://www.cyberciti.biz/faq/ubuntu-18-04-lts-change-hostname-permanently/

## Locale (optional)

`sudo dpkg-reconfigure locales`

## Timezone

`sudo timedatectl set-timezone Europe/Kiev`

## Create your own sudo user

`sudo adduser {username}`

`sudo usermod -aG sudo {username}`

`su - {username}`

`mkdir ~/.ssh`

`echo "{your-public-key}" > ~/.ssh/authorized_keys`
or execute from machine you are going to connect via ssh
`scp ~/.ssh/id_rsa.pub {hostname}:.ssh/authorized_keys`

```sh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

SRC:

- https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart

## Change Prompt (optional)

Open:
`vim ~/.bashrc`

Replace all occurrences of `\h` to `\H`

## Reboot

`sudo reboot`

## Delete default ubuntu user

`sudo deluser ubuntu`

## Install useful (optional)

```sh
sudo apt-get update
sudo apt-get install -y wget curl mc htop screen vim
```

## Automount of USB HDD

Run the following command to see the name of your drive, its UUID(Universal Unique Identifier) and file system type.

`sudo blkid`

Make or choose a mount point for your drive. Usually it is somewhere inside `/mnt` directory.
And then modify your `/etc/fstab` file to append one line of code at the end of the file. The format of this line of code is as follows:

```txt
UUID=<uuid-of-your-drive> <mount-point> <file-system-type> <mount-option> <dump> <pass>
```

Note that you need to separate these items with Tab key. For example, I added the following line to the end of `/etc/fstab`.

```txt
UUID=0fc19bcb-0929-4d0c-9740-89b73214b4ef	/mnt	ext4	defaults	0	2
```

Then reboot and wait.

SRC:

- https://www.linuxbabe.com/desktop-linux/how-to-automount-file-systems-on-linux
