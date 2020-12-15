const User = require("../api/users/users-model"); 


module.exports = async function(req, res, next){
    try {

        const [taken] = await User.findBy({username: req.body.username}); 

        if(!taken) return res.status(400).json("User not found. Please create an account"); 

        req.user = taken; 
        next(); 


    }catch(e){
        res.status(500).send(e.message); 
    }
}