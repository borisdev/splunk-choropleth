var _ = require('underscore'),
    util = require('./util');

util.print('start compute');

var n = 256*257,
    su = new Uint8Array(n),
    sa = [];

_.times(n, function(i){ su[i] = Math.floor(Math.random() * 256); });
sa = copy(su);
var chrMap = _.object(_.range(256), String.fromCharCode.apply(null,_.range(256)));
var chrList = _.map(_.range(256), function(i) { return String.fromCharCode(i); });

function omap(a) {
    var out = new Array(a.length);
    for (var i = 0; i<a.length; i++) {
        out[i] = chrMap[a[i]];
    }
    return out;
}
function fmap(a) {
    var out = new Array(a.length);
    for (var i = 0; i<a.length; i++) {
        out[i] = String.fromCharCode(a[i]);
    }
    return out;
}
function omap1(a) {
    var out = "",
        i = 0;
    while (i < (a.length - (a.length % 10))) {
        out+= String.fromCharCode.call(null, a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++]);
    }
    while (i < a.length) {
        out+= String.fromCharCode(a[i++]);
    }
    return out;
}
function omap2(a) {
    var out = "",
        i = 0;
    while (i < (a.length - (a.length % 100))) {
        out+= String.fromCharCode.call(null,
             a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++],
             a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++],
             a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++],
             a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++],
             a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++],
             a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++],
             a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++],
             a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++],
             a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++],
             a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++], a[i++]
        );
    }
    while (i < a.length) {
        out+= String.fromCharCode(a[i++]);
    }
    return out;
}
function omap3(CHUNK_SIZE) {
    var chunk = new Array(CHUNK_SIZE),
        body = "";
    for (var i=0; i<CHUNK_SIZE; i++) {
        chunk[i] = 'a[i++]';
    }
    body = "var CHUNK_SIZE="+CHUNK_SIZE+", out='', i = 0; while (i < a.length - a.length % CHUNK_SIZE) { out+=String.fromCharCode.call(null,";
    body+= chunk;
    body+= ");} while (i < a.length) { out+=String.fromCharCode(a[i++]); } return out;"
    return new Function('a', body)
}

function a2s(a){
    var s = '', i = 0, CHUNK = 25000, len;
    if (a instanceof Array) {
        for (i=0; i<a.length; i+=1) {
            s += String.fromCharCode.call(null, a[i]);
        }   
    } else {
        for (i=0; i<a.length; i+=CHUNK) {
            len = CHUNK;
            if (i+len > a.length) len = a.length - i;
            //s += String.fromCharCode.apply(null, new Uint8Array(a.buffer,i,len));
            s += String.fromCharCode.apply(null, a.subarray(i,i+len));
        }
    }
    return s;
}
function bitwise() {
    var out = [], adler = 2309737967;
    out[0] = (adler >> 24) & 0xff;
    out[1] = (adler >> 16) & 0xff;
    out[2] = (adler >> 8) & 0xff;
    out[3] = adler & 0xff;
    return out;
}
var f16 = omap3(400); util.compute3(1000, function(i) { f16(sa);}, 'omap3 CHUNK '+400);
var f15 = omap3(375); util.compute3(1000, function(i) { f15(sa);}, 'omap3 CHUNK '+375);
var f14 = omap3(350); util.compute3(1000, function(i) { f14(sa);}, 'omap3 CHUNK '+350);
var f13 = omap3(325); util.compute3(1000, function(i) { f13(sa);}, 'omap3 CHUNK '+325);
var f12 = omap3(300); util.compute3(1000, function(i) { f12(sa);}, 'omap3 CHUNK '+300);
var f11 = omap3(275); util.compute3(1000, function(i) { f11(sa);}, 'omap3 CHUNK '+275);
var f10 = omap3(250); util.compute3(1000, function(i) { f10(sa);}, 'omap3 CHUNK '+250);
var f9 = omap3(225); util.compute3(1000, function(i) { f9(sa);}, 'omap3 CHUNK '+225);
var f8 = omap3(200); util.compute3(1000, function(i) { f8(sa);}, 'omap3 CHUNK '+200);
var f7 = omap3(175); util.compute3(1000, function(i) { f7(sa);}, 'omap3 CHUNK '+175);
var f6 = omap3(150); util.compute3(1000, function(i) { f6(sa);}, 'omap3 CHUNK '+150);
var f5 = omap3(125); util.compute3(1000, function(i) { f5(sa);}, 'omap3 CHUNK '+125);
var f4 = omap3(100); util.compute3(1000, function(i) { f4(sa);}, 'omap3 CHUNK '+100);
var f3 = omap3(75); util.compute3(1000, function(i) { f3(sa);}, 'omap3 CHUNK '+75);
var f2 = omap3(50); util.compute3(1000, function(i) { f2(sa);}, 'omap3 CHUNK '+50);
var f1 = omap3(25); util.compute3(1000, function(i) { f1(sa);}, 'omap3 CHUNK '+25);
//var funcs = {};
//for (var size = 25; size < 251; size += 25) {
//    funcs[size] = omap3(size); compute1(1000, function(i) { funcs[size](sa);}, 'omap3 CHUNK '+size);
//}
