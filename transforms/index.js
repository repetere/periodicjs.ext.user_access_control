'use strict';
const periodic = require('periodicjs');
const logger = periodic.logger;

function testPreTransform(req) {
  return new Promise((resolve, reject) => {
    periodic.logger.silly('sample pre transfrom', req.params.id);
    resolve(req);
  });
}

/**
 * This function cleans up the roles object to show only the role userroleid and description.
 * @param {Object} req Express req object.
 */
function showRoles(req) {
  return new Promise((resolve, reject) => {
    let documents;
    if (req.controllerData && req.controllerData.standard_accounts && req.controllerData.standard_accounts.standard_accounts && req.controllerData.standard_accounts.standard_accounts.documents) {
      documents = req.controllerData.standard_accounts.standard_accounts.documents;
    } else if (req.controllerData && req.controllerData.standard_users && req.controllerData.standard_users.standard_users &&req.controllerData.standard_users.standard_users.documents) {
      documents = req.controllerData.standard_users.standard_users.documents
    }
    documents.forEach(doc => {
      if (doc.userroles) {
        doc.userroles.forEach((roles, i) => {
          doc.userroles[i] = `${roles.userroleid} (${roles.description})`;
        });
      }
    });
    resolve(req);
  });
}

/**
 * This function cleans up the privileges object to show only the privilege userprivilegeid and title.
 * @param {Object} req Express req object.
 */
function showPrivileges(req) {
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

/**
 * This function cleans up the roles object to show only the role userroleid in the textarea field for the put request.
 * @param {Object} req Express req object.
 */
function showRolesInTextArea(req) {
  return new Promise((resolve, reject) => {
    let roles;
    if (req.controllerData && req.controllerData.standard_account && req.controllerData.standard_account.userroles) {
      roles = req.controllerData.standard_account.userroles;
    } else if (req.controllerData && req.controllerData.standard_user && req.controllerData.standard_user.userroles) {
      roles = req.controllerData.standard_user.userroles;
    }
    roles.forEach((role, i) => {
      roles[i] = role.userroleid;
    });
    resolve(req);
  })
}

/**
 * This function modifies the roles object to show only the mongoose id in the userrole property for user/account.
 * @param {Object} req Express req object.
 */
function modifyRoles(req) {
  return new Promise ((resolve, reject) => {
    let model;
    if (req.url.split('/')[1] === 'standard_accounts') model = periodic.datas.get('standard_account');
    if (req.url.split('/')[1] === 'standard_users') model = periodic.datas.get('standard_user');
    let userroles = [];
    let checkUserroles = {};
    periodic.datas.get('standard_userrole').query({ query: { userroleid: { $in : JSON.parse(req.body.genericdocjson), }, } })
      .then(result => {
        result.forEach(role => {
          userroles.push(role._id);
          checkUserroles[role.userroleid] = 1;
        })
        if (userroles.length !== JSON.parse(req.body.genericdocjson).length) {
          let dne = JSON.parse(req.body.genericdocjson).filter(id => {
            return checkUserroles[id] === undefined;
          })
          reject(`Userroleid(s) ${dne} do not exist`);
        } 
      })
      .then(() => {
        return model.update({ id: req.params.id, updatedoc: { userroles, }, depopulate: false, })
                .catch(err => {
                  logger.error('Unable to update:', err)
                  reject(err);
                });
      })
      .then(() => {
        resolve(req);
      })
      .catch(err => {
        logger.error('Unable to query for userroleid', err);
        reject(err);
      });
  })
}

module.exports = {
  pre: {
    GET: {
      '/some/route/path/:id':[testPreTransform]
    },
    PUT: {
      '/b-admin/ext/user_access_control/standard_users/:id':[modifyRoles],
      '/b-admin/ext/user_access_control/standard_accounts/:id':[modifyRoles],
    }
  },
  post: {
    GET: {
      '/b-admin/ext/user_access_control/standard_users':[showRoles],
      '/b-admin/ext/user_access_control/standard_accounts':[showRoles],
      '/b-admin/ext/user_access_control/standard_users/:id':[showRolesInTextArea],
      '/b-admin/ext/user_access_control/standard_accounts/:id':[showRolesInTextArea],
      '/b-admin/ext/user_access_control/standard_userroles':[showPrivileges]
    },
    PUT: {
    }
  }
}