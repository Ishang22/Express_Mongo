const UniversalFunctions = require("../Utils/UniversalFunction"),
      DAO                = require('../DAOManager').queries,
    Models               = require('../Models/'),
    Config               = require('../Config'),
    TokenManager         = require("../Lib/TokenManager"),
    ObjectId             =  require('mongoose').Types.ObjectId;

//////////////////////////////////// userSignUp ///////////////
async function signUp(req, res) {
    try {


             req.body.uniqueKey = +new Date();
             let step1 = await checkPhoneExists(req.body);
             let step2 = await checkEmailExists(req.body);
             let step3 = await createUser(req.body);
             let step4 = await generateAccessToken(step3);


            return res.status(200).send({
                statusCode: 200,
                message: "Success",
                data: {
                    _id           : step3._id,
                    firstName     : step3.firstName   ,
                    lastName      : step3.lastName    ,
                    fullName      : step3.fullName    ,
                    countryCode   : step3.countryCode ,
                    phoneNo       : step3.phoneNo     ,
                    fullNumber    : step3.fullNumber  ,
                    emailId       : step3.emailId     ,
                    password      : step3.password    ,
                    OTP           : step3.OTP         ,
                    isVerify      : step3.isVerify    ,
                    accessToken   : step4 ,
                    createdDate   : step3.createdDate ,
                }
            });

    } catch (er) {
        console.log(er);
        return res.status(400).send({
            statusCode  : 400,
            message     : er.sqlMessage || er.customMessage,
            responseType: er.code || er.type,
        });
    }
}

async function checkPhoneExists(data) {
let criteria= {
    fullNumber   : data.countryCode+data.phoneNo  ,
};

console.log("await DAO.getData(Models.User,criteria, {}, {})",await DAO.getData(Models.User,criteria, {}, {}));
    if((await DAO.getData(Models.User,criteria, {}, {})).length>0)
    {
        return  Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.DUPLICATE_PHONE_NUMBER);
    }
    else
    {
        return null;
    }
};

async function checkEmailExists(data) {
    let criteria= {
        emailId      : data.emailId   ,
    };
    if((await DAO.getData(Models.User,criteria, {}, {})).length>0)
    {
        return  Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.DUPLICATE_EMAIL);
    }
    else
    {
        return null;
    }
};

async function createUser(data) {
      let Code  =   (+new Date()).toString(),
          Otp   =   Code.substr(Code.length - 4);

    let dataToSave={
        firstName    : data.firstName   ,
        lastName     : data.lastName    ,
        fullName     : data.fullName    ,
        countryCode  : data.countryCode ,
        phoneNo      : data.phoneNo     ,
        fullNumber   : data.countryCode+data.phoneNo  ,
        emailId      : data.emailId     ,
        uniqueKey    :data.uniqueKey     ,
        password     : UniversalFunctions.CryptData(data.password)    ,
        OTP          : Otp,
        deviceToken  :[data.deviceToken]
    };

    return  await DAO.saveData(Models.User,dataToSave);
};

async function generateAccessToken(data) {
  let tokenData = {
      scope:Config.APP_CONSTANTS.SCOPE.USER,
      _id   :data._id,
      uniqueKey:data.uniqueKey
  };

  console.log("====tokenData========",tokenData);

   return  TokenManager.generateToken(tokenData);

};


//////////////////////////////////// login ///////////////
async function login(req, res) {
    try {

        let step1 = getLoginDetails(req.query);
        let step2 = await updateDeviceToken(req.query);
        let step3 = await generateAccessToken((await step1)[0]);

        console.log(step2);
        return res.status(200).send({
            statusCode: 200,
            message: "Success",
            data: {
                _id           : step2._id,
                firstName     : step2.firstName   ,
                lastName      : step2.lastName    ,
                fullName      : step2.fullName    ,
                countryCode   : step2.countryCode ,
                phoneNo       : step2.phoneNo     ,
                fullNumber    : step2.fullNumber  ,
                emailId       : step2.emailId     ,
                password      : step2.password    ,
                OTP           : step2.OTP         ,
                isVerify      : step2.isVerify    ,
                accessToken   : step3 ,
                createdDate   : step2.createdDate ,
            }
        });

    } catch (er) {
        console.log(er);
        return res.status(400).send({
            statusCode  : 400,
            message     : er.sqlMessage || er.customMessage,
            responseType: er.code || er.type,
        });
    }
}


async function getLoginDetails(data) {
    console.log("===data=======",data);
    let criteria={$or: [ { fullNumber: data.key }, { emailId: data.key } ],password :UniversalFunctions.CryptData(data.password)};
    return  DAO.getData(Models.User,criteria, {}, {});
};

async function updateDeviceToken(data) {
    let criteria={$or: [ { fullNumber: data.key }, { emailId: data.key } ],password :UniversalFunctions.CryptData(data.password)};

    let dataToUpdate = {
        $addToSet: {deviceToken: [ data.deviceToken ] }
    };

    console.log("==criteria==dataToUpdate==",dataToUpdate,criteria);
    return  DAO.findAndUpdate(Models.User,criteria, dataToUpdate, {});
};

//////////////////////////////////// login ///////////////
async function logout(req, res) {
    try {

        console.log("req.userData=======########################################==",req.body.userData);

        let criteria={_id:req.body.userData._id};

        let dataToUpdate = {
            uniqueKey:+ new Date()
        };

        await   DAO.findAndUpdate(Models.User,criteria, dataToUpdate, {});

        return res.status(200).send({
            statusCode: 200,
            message: "Success",
            data: null
        });

    } catch (er) {
        console.log(er);
        return res.status(400).send({
            statusCode  : 400,
            message     : er.sqlMessage || er.customMessage,
            responseType: er.code || er.type,
        });
    }
}


//////////////////////////////////// verifyOTP ///////////////
async function verifyOTP(req, res) {
    try {

        let criteria={$or: [ { fullNumber: req.body.key }, { emailId: req.body.key } ],OTP :req.body.OTP};
        let step1 = await   DAO.findAndUpdate(Models.User,criteria, {isVerify:true,OTP:''}, {});

        if(step1)
        {
            return res.status(200).send({
                statusCode: 200,
                message: "Success",
                data: null
            });
        }
        else
        {

            res.status(401).send({
                statusCode: 401,
                message:'invalid otp',
                type:'INVALID_OTP'
            });

        }


    } catch (er) {
        console.log(er);
        return res.status(400).send({
            statusCode  : 400,
            message     : er.sqlMessage || er.customMessage,
            responseType: er.code || er.type,
        });
    }
}



module.exports = {
    signUp: signUp,
    login : login,
    logout : logout,
    verifyOTP:verifyOTP
};