module.exports = async function(req, res, next) {
    try {
        const { username, password } = req.body; 

        if(!username || !password) return res.status(400).json("Please provide a username and a password"); 

        next(); 
    }
    catch(e){
        res.status(500).send(e.message); 
    }
}

