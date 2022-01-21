const express=require('express');
const router=express.Router();

const passport=require('passport');
const commentController=require('../controllers/comments_controllers');

router.post('/create',passport.checkAuthentication,commentController.creates);


module.exports=router;