'use strict';

var CoreUtilities,
    CoreController,
    appSettings,
    mongoose,
    Userrole,
    Userprivilege,
    logger;

/**
 * manage user role section
 * @param  {object} req 
 * @param  {object} res 
 * @return {object} reponds with an error page or requested view
 */
var index = function(req, res){
    CoreController.getPluginViewDefaultTemplate(
        {
            viewname:'p-admin/userroles/index',
            themefileext:appSettings.templatefileextension,
            extname: 'periodicjs.ext.admin'
        },
        function(err,templatepath){
            CoreController.handleDocumentQueryRender({
                res:res,
                req:req,
                renderView:templatepath,
                responseData:{
                    pagedata:{
                        title:'Manage Users Roles',
                        extensions:CoreUtilities.getAdminMenu()
                    },
                    userroles: req.controllerData.userroles,
                    user:req.user
                }
            });
        }
    );
};

/**
 * create user role form
 * @param  {object} req 
 * @param  {object} res 
 * @return {object} reponds with an error page or requested view
 */
var create = function (req, res) {
    var newuserrole = CoreUtilities.removeEmptyObjectValues(req.body);
    newuserrole.name = CoreUtilities.makeNiceName(newuserrole.title);
    newuserrole.author = [req.user._id];

    // console.log(newitem);
    CoreController.createModel({
        model: Userrole,
        newdoc: newuserrole,
        res: res,
        req: req,
        successredirect: '/p-admin/userrole/edit/',
        appendid: true
    });
};

/**
 * create a new usr role
 * @param  {object} req 
 * @param  {object} res 
 * @return {object} reponds with an error page or requested view
 */
var userrole_new = function(req, res){
    CoreController.getPluginViewDefaultTemplate(
        {
            viewname:'p-admin/userroles/new',
            themefileext:appSettings.templatefileextension,
            extname: 'periodicjs.ext.admin'
        },
        function(err,templatepath){
            CoreController.handleDocumentQueryRender({
                res:res,
                req:req,
                renderView:templatepath,
                responseData:{
                    pagedata:{
                        title:'New User Role',
                        headerjs: ['/extensions/periodicjs.ext.admin/js/useraccess.min.js'],
                        extensions:CoreUtilities.getAdminMenu()
                    },
                    userrole:null, //req.controllerData.userrole
                    user:req.user
                }
            });
        }
    );
};

/**
 * show user role
 * @param  {object} req 
 * @param  {object} res 
 * @return {object} reponds with an error page or requested view
 */
var show = function (req, res) {
    CoreController.getPluginViewDefaultTemplate({
            viewname:'p-admin/userroles/edit',
            themefileext:appSettings.templatefileextension,
            extname: 'periodicjs.ext.admin'
        },
        function (err, templatepath) {
            CoreController.handleDocumentQueryRender({
                res: res,
                req: req,
                renderView: templatepath,
                responseData: {
                    pagedata: {
                        title: req.controllerData.userrole.title,
                        headerjs: ['/extensions/periodicjs.ext.admin/js/useraccess.min.js'],
                        extensions:CoreUtilities.getAdminMenu()
                    },
                    userrole:req.controllerData.userrole,
                    user: req.user
                }
            });
        }
    );
};

/**
 * updates user role in database
 * @param  {object} req 
 * @param  {object} res 
 * @return {object} reponds with an error page or requested view
 */
var update = function (req, res) {
    var updateuserrole = CoreUtilities.removeEmptyObjectValues(req.body);

    updateuserrole.name = CoreUtilities.makeNiceName(updateuserrole.title);

    CoreController.updateModel({
        model: Userrole,
        id: updateuserrole.docid,
        updatedoc: updateuserrole,
        saverevision: true,
        population: 'privileges',
        res: res,
        req: req,
        successredirect: '/p-admin/userrole/edit/',
        appendid: true
    });
};

/**
 * deletes user role from database
 * @param  {object} req 
 * @param  {object} res 
 * @return {object} reponds with an error page or requested view
 */
var remove = function (req, res) {
    var userrole = req.controllerData.userrole;
    CoreController.deleteModel({
        model: Userrole,
        deleteid: userrole._id,
        req: req,
        res: res,
        callback: function(err){
             if (err) {
                CoreController.handleDocumentQueryErrorResponse({
                    err: err,
                    res: res,
                    req: req
                });
            }
            else {
                CoreController.handleDocumentQueryRender({
                    req: req,
                    res: res,
                    redirecturl: '/p-admin/userroles',
                    responseData: {
                        result: 'success',
                        data: 'deleted'
                    }
                });
            }
        }
    });
};

/**
 * user role controller
 * @module userroleController
 * @{@link https://github.com/typesettin/periodicjs.ext.user_access_control}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @requires module:periodicjs.core.utilities
 * @requires module:periodicjs.core.controller
 * @param  {object} resources variable injection from current periodic instance with references to the active logger and mongo session
 * @return {object}           userlogin
 */
var controller = function(resources){
    logger = resources.logger;
    mongoose = resources.mongoose;
    appSettings = resources.settings;
    CoreController = resources.core.controller;
    CoreUtilities = resources.core.utilities;
    Userrole = mongoose.model('Userrole');
    Userprivilege = mongoose.model('Userprivilege');
    // Usergroup = mongoose.model('Usergroup');

    return{
        index:index,
        create:create,
        userrole_new:userrole_new,
        show:show,
        update:update,
        remove:remove
    };
};

module.exports = controller;