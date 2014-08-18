var _ = require('underscore'),
    util = require('./util'),
    data = _.times(33144, function(){return _.random(0,5);}),
    data2 = _.times(33144, function(){return _.random(0,5);});

var Where_zeros = function(list) {
    /* get indexes of where all the zeros are in an array
 *     Where_zeros([0,1,1,2,3,4,0])
 *         [0, 6]
 *             */
    var indexes=[];
    var N = list.length-1;
    for(var i=0 ; i<=N; i++ ){
        if(list[i]===0){
            indexes.push(i);
        }
    }
    return indexes
};
var IsNan = function(list) {
    /* get indexes of where all the zeros are in an array
 *     Where_zeros([0,1,1,2,3,4,0])
 *         [0, 6]
 *             */
    var indexes=[];
    var N = list.length-1;
    for(var i=0 ; i<=N; i++ ){
        if(isNaN(list[i])){
            indexes.push(i);
        }
    }
    return indexes
};

function sortWithIndeces(toSort,floor) {
    /*
    Returns the rank position of all elements of list

    Modified from stackoverflow

    Usage:

        var test = [1000,100, 99,"NaN","None",0,0,0,0];
        sortWithIndeces(test,0);
        console.log(test.percentiles);
        [10, 9, 8, -30, -30, 0, 0, 0, 0]

    */
    var TIED_FOR_ZERO=Where_zeros(toSort);
    var IS_NAN = IsNan(toSort);
    var N =toSort.length;
    //console.log(TIED_FOR_ZERO);

    for (var i = 0; i < IS_NAN.length; i++) {
        toSort[IS_NAN[i]]=0; // allows math then below force NaNs to -3, transperent
    }

    for (var i = 0; i < toSort.length; i++) {
            toSort[i] = [toSort[i], i];
    }
    toSort.sort(function(left, right) {
          return left[0] < right[0] ? -1 : 1;
    });
    toSort.percentiles = [];
    for (var j = 0; j < toSort.length; j++) {
            toSort.percentiles.push(Math.round(((toSort[j][1] + 1)/N *10)+floor));
            toSort[j] = toSort[j][0];
            }

    for (var i = 0; i < TIED_FOR_ZERO.length; i++) {
        toSort.percentiles[TIED_FOR_ZERO[i]]=floor; // force ZERO values to 0 percentile
    }
    for (var i = 0; i < IS_NAN.length; i++) {
        toSort.percentiles[IS_NAN[i]]=-3; // force NaNs to -3, transperent
    }

    return toSort;
}



var percentiles = function(list) {
    var N = list.length,
        cleaned = [],
        idx = [],
        offset2rank = {},
        i,
        val;
    if (N < 90000) {
        // In chrome preallocating makes arrays slow if N is > ~90k
        cleaned = new Array(N);
        idx = new Array(N);
        offset2rank = new Array(N)
    }
    for (i=0; i < N; i++){
        val = list[i];
        cleaned[i] = isNaN(val) ? 0 : val;
        idx[i] = i;
    }

    idx.sort(function(a,b){ return cleaned[a]-cleaned[b]; });

    for (i=0; i < N; i++){
        offset2rank[idx[i]] = i;
    }

    for (i=0; i < N; i++){
        val = list[i];
        if (val == 0) {
            idx[i] = 0;
        } else if (isNaN(val)) {
            idx[i] = -3;
        } else {
            idx[i] = Math.round((offset2rank[i] + 1) / N * 10);
        }
    }
    return idx;
}
window.percentiles = percentiles;
window.sortWithIndeces = sortWithIndeces;

util.compute3(10, function(){ sortWithIndeces(data); } , 'boris');
util.compute3(10, function(){ percentiles(data2); } , 'percentiles');

