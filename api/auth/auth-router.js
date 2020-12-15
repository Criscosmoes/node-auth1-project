const express = require("express"); 
const router = express.Router(); 
const User = require("../users/users-model"); 
const checkIfUserTaken = require("../../middleware/checkIfUserTaken");
const checkPayload = require("../../middleware/checkPayload"); 
const checkIfUserExists = require("../../middleware/checkIfUserExists")
const bcrypt = require("bcryptjs");  


router.post("/register", [checkPayload, checkIfUserTaken], async (req, res) => {

    try {

      const hash = bcrypt.hashSync(req.body.password, 10)

      const user = await User.add({username: req.body.username, password: hash})
      res.status(201).send(user)
    }
    catch(e){
        res.status(500).send(e.message); 
    }
})

router.post("/login", [checkPayload, checkIfUserExists], async (req, res) => {
    try {

        const user = req.user; // stored in database

        //check and compare the passwords
        const verify = bcrypt.compareSync(req.body.password, user.password); 

        if(!verify) return res.status(400).json("Wrong username or password"); 

        //SET-COOKIE is set on the response, and active session is saved
        req.session.user = user;

        res.send(`Welcome back ${user.username}`)
        


    }catch(e){
        res.status(500).send(e.message); 
    }
})

router.get("/logout", (req, res) => {
    if(req.session.user){
        req.session.destroy(err => {
            if(err) res.json("you can not leave"); 
            else res.json("goodbye"); 
        }); 
    }
    else {
        res.json("there was no session");
    }
})


module.exports = router; 