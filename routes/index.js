import express from 'express';
const router = express.Router();
import {registerController,loginController ,userController ,profileController} from '../controllers/index.js';
import auth from '../middlewares/auth.js';

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/profiledata/:id', auth, userController.me);
router.get('/admindata', auth, userController.adminme);
router.post('/profile/:id', auth, profileController.profile);
router.post('/Adminprofile/:id', auth, profileController.Adminprofile);
router.put('/profile/:id', auth, profileController.update);
router.put('/Adminprofileupdate/:id', auth, profileController.Adminprofileupdate);
router.get('/Aboutus', auth ,userController.about);
router.post('/otp/:id',auth,registerController.otp);
router.post('/otpverified/:id',auth,registerController.otpverified);
router.put('/Reotpverified/:id',auth,registerController.Reotpverified);




export default router;