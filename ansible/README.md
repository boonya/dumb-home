# Provision host with ansible

First of all you have to define your inventory configuration [ansible/inventory/example/hosts.ini](ansible/inventory/example/hosts.ini), group variables [ansible/inventory/example/group_vars/all.yml](ansible/inventory/example/group_vars/all.yml) and variables specific to each host [ansible/inventory/example/group_vars/server1.yml](ansible/inventory/example/group_vars/server1.yml).

After that you may want to copy you specific dotfiles to the remote machines [ansible/roles/common/files/dotfiles/](ansible/roles/common/files/dotfiles/).

Also you may want to define some specific configuration to you `NGNIX` server [ansible/roles/docker/templates/nginx/conf.d/services.conf](ansible/roles/docker/templates/nginx/conf.d/services.conf).

You have to put here [ansible/roles/common/files/openvpn-keys/](ansible/roles/common/files/openvpn-keys/) open vpn client keys.

At the end you have to put your bundle file `dumb-home.tar.gz` into [this directory](ansible/roles/docker/files/web-app/).

## Run a command

```bash
ansible-playbook -i inventory/example/hosts.ini --limit server1 ./docker.yml -K --skip-tags "optional"
```
