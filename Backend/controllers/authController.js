const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const register = async (req,res) => {
    try{
        const {username , email, password} = req.body;
        const user = new User({username,email,password});
        await user.save();
        res.status(201).json({message:'User Registered Sucessfully'});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};

const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'});
        res.json({token});
    }catch(error){
        res.status(500).json({error:error.message})
    }
};

module.exports = {register,login};