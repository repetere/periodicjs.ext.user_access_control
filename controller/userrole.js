'use strict';

var Utilities = require('periodicjs.core.utilities'),
    ControllerHelper = require('periodicjs.core.controllerhelper'),
    CoreUtilities,
    CoreController,
    appSettings,
    mongoose,
    Userrole,
    Userprivilege,
    logger;

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

var controller = function(resources){
    logger = resources.logger;
    mongoose = resources.mongoose;
    appSettings = resources.settings;
    CoreController = new ControllerHelper(resources);
    CoreUtilities = new Utilities(resources);
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