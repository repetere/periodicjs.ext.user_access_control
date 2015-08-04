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
	periodic.app.controller.extension.user_access_control = {
		uac: require('./controller/uac')(periodic)
	};
	var adminRouter = periodic.express.Router(),
		authController = periodic.app.controller.extension.login.auth,
		uacController = periodic.app.controller.extension.user_access_control.uac;

	adminRouter.all('*', authController.ensureAuthenticated, uacController.loadUserRoles, uacController.check_user_access);
	
	periodic.app.use('/p-admin', adminRouter);

	//add routes
	return periodic;
};
