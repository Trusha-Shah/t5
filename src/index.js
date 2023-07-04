const express = require('express')
const {response} = require("express");
const index = express()
const users = require('../db/users')
const port = 3001;
index.use(express.json());

index.get('/users', (req, res) => {
    res.send(users);
});

index.post('/add',(req,res) =>{
    const { email, firstName } = req.body;
    const id = generateUniqueId();

    const newUser = {
        email: email,
        firstName: firstName,
        id: id
    };

    users.push(newUser);

    res.json({
        message: 'User added',
        success: true,
        user: newUser
    });



});

index.put("/update/:id",(req,res)=>{
    const id = req.params.id;
    const { email, firstName } = req.body;
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({
            message: 'User not found',
            success: false
        });
    }

    user.email = email || user.email;
    user.firstName = firstName || user.firstName;

    res.json({
        message: 'User updated successfully',
        success: true,
        user: user
    });
});

index.get("/user/:id",(req,res)=>{
    const id = req.params.id;

    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    res.json({
        success: true,
        user: user
    });

});


function generateUniqueId() {
    return Math.random().toString(36).substring(2, 9);
}

index.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
