const  TokenManager = require('../Lib/TokenManager');
const Config = require('../Config');

const userAuth = function (req,res,next) {
    if(req.headers.authorization){
        TokenManager.verifyToken(req.headers.authorization).then(result => {
            console.log("====result=======",result);
            req.body.userData = result;
            next();
        }).catch(reason => {
            res.status(401).send(Config.APP_CONSTANTS.STATUS_MSG.ERROR.MISSING_AUTHENTICATION);
        });
    }else{
        console.log("====i am here  ");
        res.status(401).send(Config.APP_CONSTANTS.STATUS_MSG.ERROR.MISSING_AUTHENTICATION);
    }
}



module.exports = {
    userAuth : userAuth
}
