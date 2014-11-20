'use strict';

/**
 * A User access control extension for Periodicjs that uses user roles and user privleges to controll access.
 * @{@link https://github.com/typesettin/periodicjs.ext.user_access_control}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @exports periodicjs.ext.user_access_control
 * @param  {object} periodic variable injection of resources from current periodic instance
 */
module.exports = function (periodic) {
	// express,app,logger,config/settings,db
	var adminRouter = periodic.express.Router(),
		// periodicRouter = periodic.express.Router(),
		authController = require('../periodicjs.ext.login/controller/auth')(periodic),
		userroleController = require('./controller/userrole')(periodic),
		uacController = require('./controller/uac')(periodic);

	adminRouter.get('*', global.CoreCache.disableCache);
	adminRouter.post('*', global.CoreCache.disableCache);
	// periodicRouter.get('*', global.CoreCache.disableCache);
	// periodicRouter.post('*', global.CoreCache.disableCache);
	adminRouter.all('*', authController.ensureAuthenticated, uacController.loadUserRoles, uacController.check_user_access);

	//user roles
	adminRouter.get('/userroles', uacController.loadUserAccesControls, userroleController.index);
	adminRouter.get('/userrole/new', userroleController.userrole_new);
	adminRouter.get('/userrole/:id', uacController.loadUserrole, userroleController.show);
	adminRouter.get('/userrole/edit/:id', uacController.loadUserrole, userroleController.show);
	adminRouter.post('/userrole/new', userroleController.create);
	adminRouter.post('/userrole/edit', userroleController.update);
	adminRouter.post('/userrole/:id/delete', uacController.loadUserrole, userroleController.remove);
	adminRouter.get('/userroles/search.:ext', global.CoreCache.disableCache, uacController.loadUserroles, uacController.userroleSearchResults);
	adminRouter.get('/userroles/search', global.CoreCache.disableCache, uacController.loadUserroles, uacController.userroleSearchResults);


	//user priviliges
	adminRouter.get('/userprivileges/search.:ext', global.CoreCache.disableCache, uacController.loadUserprivileges, uacController.userprivilegeSearchResults);
	adminRouter.get('/userprivileges/search', global.CoreCache.disableCache, uacController.loadUserprivileges, uacController.userprivilegeSearchResults);

	//add routes
	periodic.app.use('/p-admin', adminRouter);
	// periodic.app.use(periodicRouter);
};
