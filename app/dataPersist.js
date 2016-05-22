/**
 * Created by millsky on 2/29/16.
 */
var dataPersist = angular.module('fireant.data',[]);

dataPersist.service('persist',[function () {
    var data = {};
    var cb = {};

    var set = function (p, v) {
        data[p] = v;
        notify(p);
    }
    var get = function (p) {
        return data[p];
    }

    var notify = function (p) {
        if(cb[p] !== undefined) {
            for (i = 0; i < cb[p].length; i++) {
                console.log("NOTIFIED!");
                cb[p][i]();
            }
        }
    }

    var listen = function(p,f){
        if(cb[p] == undefined){
            cb[p] = [];
        }
        cb[p].push(f);
    }

    return {
        get: get,
        set: set,
        listen:listen
    }
}]);