const router = require('express').Router()
const User = require('../controllers/userController')

function checkSession(req,res,next){
    if(req.session.email){
      next()
    }
    else{
      res.send("Unauthorized")
    }
  }
router.get("/login",User.login)

router.post("/login",User.loginPost)

router.get("/register",User.register)

router.post("/register",User.registerPost)

router.get("/logout",User.logout)


router.use(checkSession)

router.get("/",User.showAdmins)

router.get("/addCounter",User.addCounter)

router.post("/addCounter",User.addPostCounter)

router.get("/changeStatus/:id",User.changeStatus)

module.exports = router