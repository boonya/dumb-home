# Nginx as a proxy server

To install latest nginx just run:

```bash
sudo apt-get update
sudo apt-get install -y nginx
```

When it's ready you need to configure it.

## Open file /etc/nginx/conf.d/services.conf

Add instructions below to allow websocket protocol proxy:

```txt
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
```

And next one to say nginx proxy reuests from `{your-hostname}` port `80` to something described in file `/etc/nginx/services.d/hostname.conf`.

_NOTE:_ Do not forget change `{your-hostname}` by hostname you need.

```txt
server {
    listen 80;
    server_name {your-hostname};
    include /etc/nginx/services.d/hostname.conf;
}
```

## Open file /etc/nginx/services.d/hostname.conf

Add instructions below to proxy from `$host` (dynamic hostname defined above) to `http://localhost:3000`.

```txt
location / {
    proxy_set_header Host $host;
    proxy_pass         http://localhost:3000;
    proxy_redirect off;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
}
```

## Enable autostart

```bash
sudo systemctl enable nginx
```

## The last step is restart nginx

```bash
sudo systemctl restart nginx
```
