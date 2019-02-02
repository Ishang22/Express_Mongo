let express = require('express'),
    router = express.Router(),
    Middleware = require('../Middleware'),
    Controller = require('../Controllers'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();


router.post('/signUp', Controller.user.signUp);

router.get('/login', Controller.user.login);

router.post('/logout',Middleware.auth.userAuth, Controller.user.logout);

router.post('/verifyOTP', Controller.user.verifyOTP);

module.exports = router;
