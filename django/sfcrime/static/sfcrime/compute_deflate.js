var _ = require('underscore'),
    util = require('./util');

util.print('start compute');

var zlib0 = require('../../../jsRender/zlib0'),
    deflate0 = zlib0.deflate0,
    copy = zlib0.copy,
    adler32 = zlib0.adler32,
    pako = require('pako'),
    zlib = require('../../../jsRender/libs/zlib.js/zlib.min.js'),
    n = 256*257,
    su = new Uint8Array(n),
    sa = [];

_.times(n, function(i){ su[i] = Math.floor(Math.random() * 256); });
sa = copy(su);
var chrMap = _.object(_.range(256), String.fromCharCode.apply(null,_.range(256)));
var chrList = _.map(_.range(256), function(i) { return String.fromCharCode(i); });

var s = sa;

util.compute3(100, function(i) { pako.deflateRaw(s, {level:0});}, 'Raw baseline level 0');
util.compute3(1000, function(i) { copy(sa);}, 'baseline copy Array');
util.compute3(1000, function(i) { copy(su);}, 'baseline copy Uint8Array');
util.compute3(1000, function(i) { deflate0(s);}, 'baseline defalte0');
util.compute3(1000, function(i) { deflate0(s, true);}, 'baseline zip0');
util.compute3(1000, function(i) { adler32(0, s, s.length, 0);}, 'adler32');
util.compute3(1000, function(i) { pako.deflateRaw(s, {level:0});}, 'baseline level 0');
util.compute3(1000, function(i) { pako.deflate(s, {level:0} );}, 'baseline level 0');
util.compute3(1000, function(i) { pako.deflate(s, {level:0, memLevel:1});}, 'baseline level 0, 1');
util.compute3(1000, function(i) { pako.deflate(s, {level:0, memLevel:2});}, 'baseline level 0, 2');
util.compute3(1000, function(i) { pako.deflate(s, {level:0, memLevel:3});}, 'baseline level 0, 3');
util.compute3(1000, function(i) { pako.deflate(s, {level:0, memLevel:4});}, 'baseline level 0, 4');
util.compute3(1000, function(i) { pako.deflate(s, {level:0, memLevel:5});}, 'baseline level 0, 5');
util.compute3(1000, function(i) { pako.deflate(s, {level:0, memLevel:6});}, 'baseline level 0, 6');
util.compute3(1000, function(i) { pako.deflate(s, {level:0, memLevel:7});}, 'baseline level 0, 7');
util.compute3(1000, function(i) { pako.deflate(s, {level:0, memLevel:8});}, 'baseline level 0, 8');
util.compute3(1000, function(i) { pako.deflate(s, {level:0, memLevel:9});}, 'baseline level 0, 9');
util.compute3(100, function(i) { pako.deflate(s, {level:0, to:'string'});}, 'pako.string');
