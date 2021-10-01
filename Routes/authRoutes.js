const express = require('express');
const createUser = require('../Controllers/createUser');
const loginUser = require('../Controllers/loginUser');
const router = express.Router();


router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const response = await createUser(email, password);
    res.json(response);
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const response = await loginUser(email, password);
    res.json(response)
})


module.exports = router;