const mongoose = require('mongoose');
const userSchema = require('./users.model');

userSchema.static = {
    create: function(data, cb){

        const user = new this(data);
        user.save(cb);
        
    },
    
    get: function(query, cb){
        this.fin(query, cb);
    },

}

const usersModel = mongoose.model('Users', userSchema);
module.exports = usersModel;