'use strict';

function hasPrivilege(user, privilege) {
  // console.log(' hasPrivilege user, privilege',user,privilege);
  return user.accounttype === 'admin' || user.privileges[privilege];
};

function stageUserRoles(user) {
  return Promisie.promisify(User.populate, User)(user, {
      path: 'userroles.privileges',
      model: 'Userprivilege'
    })
    .then(populated => {
      let privileges = {};
      for (let i = 0; i < populated.userroles.length; i++) {
        let roles = populated.userroles[i];
        for (let x = 0; x < roles.privileges.length; x++) {
          privileges[roles.privileges[x].userprivilegeid] = roles.privileges[x];
        }
      }
      return privileges;
    })
    .catch(e => Promisie.reject(e));
};

module.exports = {
  hasPrivilege,
};