const routes = require("express").Router()
const adminRoutes = require("./adminroutes.js")
const Home = require('../controllers/homeController')
const user = require('./Users')
const router = require("./Users.js")


router.get('/', Home.getHome)
routes.use("/admins",adminRoutes)
routes.use("/users",user)


module.exports = routes
