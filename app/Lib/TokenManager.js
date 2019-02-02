/**
 * Created by Ishan Garg on 30/3/17.
 */

"use strict";
const Jwt = require('jsonwebtoken');
const Config = require('../Config');
const DAO    = require('../DAOManager').queries;
const  Models    = require('../Models/');


let generateToken = (tokenData) => {
    return new Promise((resolve, reject) => {
        try {
            let secretKey=  Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER;
            let token = Jwt.sign(tokenData, secretKey);
            return resolve(token);
        } catch (err) {
            return reject(err);
        }
    });
};




const verifyToken = function (token, callback) {

    return  new Promise((resolve, reject)=> {

        Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY_USER, function (err, decoded) {
            if (err) {
                reject(err)
            } else {
                resolve(getTokenFromDB(decoded._id, decoded.type,decoded.uniqueKey));
            }
        });
    });
};

const getTokenFromDB = async function (userId, userType,uniqueKey) {

    let criteria = {
        _id       : userId,
        uniqueKey : uniqueKey
    };

     if((await DAO.getData(Models.User,criteria, {}, {}))[0])
     {
         console.log("===**************************8============");
         return (await DAO.getData(Models.User,criteria, {}, {}))[0] ;
     }
     else
     {
         console.log("888837847384738574385789347584754375374857348573487");
         return Promise.reject(Config.APP_CONSTANTS.STATUS_MSG.ERROR.MISSING_AUTHENTICATION);
     }
};


module.exports = {
    generateToken : generateToken,
    verifyToken   : verifyToken
};