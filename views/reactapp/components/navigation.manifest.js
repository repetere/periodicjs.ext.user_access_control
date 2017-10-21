'use strict';
// const path = require('path');

module.exports = (periodic) => {
  const reactappLocals = periodic.locals.extensions.get('periodicjs.ext.reactapp');
  const reactapp = reactappLocals.reactapp();
  
  return {
    wrapper: {
      style: {},
    },
    container: {
      style: {},
    },
    layout: {
      component: 'Menu',
      props: {
        style: {},
      },
      children: [
        reactappLocals.server_manifest.core_navigation.getSidebarNav({
          title: 'Access Control Management',
          links: [
            {
              href: `${reactapp.manifest_prefix}ext/uac/manage-roles`,
              label: 'Manage Roles',
              id: 'uac-manage-roles',
            },
            {
              href: `${reactapp.manifest_prefix}ext/uac/account-access`,
              label: 'Account Access',
              id: 'uac-account-accesss',
            },
            {
              href: `${reactapp.manifest_prefix}ext/uac/user-access`,
              label: 'User Access',
              id: 'uac-user-accesss',
            },
          ]
        }),
      ],
    },
  };
};