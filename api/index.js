// To initialize express in nuxt: 
// https://medium.com/@mitsuyawatanabe/how-to-start-express-project-in-nuxt-2-x-d3406c92a8ca

const app = require('express')()
module.exports = { path: '/api', handler: app }
app.get('/hello', (req, res) => {
    console.log('hello nuxt in text')
    res.send('world')
})