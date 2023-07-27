const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT_Secret = 'jsonwebtokenforsign';
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

//Routes 1 :  Creating a User using Post "/api/auth/createuser". No login required 
router.post('/createuser',[
    body('name','Please Enter a valid Name').isLength({min: 3}),
    body('email', 'please Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({min: 8})
] ,async(req,res)=>{

    //If there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});
    }
    // check whether the user with this email exists already
    try{
        let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({error : "Sorry, user already exists with this email."});
    }//create a new user
    const salt = await bcrypt.genSalt(10);
    secPass= await bcrypt.hash(req.body.password,salt) 
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })
    const data = {
        user : {
            id : user.id
        }
    }
    const authToken = jwt.sign(data,JWT_Secret)

    res.json({authToken})
}
catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error")
}
})

//Routes 2: Authenticate a User using Post "/api/auth/login". No login required 
router.post('/login',[
    body('email', 'please Enter a valid Email').isEmail(),
    body('password', 'Password cannot be empty ').exists()
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user){
            return res.status(404).json({errors:"Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(404).json({errors:"Please try to login with correct credentials"});
        }
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data,JWT_Secret)
    
        res.json({authToken})

    } catch (error) {
        console.log(error.message);
    res.status(500).send("Internal Server Error")
    }

})

//Routes 3: Get loggedIn User Details using Post "/api/auth/getuser".login required 
router.post('/getuser', fetchuser ,async(req,res)=>{
try{
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
}
 catch (error) {
        console.log(error.message);
    res.status(500).send("Internal Server Error")
    }
})
module.exports = router;