const { db } = require('../Config/firebase.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginUser = async (email, password) => {
    if (!email || !password) {
        return { statusCode: 401, error: ['Invalid Credentials!'], data: null }
    }
    const userDetails = await db.collection('users').where('email', '==', email).get();
    if(userDetails.docs.length === 0){
        return { statusCode: 401, error: ['User Not Found!'], data: null }
    }
    const validPassword = bcrypt.compareSync(password, userDetails.docs[0].data().password);
    if(!validPassword){
        return { statusCode: 401, error: ['Invalid password!'], data: null }
    }
    return {
        statusCode: 200,
        error: null,
        data: {
            UID: jwt.sign(userDetails.docs[0].id, process.env.JWT_SECRET),
            email,
            verified: userDetails.docs[0].data().verified
        }
    }

}

module.exports = loginUser