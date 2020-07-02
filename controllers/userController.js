const { User } = require('../models/index')
const bcrypt = require('bcrypt')

class UserController {
    static showAdmins(req,response){
        User.findAll({
          order:[["id","ASC"]]
        })
        .then(data=>{
          response.render("locket.ejs",{ data })
        })
        .catch(err=>{
          response.render("error",{error:err})
        })
      }
    
      static login(req,response){
        const message = req.app.locals.message
        delete req.app.locals.message
        response.render("user-login.ejs",{message:message})
      }
    
      static loginPost(req,response){
        User.findOne({ where: { email: req.body.email } })
        .then((data)=>{
          if(data === undefined){
            console.log('OK1')
            response.send("email not found")
          }
          else{
              console.log(req.body.password, data.password)
            if(bcrypt.compareSync(req.body.password, data.password)){
              console.log(req.session)
              req.session.email = req.body.email
              response.redirect("/users")
            }
            else{
              console.log("OK")
              response.send("qewqwe")
            }
          }
        })
        .catch((err)=>{
          console.log("asdas")
          response.send(err)
        })
      }
    
      static register(req,response){
        response.render("user-register.ejs")
      }
    
      static registerPost(req,response){
          console.log(req.body);
          
        let { first_name, last_name, username, password, email, birthdate, gender } =req.body
        User.create({
          first_name,
          last_name,
          username,
          password,
          email,
          birthdate,
          gender
        })
        .then((data)=>{
          req.app.locals.message = `Successfully register as Admin`
          response.redirect("/users/login")
        })
        .catch((err)=>{
          response.send(err)
        })
      }
    
      static logout(req,response){
        req.session.destroy(function(err){
          if(err){
            response.send(err)
          }
          else{
            response.redirect("/users/login")
          }
        })
      }
    
      static addCounter(req,response){
        response.render("add-User.ejs")
      }
    
      static addPostCounter(req,response){
        Counter.create({
          name: req.body.name
        })
        .then((data)=>{
          response.redirect("/users")
        })
        .catch((err)=>{
          response.send(err)
        })
      }
    
      static changeStatus(req,response){
        Counter.findByPk(+req.params.id)
        .then((data)=>{
          if(data.status === "Tutup"){
            return Counter.update({status:"Buka"},{where: {id:+req.params.id}})
          }
          else{
            return Counter.update({status:"Tutup"},{where: {id:+req.params.id}})
          }
        })
        .then((data)=>{
          response.redirect("/users")
        })
        .catch(err=>{
          response.send(err)
        })
      }
}

module.exports = UserController