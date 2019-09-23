# Just hints

## Run mongodb instance

```bash
docker run --name dumb-home -p 27017:27017 -d mongo:3
mongo
db.createUser({user: "meteor", pwd: "password", roles: [{role: "readWrite", db: "DumbHome"}]})
```

## Prepare application

```bash
nvm install 8.11.4
nvm use 8.11.4
```

`(cd programs/server && npm install)`

## Run application

```bash
PORT=3000 MONGO_URL='mongodb://meteor:password@localhost:27017/DumbHome' ROOT_URL='http://localhost:3000' node main.js
```