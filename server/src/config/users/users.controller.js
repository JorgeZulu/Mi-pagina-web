const Users = require('./users.dao');

exports.createUser = async(req, res, next) => {

    const user = {        
        email: req.body.email,
        password: req.body.password,        
    };

    try {

        const createdUser = await Users.create(user);
        res.json({message: 'User created successfully'});

    }catch (err){
        
        res.json({error:err});
    }


}

    exports.getUsers = async (req, res, next) => {


    try{
        const createduser = await Users.get({});
        res.status(200).json({Users: Users});

    }catch (err){

        res.status(500).json({error: 'internal server Error'});

    }


};