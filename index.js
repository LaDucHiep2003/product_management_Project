const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path');

const route = require('./routes/client/index.route')
const methodOverride = require('method-override')
const routeAdmin = require('./routes/admin/index.route')
const database = require('./config/database')
const systemConfig = require('./config/system')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const moment = require("moment")


const port = process.env.port

database.connect()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(`${__dirname}/public`))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

// Flag
app.use(cookieParser('namamn'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flag

app.use(methodOverride('_method'))

// App Local
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


// Router
route(app)
routeAdmin(app)

app.get("*", (req,res) => {
  res.render("client/pages/errors/404",{
      pageTitle : "404 Not Found"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})