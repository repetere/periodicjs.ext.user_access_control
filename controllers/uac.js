'use strict';
const periodic = require('periodicjs');

function skipInvalid(req, res, next) {
  req.controllerData = req.controllerData || {};
  req.controllerData.skipIfInvalid = true;
  next();
};
// uacController.loadUserRoles, uacController.check_user_access

function loadUserRoles(req, res, next) {
  var requserroles = {};
  req.controllerData = (req.controllerData) ? req.controllerData : {};

  if (req.isAuthenticated()) {
    if (req.session && req.session.userprivilegesdata /* && true===false */ ) {
      req.user.privileges = req.session.userprivilegesdata;
      req.controllerData.userprivileges = req.session.userprivilegesdata;
      next();
    } else {
      if (req.user && Array.isArray(req.user.userroles) && req.user.userroles[0] && !req.user.userroles.privileges) {
        Promisie.promisify(User.populate, User)(req.user, {
            path: 'userroles',
            model: 'Userrole'
          })
          .then(stageUserRoles)
          .then(privileges => {
            req.user.privileges = privileges;
            req.session.userprivilegesdata = privileges;
            req.controllerData.userprivileges = privileges;
            next();
          })
          .catch(next);
      } else {
        stageUserRoles(req.user)
          .then(privileges => {
            req.user.privileges = privileges;
            req.session.userprivilegesdata = privileges;
            req.controllerData.userprivileges = privileges;
            next();
          })
          .catch(next);
      }
    }
  } else {
    next();
  }
};

/**
 * check user access for admin section
 * @param  {object} req 
 * @param  {object} res 
 * @return {object} reponds with an error page or requested view
 */
function check_user_access(req, res, next) {
  var httpmethod = req.method,
    httpurl = path.resolve(req.originalUrl.toLowerCase());
  // console.log(req.user.acounttype);
  // console.log(req.method,req.originalUrl);
  // http://stackoverflow.com/questions/6579308/javascript-inoperant-switch-case-with-a-regex
  // var testme = "pwd_foo", response;
  // var reg = /^pwd.+/;
  switch (true) {
    // case testme=='pwd':
    //     response = 'case1';
    //     break;
    // case reg.test(testme):
    //     response = 'case2';
    //     break;
    case httpurl === '/p-admin/items' || httpurl === '/p-admin/collections' || httpurl === '/p-admin/contenttypes' || httpurl === '/p-admin/tags' || httpurl === '/p-admin/categories' || httpurl === '/p-admin/assets':
      if (!User.hasPrivilege(req.user, 110)) {
        next(new Error('EXT-UAC110: You don\'t have access to view content'));
      } else {
        next();
      }
      break;
    case httpurl === '/p-admin/item/new' || httpurl === '/p-admin/collection/new' || httpurl === '/item/new' || httpurl === '/tag/new' || httpurl === '/collection/new' || httpurl === '/category/new' || httpurl === '/contenttype/new':
      if (!User.hasPrivilege(req.user, 110)) {
        next(new Error('EXT-UAC110: You don\'t have access to create content'));
      } else if (!User.hasPrivilege(req.user, 310)) {
        next(new Error('EXT-UAC310: You don\'t have access to create content'));
      } else {
        next();
      }
      break;
    case httpurl === '/item/new':
      if (httpmethod === 'POST' && !User.hasPrivilege(req.user, 310)) {
        next(new Error('EXT-UAC310: You don\'t have access to publish new content'));
      } else {
        next();
      }
      break;
    case (/p-admin\/item/gi.test(httpurl)):
      if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 710)) {
        next(new Error('EXT-UAC710: You don\'t have access to modify content'));
      } else if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 710)) {
        next(new Error('EXT-UAC710: You don\'t have access to delete content'));
      } else {
        next();
      }
      break;
    case (/p-admin\/collection/gi.test(httpurl)):
      if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 710)) {
        next(new Error('EXT-UAC710: You don\'t have access to modify content'));
      } else if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 910)) {
        next(new Error('EXT-UAC910: You don\'t have access to delete content'));
      } else {
        next();
      }
      break;
    case (/p-admin\/theme/gi.test(httpurl)):
      if (!User.hasPrivilege(req.user, 120)) {
        next(new Error('EXT-UAC120: You don\'t have access to view themes'));
      } else if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 320)) {
        next(new Error('EXT-UAC320: You don\'t have access to install themes'));
      } else if (/enable/gi.test(httpurl) && !User.hasPrivilege(req.user, 720)) {
        next(new Error('EXT-UAC720: You don\'t have access to modify themes'));
      } else if (/delete/gi.test(httpurl) && !User.hasPrivilege(req.user, 920)) {
        next(new Error('EXT-UAC920: You don\'t have access to delete themes'));
      } else {
        next();
      }
      break;
    case (/p-admin\/extension/gi.test(httpurl)):
      if (!User.hasPrivilege(req.user, 130)) {
        next(new Error('EXT-UAC130: You don\'t have access to view extensions'));
      } else if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 330)) {
        next(new Error('EXT-UAC330: You don\'t have access to install extensions'));
      } else if (/enable/gi.test(httpurl) && !User.hasPrivilege(req.user, 730)) {
        next(new Error('EXT-UAC730: You don\'t have access to modify extensions'));
      } else if (/disable/gi.test(httpurl) && !User.hasPrivilege(req.user, 730)) {
        next(new Error('EXT-UAC730: You don\'t have access to modify extensions'));
      } else if (/delete/gi.test(httpurl) && !User.hasPrivilege(req.user, 930)) {
        next(new Error('EXT-UAC920: You don\'t have access to delete extensions'));
      } else {
        next();
      }
      break;
    case (/p-admin\/setting/gi.test(httpurl)):
      if (!User.hasPrivilege(req.user, 140)) {
        next(new Error('EXT-UAC140: You don\'t have access to view settings'));
      } else if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 740)) {
        next(new Error('EXT-UAC740: You don\'t have access to modify settings'));
      } else {
        next();
      }
      break;
    case httpurl === '/p-admin/users':
      if (!User.hasPrivilege(req.user, 150)) {
        next(new Error('EXT-UAC150: You don\'t have access to view users'));
      } else if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 350)) {
        next(new Error('EXT-UAC350: You don\'t have access to add new users'));
      } else if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 750)) {
        next(new Error('EXT-UAC750: You don\'t have access to modify users'));
      } else if (/delete/gi.test(httpurl) && !User.hasPrivilege(req.user, 950)) {
        next(new Error('EXT-UAC950: You don\'t have access to delete users'));
      } else {
        next();
      }
      break;
    case (/p-admin\/userrole/gi.test(httpurl)):
      if (!User.hasPrivilege(req.user, 160)) {
        next(new Error('EXT-UAC160: You don\'t have access to view users access'));
      } else if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 360)) {
        next(new Error('EXT-UAC320: You don\'t have access to modify user access'));
      } else if (httpmethod.toLowerCase() === 'post' && !User.hasPrivilege(req.user, 760)) {
        next(new Error('EXT-UAC750: You don\'t have access to modify user access'));
      } else if (/delete/gi.test(httpurl) && !User.hasPrivilege(req.user, 960)) {
        next(new Error('EXT-UAC960: You don\'t have access to delete user roles'));
      } else {
        next();
      }
      break;
    default:
      next();
      break;
  }
};

module.exports = {
  skipInvalid,
  loadUserRoles,
}