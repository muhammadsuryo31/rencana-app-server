const express = require('express');

const { authMiddleware } = require('../../middlewares');

const router = express.Router();

const login = require('./login');
const register = require('./register');
const refreshToken = require('./refreshToken');
const verify = require('./verify');
const reverify = require('./reverify');
const logout = require('./logout');
const getUser = require('./getUser');

router.post(login.route, login.handler);
router.post(register.route, register.handler );
router.post(refreshToken.route, refreshToken.handler);
router.post(verify.route, verify.handler);
router.post(reverify.route, reverify.handler)
router.post(logout.route, authMiddleware, logout.handler);
router.get(getUser.route, authMiddleware, getUser.handler);

module.exports = router;
