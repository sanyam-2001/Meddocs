const jwt = require('jsonwebtoken');
const AuthJWT = (req, res, next) => {
    const AuthHeader = req.headers.authorization;
    if (!AuthHeader) {
        return req.json({ statusCode: 400, error: 'No Auth Header present on request!', data: null })
    }
    const segments = AuthHeader.split(' ');
    if(segments.length!==2){
        return req.json({statusCode: 400, error: 'Inavlid Auth Header Format', data: 'Format: `BEARER ${JWT}`'});
    }
    const signedJWT = segments[1];
    try{
        const userID = jwt.verify(signedJWT, process.env.JWT_SECRET);
        req.UID = userID;
    }
    catch(err){
        return res.json({statusCode: 400, error: err, data: null})
    }
    next();
}

module.exports = AuthJWT