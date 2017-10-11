'use strict';
const periodic = require('periodicjs');
function testPreTransform(req) {
  return new Promise((resolve, reject) => {
    periodic.logger.silly('sample pre transfrom', req.params.id);
    resolve(req);
  });
}

function cleanUpRoles(req) {
  return new Promise((resolve, reject) => {
    if (req.controllerData && req.controllerData.standard_accounts && req.controllerData.standard_accounts.standard_accounts && req.controllerData.standard_accounts.standard_accounts.documents) {
      req.controllerData.standard_accounts.standard_accounts.documents.forEach(account => {
        if (account.userroles) {
          account.userroles.forEach((roles, i) => {
            account.userroles[i] = `${roles.userroleid} (${roles.description})`;
          });
        }
      });
    } 
    if (req.controllerData && req.controllerData.standard_users && req.controllerData.standard_users.standard_users &&req.controllerData.standard_users.standard_users.documents) {
      req.controllerData.standard_users.standard_users.documents.forEach(user => {
        if (user.userroles) {
          user.userroles.forEach((roles, i) => {
            user.userroles[i] = `${roles.userroleid} (${roles.description})`;
          });
        }
      });
    }
    resolve(req);
  });
}

function cleanUpUserRoles(req) {
  return new Promise((resolve, reject) => {
    if (req.controllerData && req.controllerData.standard_userroles && req.controllerData.standard_userroles.standard_userroles &&req.controllerData.standard_userroles.standard_userroles.documents) {
      req.controllerData.standard_userroles.standard_userroles.documents.forEach(userroles => {
        if (userroles.privileges) {
          userroles.privileges.forEach((privileges, i) => {
            userroles.privileges[i] = `${privileges.userprivilegeid} (${privileges.title})`;
          });
        }
      });
    }
    resolve(req);
  });
}

module.exports = {
  pre: {
    GET: {
      '/some/route/path/:id':[testPreTransform]
    },
    PUT: {
    }
  },
  post: {
    GET: {
      '/b-admin/ext/user_access_control/standard_users':[cleanUpRoles],
      '/b-admin/ext/user_access_control/standard_accounts':[cleanUpRoles],
      '/b-admin/ext/user_access_control/standard_userroles':[cleanUpUserRoles]
    },
    PUT: {
    }
  }
}