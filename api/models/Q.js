/**
* Q.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @author      :: Preston Stosur-Bassett (www.stosur.info)
* @date        :: June 6, 2015
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
     location: 'string', //The store location name for the line

     //The actual Queue, the line as it's called for the current location
     line: {
        type: 'array',
        defaultTo: []
     }

  }
};
