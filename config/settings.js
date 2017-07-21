'use strict';

module.exports = {
  settings: {
    prilivege_transforms: {
      pre: {
        get: {
          '/b-admin': {
            entitytype: {
              account: 'EXT-UAC010: You must login as with an administrative account to have access',
            },
          },
          '/b-admin/settings': {
            entitytype: {
              account: 'EXT-UAC010: You must login as with an administrative account to have access',
            },
            privileges: {
              '_140': 'EXT-UAC140: You don\'t have access to view settings',
              '_740': 'EXT-UAC140: You don\'t have access to modify settings',
              '_160': 'EXT-UAC140: You don\'t have access to modify settings',
            },
          },
        },
        put: {},
        post: {},
        delete: {},
      },
      post: {
        get: {},
        put: {},
        post: {},
        delete: {},
      }
    },
  },
  databases: {},
};