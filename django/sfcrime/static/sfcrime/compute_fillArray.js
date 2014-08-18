var _ = require('underscore'),
    util = require('./util');

// TEST Speed to fill empty vs pre-allocated array.
//
util.compute3(1000, function(i) {
    var s = [], i, j;
    for (i=0; i < 256; i++) {
        for (j=0; j< 257; j++) {
            s[i * 257 + j] = j;
        }
    }
}, 'fill array, baseline');
util.compute3(1000, function(i) {
    var s = new Array(256*257), i, j;
    for (i=0; i < 256; i++) {
        for (j=0; j< 257; j++) {
            s[i * 257 + j] = j;
        }
    }
}, 'fill array, pre-allocate');

var fillA = function(m) {
    var n = m * 20000;
    var s = [];
    for (var i = 0; i < n; i++) {
        s[i] = i%256;
    }
}

var fillB = function(m) {
    var n = m * 20000;
    var s = new Array(n);
    for (var i = 0; i < n; i++) {
        s[i] = i%256;
    }
}

var fillC = function(m) {
    var n = m * 20000;
    var s = [];
    s.length = n;
    for (var i = 0; i < n; i++) {
        s[i] = i%256;
    }
}

for (var j=1; j < 10; j++) {
    // note: using compute3 does not work here, j is updated because the execution of fillA, thus all tests are run
    // will j=10.
    util.compute1(10, function(){ fillA(j); } , 'fillA array,'+j*20000);
}
for (var j=1; j < 10; j++) {
    util.compute1(10, function(){ fillB(j); } , 'fillB array,'+j*20000);
}

for (var j=1; j < 10; j++) {
    util.compute1(10, function(){ fillC(j); } , 'fillC array,'+j*20000);
}
