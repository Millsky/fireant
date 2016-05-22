/**
 * Created by millsky on 1/27/16.
 */
const firebase = require('firebase');
const dataBase = new Firebase('https://fireants.firebaseio.com/');

var dataLayer = {};

dataLayer.setData = function (data) {
    dataBase.set(data);
};

dataLayer.addTeam = function (data) {
    
};

dataLayer.removeTeam = function (id) {
    
}



module.exports = dataLayer;


