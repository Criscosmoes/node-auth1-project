const router = require("express").Router();


const User = require("./users-model"); 
const protected = require("../../middleware/protected"); 


router.get("/users", protected, async (req, res) => {
    
    try {
        const users = await User.find(); 

        res.status(200).send(users); 
    }
    catch(e){
        res.status(500).send(e.message); 
    }
})


module.exports = router; 