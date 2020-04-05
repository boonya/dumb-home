# Provision host with ansible

```bash
ansible-playbook -i inventory/example/hosts.ini --limit server1 ./docker.yml -K --skip-tags "optional"
```
