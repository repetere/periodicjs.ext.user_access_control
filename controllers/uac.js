'use strict';
const periodic = require('periodicjs');
const utilities = require('../utilities');

function skipInvalid(req, res, next) {
  req.controllerData = req.controllerData || {};
  req.controllerData.skipIfInvalid = true;
  next();
};
// uacController.loadUserRoles, uacController.check_user_access

function loadUserRoles(req, res, next) {
  req.controllerData = req.controllerData || {};
  if (req.isAuthenticated()) {
    if (req.session && req.session.userprivilegesdata) {
      utilities.privilege.setUserSessionFromSessionPrivileges({ req, next });
    } else {
      utilities.privilege.getPrivilegesFromRoles({ req, user: req.user, })
        .then(privileges => utilities.privilege.setPrivilegesOnUser({
          req,
          next,
          privileges,
        }))
        .catch(next);
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
  next();
};

module.exports = {
  skipInvalid,
  loadUserRoles,
  check_user_access,
}