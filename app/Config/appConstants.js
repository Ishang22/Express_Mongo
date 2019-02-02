

const SERVER = {
    APP_NAME: 'Assignment',
    JWT_SECRET_KEY_USER:    "#GD%$HFD&&$DFDKI12~#^%&*+_->?L%QF",
};




const STATUS_MSG = {
    ERROR: {
        DUPLICATE_EMAIL: {
            statusCode:400,
            customMessage : 'Email already exists',
            type : 'DUPLICATE_EMAIL'
        },
        DUPLICATE_PHONE_NUMBER :{
            statusCode:400,
            customMessage : 'Phone Number already exists',
            type : 'DUPLICATE_PHONE_NUMBER'
        },
        MISSING_AUTHENTICATION:{
            statusCode:401,
            customMessage : 'Missing Authentication',
            type : 'MISSING_AUTHENTICATION'
        }
},
    SUCCESS : {
        CREATED: {
            statusCode:200,
            customMessage : 'Created Successfully',
            type : 'CREATED'
        },
        DEFAULT: {
            statusCode:200,
            customMessage : 'Success',
            type : 'DEFAULT'
        },
        UPDATED: {
            statusCode:200,
            customMessage : 'Updated Successfully',
            type : 'UPDATED'
        },
        LOGOUT: {
            statusCode:200,
            customMessage : 'Logged Out Successfully',
            type : 'LOGOUT'
        },
        DELETED: {
            statusCode:200,
            customMessage : 'Deleted Successfully',
            type : 'DELETED'
        },
        REGISTER: {
            statusCode:200,
            customMessage : 'Register Successfully',
            type : 'REGISTER'
        }
    }
};

const swaggerDefaultResponseMessages = {
    '200': {'description': 'Success'},
    '400': {'description': 'Bad Request'},
    '401': {'description': 'Unauthorized'},
    '404': {'description': 'Data Not Found'},
    '500': {'description': 'Internal Server Error'}
};

const SCOPE = {
   USER:'USER'
};

let APP_CONSTANTS = {
    SERVER: SERVER,
    STATUS_MSG: STATUS_MSG,
    SCOPE     : SCOPE,
    swaggerDefaultResponseMessages: swaggerDefaultResponseMessages,
};



module.exports = APP_CONSTANTS;
