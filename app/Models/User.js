'use strict';

const mongoose = require('mongoose'),
    Schema     = mongoose.Schema;



let User = new Schema({
    firstName              : {type:String, trim: true, index: true, required:true,default: ''},
    lastName               : {type:String, trim: true, index: true, default: '', sparse: true},
    fullName               : {type:String, trim: true, index: true,required:true, sparse: true},
    countryCode            : {type:String, trim: true, sparse:true,index:true, min:2, max:5},
    phoneNo                : {type:String, trim: true, index: true, min: 5, max: 15},
    fullNumber             : {type:String, trim: true, index: true, min: 5, max: 15},
    emailId                : {type:String, trim: true, index: true},
    password               : {type:String,default:''},
    OTP                    : {type:String }     ,
    isVerify               : {type:Boolean, default:false}     ,
    accessToken            : {type: String, trim: true, index: true, sparse: true},
    deviceToken            : {type:[String] }     ,
    uniqueKey              : {type:Number }     ,
    createdDate            : {type:Number, default: Date.now,index:true,required: true}
});




module.exports = mongoose.model('User',User);