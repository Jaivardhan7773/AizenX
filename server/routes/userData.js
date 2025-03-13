const express = require("express");
const User = require("../models/auth");
const adminMiddleware = require("../middleware/adminMiddleware")
const router = express.Router();

router.get("/getUsers" ,adminMiddleware,  async (req , res) => {
    try{
        const users = await User.find({} , "-password");
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

router.patch("/makeAdmin/:id" , adminMiddleware  , async (req, res) => {
try{
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message : "user not found"})
    }
    user.isAdmin = true;
    await user.save();
    res.status(200).json({message:"user is now admin"});
}
catch(error){
    res.status(500).json({message:"server error"});
}
})

router.patch("/removeAdmin/:id" ,adminMiddleware, async (req ,res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message : "cannot found user"});
        }
        user.isAdmin = false;
        await user.save();
        res.status(200).json({message:"user is now removed from admin position"})
    }
    catch(error){
        res.status(500).json({message:"internal server erorrr"})
    }
})

router.delete("/deleteUser/:id" ,adminMiddleware, async (req , res) => {
    try{
        const deleteuser = await User.findByIdAndDelete(req.params.id);
        if(!deleteuser){
            return res.status(400).json({message: "User not found "})
        }
        res.status(200).json({message: "User deleted successfully"});
    }
    catch(error){
        res.status(500).json({message: "error while deleting this user"})
    }
})

module.exports = router;