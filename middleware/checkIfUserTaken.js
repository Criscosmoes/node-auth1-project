const User = require("../api/users/users-model");


module.exports = async function (req, res, next) {

    try {

        let [user] = await User.findBy({username: req.body.username}); 

        if(user) return res.status(400).send({e: "Username taken. Please choose another"}); 

        req.newUser = user; 
        next(); 
        
    }catch(e){
        res.status(500).send(e.message); 
    }


}