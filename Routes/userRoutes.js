const express = require('express');
const router = express.Router();

const AuthJWT = require('../Middlewares/AuthJWT')
const updateUser = require('../Controllers/updateUser');

router.put('/users', AuthJWT, async (req, res) => {
    const data = req.body;
    const response = await updateUser(data, req.UID);
    res.json(response);
});




module.exports = router;