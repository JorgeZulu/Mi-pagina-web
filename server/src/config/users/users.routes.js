const { Router } = require('express');
const Users = require('./users.controller');


module.exports = (router) => {
    router.post('/add', Users.createUser);
    router.get('.users', Users.getUsers);
    
}