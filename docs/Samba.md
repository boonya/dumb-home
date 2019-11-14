# Samba

Samba is a free and open-source re-implementation of the SMB/CIFS network file sharing protocol that allows end users to access files, printers, and other shared resources.

## Installing Samba on Ubuntu

The first thing as usual just to update your apt index:

`sudo apt update`

To install samba package run:

`sudo apt install samba`

Once the installation is completed, the Samba service will start automatically. To check whether the Samba server is running, type:

`sudo systemctl status nmbd`

The output should look something like below indicating that Samba service is active and running:

```txt
● nmbd.service - Samba NMB Daemon
Loaded: loaded (/lib/systemd/system/nmbd.service; enabled; vendor preset: enabled)
Active: active (running) since Sun 2019-01-27 02:36:20 PST; 4s ago
    Docs: man:nmbd(8)
        man:samba(7)
        man:smb.conf(5)
Main PID: 4262 (nmbd)
Status: "nmbd: ready to serve connections..."
    Tasks: 1 (limit: 2319)
CGroup: /system.slice/nmbd.service
        `-4262 /usr/sbin/nmbd --foreground --no-process-group
```

## Add users to the Samba share

Add your user account to the Samba database by setting the user password:

`sudo smbpasswd -a {username}`

You will be prompted to enter and confirm the user password.

```txt
New SMB password:
Retype new SMB password:
Added user {username}.
```

Once the password is set to enable the Samba account run:

`sudo smbpasswd -e {username}`

```txt
Enabled user {username}.
```

## Configuring Samba Shares

Open the Samba configuration file and append the sections:

`sudo nano /etc/samba/smb.conf`

Add section below to the file `/etc/samba/smb.conf`

```txt
[{username}]
    path = /mnt
    browseable = yes
    read only = no
    force create mode = 0660
    force directory mode = 2770
    valid users = {username} @sadmin
```

For more information about available options see the Samba configuration file documentation page.

Once done, restart the Samba service with:

`sudo systemctl restart nmbd`

SRC: https://linuxize.com/post/how-to-install-and-configure-samba-on-ubuntu-18-04/
