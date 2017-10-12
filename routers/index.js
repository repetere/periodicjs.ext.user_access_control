'use strict';

const periodic = require('periodicjs');
const extensionRouter = periodic.express.Router();
const extRouter = require('./ext');

extensionRouter.use('/b-admin/ext/user_access_control', extRouter);

module.exports = extensionRouter;