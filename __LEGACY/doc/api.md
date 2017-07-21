#Index

**Modules**

* [periodicjs.ext.user_access_control](#periodicjs.ext.module_user_access_control)
* [uacController](#module_uacController)
* [userroleController](#module_userroleController)

**Functions**

* [createUACObject(req, res)](#createUACObject)
* [createUsergroup(req, res)](#createUsergroup)
* [createUserrole(req, res)](#createUserrole)
* [createUserprivilege(req, res)](#createUserprivilege)
* [loadUacObject(req, res)](#loadUacObject)
* [loadUsergroup(req, res)](#loadUsergroup)
* [loadUserrole(req, res)](#loadUserrole)
* [loadUserprivilege(req, res)](#loadUserprivilege)
* [loadUacObjects(req, res)](#loadUacObjects)
* [loadUsergroups(req, res)](#loadUsergroups)
* [loadUserroles(req, res)](#loadUserroles)
* [loadUserprivileges(req, res)](#loadUserprivileges)
* [searchResults(req, res)](#searchResults)
* [userroleResults(req, res)](#userroleResults)
* [userprivilegeResults(req, res)](#userprivilegeResults)
* [usergroupResults(req, res)](#usergroupResults)
* [loadUacUsers(req, res)](#loadUacUsers)
* [loadUserAccesControls(req, res)](#loadUserAccesControls)
* [uacSearchResults(req, res)](#uacSearchResults)
* [userroleSearchResults(req, res)](#userroleSearchResults)
* [userprivilegeSearchResults(req, res)](#userprivilegeSearchResults)
* [usergroupSearchResults(req, res)](#usergroupSearchResults)
* [loadUserRoles(req, res)](#loadUserRoles)
* [check_user_access(req, res)](#check_user_access)
* [index(req, res)](#index)
* [create(req, res)](#create)
* [userrole_new(req, res)](#userrole_new)
* [show(req, res)](#show)
* [update(req, res)](#update)
* [remove(req, res)](#remove)
 
<a name="periodicjs.ext.module_user_access_control"></a>
#periodicjs.ext.user_access_control
A User access control extension for Periodicjs that uses user roles and user privleges to controll access.

**Params**

- periodic `object` - variable injection of resources from current periodic instance  

**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
<a name="module_uacController"></a>
#uacController
user access control controller

**Params**

- resources `object` - variable injection from current periodic instance with references to the active logger and mongo session  

**Returns**: `object` - userlogin  
**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
<a name="module_userroleController"></a>
#userroleController
user role controller

**Params**

- resources `object` - variable injection from current periodic instance with references to the active logger and mongo session  

**Returns**: `object` - userlogin  
**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
<a name="createUACObject"></a>
#createUACObject(req, res)
creates a new uac document (user role, user group, or use privilege)

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="createUsergroup"></a>
#createUsergroup(req, res)
create a new user group

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="createUserrole"></a>
#createUserrole(req, res)
create a new user role

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="createUserprivilege"></a>
#createUserprivilege(req, res)
create a new user privilege

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUacObject"></a>
#loadUacObject(req, res)
loads a UAC document (privilege,role or group) with population

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUsergroup"></a>
#loadUsergroup(req, res)
loads a user group, populated with it's roles

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUserrole"></a>
#loadUserrole(req, res)
loads a user role, populated with it's privileges

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUserprivilege"></a>
#loadUserprivilege(req, res)
loads a user privilege

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUacObjects"></a>
#loadUacObjects(req, res)
loads a uac objects

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUsergroups"></a>
#loadUsergroups(req, res)
loads a user groups, populated with roles

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUserroles"></a>
#loadUserroles(req, res)
loads a user roles, populated with privileges

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUserprivileges"></a>
#loadUserprivileges(req, res)
loads a user privileges

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="searchResults"></a>
#searchResults(req, res)
loads a user groups, populated with roles

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="userroleResults"></a>
#userroleResults(req, res)
search results for user roles

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="userprivilegeResults"></a>
#userprivilegeResults(req, res)
search results for user privileges

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="usergroupResults"></a>
#usergroupResults(req, res)
search results for user groups

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUacUsers"></a>
#loadUacUsers(req, res)
load users with access control populated

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUserAccesControls"></a>
#loadUserAccesControls(req, res)
loads user groups

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="uacSearchResults"></a>
#uacSearchResults(req, res)
searches uac objects

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="userroleSearchResults"></a>
#userroleSearchResults(req, res)
searches user roles

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="userprivilegeSearchResults"></a>
#userprivilegeSearchResults(req, res)
searches user privileges

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="usergroupSearchResults"></a>
#usergroupSearchResults(req, res)
searches user groups

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="loadUserRoles"></a>
#loadUserRoles(req, res)
loads a user roles and privileges and stores them in the active session

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="check_user_access"></a>
#check_user_access(req, res)
check user access for admin section

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="index"></a>
#index(req, res)
manage user role section

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="create"></a>
#create(req, res)
create user role form

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="userrole_new"></a>
#userrole_new(req, res)
create a new usr role

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="show"></a>
#show(req, res)
show user role

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="update"></a>
#update(req, res)
updates user role in database

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
<a name="remove"></a>
#remove(req, res)
deletes user role from database

**Params**

- req `object`  
- res `object`  

**Returns**: `object` - reponds with an error page or requested view  
