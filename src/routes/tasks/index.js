const express = require('express');

const { authMiddleware } = require('../../middlewares');

const create = require('./create');
const getOne = require('./getOne');
const getAll = require('./getAll');
const edit = require('./edit');
const remove = require('./remove');

const router = express.Router();

router.post(create.route, authMiddleware, create.handler);
router.get(getAll.route, authMiddleware, getAll.handler);
router.put(edit.route, authMiddleware, edit.handler);
router.get(getOne.route, authMiddleware, getOne.handler);
router.delete(remove.route, authMiddleware, remove.handler);

module.exports = router;
