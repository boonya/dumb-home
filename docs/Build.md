# Build your meteor application

To run meteor application at your appliance you have to bundle it. For that purpose just run

```npm run build```

and wait for a while.

As a result you'll get `meteor-react-js.tar.gz` file placed in `./bundle` directory.
Copy this file to your appliance using:

```scp ./bundle/meteor-react-js.tar.gz your-appliance:```
