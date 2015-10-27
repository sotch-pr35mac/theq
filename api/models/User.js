/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
     firstName: 'string',
     lastName: 'string',
     password: {
        required: true,
        type: 'string'
     },
     displayName: 'string',
     username: {
        required: true,
        unique: true,
        type: 'string'
     }
  }
};
