# MongoDB

## Install MongoDB 3.6 to you applicance

### Import the public key used by the package management system

The Ubuntu package management tools (i.e. `dpkg` and `apt`) ensure package consistency and authenticity by requiring that distributors sign packages with GPG keys.

Issue the following command to import the [MongoDB public GPG Key](https://www.mongodb.org/static/pgp/server-3.6.asc):

`sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5`

### Create a list file for MongoDB

Create the `/etc/apt/sources.list.d/mongodb-org-3.6.list` list file using the command below:

`echo "deb [ arch=arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list`

### Reload local package database and install MongoDB

Reload the local package database with this command:

`sudo apt-get update`

Then install MongoDB:

`sudo apt-get install -y mongodb-org`

### Verify that MongoDB runs and starts at system reboot

Next, start MongoDB with `systemctl`.

`sudo systemctl start mongod`

You can also use `systemctl` to check that the service has started properly.

`sudo systemctl status mongod`

The output is likely going to look something like this:

```txt
● mongod.service - High-performance, schema-free document-oriented database
   Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
   Active: active (running) since Thu 2019-04-11 08:44:46 UTC; 5s ago
     Docs: https://docs.mongodb.org/manual
 Main PID: 11547 (mongod)
   CGroup: /system.slice/mongod.service
           └─11547 /usr/bin/mongod --config /etc/mongod.conf

Apr 11 08:44:46 raspi.home systemd[1]: Started High-performance, schema-free document-oriented database.
```

If the previous status check command runs into any errors, check if `mongod.service` exists in the system’s services directory by using `ls /lib/systemd/system`

The last step of the installation process is to enable the automatic launch of MongoDB when the system starts.

`sudo systemctl enable mongod`

The MongoDB server is now installed and running. You can manage the MongoDB service using the `systemctl` commands. For example `sudo systemctl mongod stop` to stop the service or `sudo systemctl mongod start` to start it again.

### Create a new MongoDB admin user

If you were to run the `mongo` command in the terminal, you will most likely notice a warning looking something like this:

```txt
MongoDB shell version v3.6.12
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("d6ae52fe-2fd0-47a4-b490-df020b688694") }
MongoDB server version: 3.6.12
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
  http://docs.mongodb.org/
Questions? Try the support group
  http://groups.google.com/group/mongodb-user
Server has startup warnings:
2019-04-11T08:44:46.585+0000 I STORAGE  [initandlisten]
2019-04-11T08:44:46.586+0000 I STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2019-04-11T08:44:46.586+0000 I STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2019-04-11T08:44:47.973+0000 I CONTROL  [initandlisten]
2019-04-11T08:44:47.974+0000 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2019-04-11T08:44:47.974+0000 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2019-04-11T08:44:47.974+0000 I CONTROL  [initandlisten]
>
```

We will now create a new MongoDB admin user to rectify the situation. If not already done, connect to your MongoDB again using the `mongo` command and after the `>` sign, add these queries (replace the _user_ and _pwd_ values with your own):

```js
use admin
db.createUser({user: "username", pwd: "password", roles: [{role: "dbAdminAnyDatabase", db: "admin"}]})
```

This switches to the admin database and creates a new user with dbAdminAnyDatabase role there in. Find out more about this role in the [official MongoDB documentation](https://docs.mongodb.com/v3.0/reference/built-in-roles/#dbAdminAnyDatabase).

Optionally, you may want to give the user [root permission](https://docs.mongodb.com/v3.0/reference/built-in-roles/#root). You can do so using the root role by replacing dbAdminAnyDatabase with root in the above query.

### Secure database access control on MongoDB

To remove the aforementioned warning message, we will now modify the MongoDB configuration slightly. Edit the _mongod.conf_ with this command:

`sudo vim /etc/mongod.conf`

Below the _#security_ comment, add the following lines:

```txt
security:
  authorization: "enabled"
```

Then restart the MongoDB service:

`sudo systemctl restart mongod`

Now your database is secured with username and password and the warning message should have disappeared upon your next connection to MongoDB. Try to connect to your database using the new user we created earlier. Replace with your login credentials, but leave the quotation marks intact:

`mongo -u "username" -p password --authenticationDatabase "admin"`

Congratulations! You have now installed and secured your MongoDB service. To add individual users and privileges to a MongoDB database, [follow this tutorial](https://blog.gatemill.com/how-to-add-a-new-user-to-a-mongodb-database/).

_NOTE:_

Everything in this instruction has been stolen from [this article](https://medium.com/@mhagemann/how-to-install-mongodb-3-6-on-ubuntu-17-10-ac0bc225e648)

Thank you, *Matthew Hagemann*, a lot!

I have it tested on *Ubuntu server 18.04.02 arm64* running on *Raspberry PI 3*.

## Create meteor user account

```js
use DumbHome
db.createUser({user: "meteor", pwd: "password", roles: [{role: "readWrite", db: "DumbHome"}]})
```
