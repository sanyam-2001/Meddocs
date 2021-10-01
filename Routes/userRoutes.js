const express = require('express');

const router = express.Router();
const updateUser = require('../Controllers/updateUser');

router.put('/users', async (req, res)=>{
    const data = req.body;
    const response = await updateUser(data);
    res.json(response);
});




module.exports = router;