# How to prepare your Raspi 3

Install all dependencies you need by commands below

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

echo "deb [ arch=arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

sudo apt-get update

sudo apt-get install -y \
  nodejs \
  haproxy=1.8.\* \
  mongodb-org \
  gcc \
  g++ \
  make
```
