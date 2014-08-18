var util = require('./util'),
    _ = require('underscore');


var n = 200000;
var ids = _.range(n);
var list = [];
var list_preAllocate = new Array(n);
var object = {};
for (var i=0; i< n; i++){
    list[i] = i%256;
    list_preAllocate[i] = i%256;
    object[i] = i%256;
}
list[0] = 0; list[1] = 1;
list_preAllocate[0] = 0; list_preAllocate[1] = 1;
object[0] = 0; object[1] = 1;

var list2 = function(i) { 
    return list[i];
};
var getCL = function(ids, f) {
    var cl = [];
    for (var i=0; i<ids.length; i++) {
        cl[i] = f(i);
    }
    return cl;
};
var getCLB = function(ids, classification) {
    var cl = [];
    for (var i=0; i<ids.length; i++) {
        cl[i] = classification[i];
    }
    return cl;
};

var tests = 100;
util.compute1(tests, function(i){ getCL(ids, function(x){return 0;})}, 'null');
util.compute1(tests, function(i){ getCL(ids, function(x){return list[x];})}, 'list');
util.compute1(tests, function(i){ getCL(ids, function(x){return list_preAllocate[x];})}, 'list_preAllocate');
util.compute1(tests, function(i){ getCL(ids, function(x){return object[x];})}, 'object');
util.compute1(tests, function(i){ getCL(ids, function(x){return list2(x);})}, 'func');
util.compute1(tests, function(i){ getCLB(ids, list)}, 'direct list');
util.compute1(tests, function(i){ getCLB(ids, list_preAllocate)}, 'direct list_preAllocate');
util.compute1(tests, function(i){ getCLB(ids, object)}, 'direct object');
