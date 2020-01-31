# MongoDB

## Install MongoDB 4.2 to you applicance

### Import the public key used by the package management system

From a terminal, issue the following command to import the MongoDB public GPG Key from https://www.mongodb.org/static/pgp/server-4.2.asc:

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
```

### Create a list file for MongoDB

Create the list file `/etc/apt/sources.list.d/mongodb-org-4.2.list` for your version of Ubuntu.

Click on the appropriate tab for your version of Ubuntu. If you are unsure of what Ubuntu version the host is running, open a terminal or shell on the host and execute `lsb_release -dc`.

```bash
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
```

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
● mongod.service - MongoDB Database Server
   Loaded: loaded (/lib/systemd/system/mongod.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-01-07 14:08:13 EET; 17min ago
     Docs: https://docs.mongodb.org/manual
 Main PID: 7716 (mongod)
   CGroup: /system.slice/mongod.service
           └─7716 /usr/bin/mongod --config /etc/mongod.conf

Jan 07 14:08:13 raspi.mama systemd[1]: Started MongoDB Database Server.
```

If the previous status check command runs into any errors, check if `mongod.service` exists in the system’s services directory by using `ls /lib/systemd/system`

The last step of the installation process is to enable the automatic launch of MongoDB when the system starts.

`sudo systemctl enable mongod`

The MongoDB server is now installed and running. You can manage the MongoDB service using the `systemctl` commands. For example `sudo systemctl mongod stop` to stop the service or `sudo systemctl mongod start` to start it again.

### Create a new MongoDB admin user

If you were to run the `mongo` command in the terminal, you will most likely notice a warning looking something like this:

```txt
MongoDB shell version v4.2.1
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("99a93578-f787-41d1-b38d-ca43bf6ff0b6") }
MongoDB server version: 4.2.1
Server has startup warnings:
2020-01-07T14:08:13.913+0200 I  STORAGE  [initandlisten]
2020-01-07T14:08:13.913+0200 I  STORAGE  [initandlisten] ** WARNING: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine
2020-01-07T14:08:13.913+0200 I  STORAGE  [initandlisten] **          See http://dochub.mongodb.org/core/prodnotes-filesystem
2020-01-07T14:08:15.615+0200 I  CONTROL  [initandlisten]
2020-01-07T14:08:15.615+0200 I  CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2020-01-07T14:08:15.615+0200 I  CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2020-01-07T14:08:15.615+0200 I  CONTROL  [initandlisten]
---
Enable MongoDB's free cloud-based monitoring service, which will then receive and display
metrics about your deployment (disk utilization, CPU, operation statistics, etc).












The monitoring data will be available on a MongoDB website with a unique URL accessible to you
and anyone you share the URL with. MongoDB may use this information to make product
improvements and to suggest MongoDB products and deployment options to you.

To enable free monitoring, run the following command: db.enableFreeMonitoring()
To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---

>
```

We will now create a new MongoDB admin user to rectify the situation. If not already done, connect to your MongoDB again using the `mongo` command and after the `>` sign, add these queries (replace the _user_ and _password_ values with your own):

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

## Create meteor user account

```js
use DumbHome
db.createUser({user: "meteor", pwd: "password", roles: [{role: "readWrite", db: "DumbHome"}]})
```

src: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
