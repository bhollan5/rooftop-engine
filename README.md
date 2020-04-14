# rooftop-frontend

> Frontend for rooftop-media.org

## Build Setup

We manage Rooftop's deployment using PM2.
https://pm2.keymetrics.io/docs/usage/process-management/

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ git pull            # pull new files
$ sudo npm install    # install any new dependences in package.json
$ sudo npm run build  # build new ssr files
# Our server uses pm2 to manage the server port.
$ pm2 start npm -- start  #restart the server
# You can also start the server yrself:
$ sudo npm run start  # serve files on port :3000



```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
# rooftop-frontend
