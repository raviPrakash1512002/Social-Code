const express=require('express');
const router=express.Router();
const profileController=require('../controllers/user_controllers');

router.get('/profile',profileController.profile);
router.get('/contact',profileController.contact);



router.get('/sign-in',profileController.signIn);
router.get('/sign-up',profileController.signUp);

router.post('/create',profileController.create);

module.exports=router;