const express = require('express');
const router = express.Router();

var userController = require('../controllers/users/userController');



router.post('/createuser',userController.create_a_user);
router.post('/login',userController.login_a_user);



module.exports = router;
