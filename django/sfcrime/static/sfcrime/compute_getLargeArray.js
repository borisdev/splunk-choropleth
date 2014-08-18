window.$ = require('jquery');
var _ = require('underscore');
var util = require('./util');
window.util = util;

var testDataFloat = _.map(_.range(200000), function(i) {return Math.random();}).join(',');
var testDataInt = _.map(_.range(200000), function(i) {return Math.round(100000*Math.random());}).join(',');
var testDataFloatS = "["+testDataFloat+"]";
var testDataIntS = "["+testDataInt+"]";

var array_via_eval = function(code) {
    return eval(code);
};
var csv_to_array = function(csv) {
    var dat = csv.split(','),
        a = new Array(dat.length);
    for (var i; i < dat.length; i++) {
        a[i] = parseFloat(dat[i]);
    }
    return a;
};

var get_jsonp = function() {
    var uid = Math.random();
    util.timer(uid);
    f = function(resp) {
        window.dat = resp;
        util.timerEnd(uid);
    } 
    window.callback = f;
    var script = document.createElement('script');
    script.async = false;
    script.type= 'text/javascript';
    script.src = "data/income_i.jsonp";
    window.script = script;
    document.body.appendChild(script);
};

//util.compute1(10, function(){return testDataFloat.split(',')}, "split Float")
//util.compute1(10, function(){return testDataInt.split(',')}, "split Int")
//util.compute1(10, function(){csv_to_array(testDataFloat)}, "csv_to_array Float")
//util.compute1(10, function(){csv_to_array(testDataInt)}, "csv_to_array Int")
//get_jsonp();
//util.timer(1); $.getJSON('data/income_i.json').success(function(x){window.x = x; util.timerEnd(1);});
var opts = {
    dataType: 'json',
    async: false,
    url: "data/income_i.json"
}
util.compute1(10, function(){ $.ajax(opts).success(function(x){window.x = x;}); }, "csv_to_array Int")
