import express from 'express';
const router = express.Router();
import {registerController,loginController ,userController ,profileController} from '../controllers';
import auth from '../middlewares/auth';

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/profiledata/:id', auth, userController.me);
router.post('/profile/:id', auth, profileController.profile);
router.put('/profile/:id', auth, profileController.update);
router.get('/Aboutus', auth ,userController.about);
router.post('/otp/:id',auth,registerController.otp);
router.post('/otpverified/:id',auth,registerController.otpverified);



export default router;