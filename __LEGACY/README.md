# periodicjs.ext.user_access_control

A User access control extension for Periodicjs that uses user roles and user privleges to controll access.

 [API Documentation](https://github.com/typesettin/periodicjs.ext.user_access_control/blob/master/doc/api.md)

## Installation

```
$ npm install periodicjs.ext.user_access_control
```

## Usage

### Check Access Example
```javascript
if(!User.hasPrivilege(req.user,110)){
  next(new Error('EXT-UAC110: You don\'t have access to view content'));
}
```

##Development
*Make sure you have grunt installed*
```
$ npm install -g grunt-cli
```

Then run grunt watch
```
$ grunt watch
```
For generating documentation
```
$ grunt doc
$ jsdoc2md controller/**/*.js index.js install.js uninstall.js > doc/api.md
```
##Notes
* Check out https://github.com/typesettin/periodicjs for the full Periodic Documentation