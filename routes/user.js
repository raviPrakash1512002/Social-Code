const express=require('express');
const router=express.Router();
const passport=require('passport');
const profileController=require('../controllers/user_controllers');


router.get('/profile/:id',passport.checkAuthentication,profileController.profile);

router.post('/update/:id',passport.checkAuthentication,profileController.update);


router.get('/sign-in',profileController.signIn);
router.get('/sign-up',profileController.signUp);

router.post('/create',profileController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
),profileController.createSession);
router.get('/sign-out',profileController.destroySession);


router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),profileController.createSession);


module.exports=router;