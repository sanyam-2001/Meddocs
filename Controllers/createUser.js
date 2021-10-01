const { db } = require('../Config/firebase.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createUser = async (email, password) => {

    if (!email || !password) {
        return { statusCode: 401, error: ['Invalid Credentials!'], data: null }
    }
    //Validate Email
    let ErrorList = []
    const doesEmailExists = await db.collection('users').where('email', '==', email).get()
    if (doesEmailExists.docs.length !== 0) {
        ErrorList.push('Email Already Taken!');
    }
    if (email.indexOf('@') === -1) {
        ErrorList.push('Invalid Email');
    }
    if (password.length < 6) {
        ErrorList.push('Password must contain atleast 6 Characters!');
    }
    if (ErrorList.length !== 0) {
        return { statusCode: 401, error: ErrorList, data: null }
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const savedUser = await db.collection('users').add({
        email,
        password : hashedPassword,
        signedIn: true,
        verified: false
    });
    return {
        statusCode: 200,
        error: null,
        data: {
            token: jwt.sign(savedUser._path.segments[1], process.env.JWT_SECRET),
            UID: savedUser._path.segments[1],
            email,
            verified: false
        }
    }
}

module.exports = createUser;