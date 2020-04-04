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
$ git pull
$ sudo npm run install
$ sudo npm run build
$ sudo npm run start
# Our server uses pm2 to manage the server port.
$ pm2 start npm -- start


```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
# rooftop-frontend
