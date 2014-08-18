var _ = require('underscore'),
    timers = {},
    table = function(){
        var width = 800;
        var s = '<div style="position:relative;width:'+800+'px;display:inline-block">&nbsp;'
        for (var i=0; i<arguments.length; i++) {
            left = i * (width / arguments.length);
            s += '<span style="position:absolute; left:'+left+'px">' + arguments[i] + '</span>';
        }
        s += "</div>";
        return s;
    },
    print = function(msg) {
        var el = document.getElementById('log');
        if (!el) {
            el = document.createElement('div');
            el.id = 'log';
            document.body.appendBhild(el)
        }
        //el.innerHTML += (new Date).toISOString().split('T')[1].split('.')[0] + " - " + msg + "<br>";
        el.innerHTML += msg + "<br>";
    },
    compute1 = function(n, f, msg){
        var t0 = new Date();
        for (var i=0; i < n; i++) {
            f(i);
        }
        var t1 = new Date(),
            dt = t1-t0,
            ds = dt/1000,
            ops = Math.round(n/ds),
            spo = Math.round(dt/n);
        
        print(table(msg, ops+" ops/sec", spo+" ms/op", n+" ops in "+dt+"ms"));

    },
    profile = function(n, f, msg) {
        console.profile(msg);
        compute1(n, f, msg);
        console.profileEnd();
    };
    compute3 = function(n, f, msg) {
        setTimeout(function() {compute1(n, f, msg);}, 0);
        //_.defer(function(){ compute1(n, f, msg); });
    };
    timer = function(uid) {
        timers[uid] = new Date();
    };
    timerEnd = function(uid, msg) {
        var t1 = new Date();
        if (timers[uid]) {
            print(table(uid,(t1 - timers[uid])+'ms'));
        } else {
            print('Timer: '+uid+' was never started');
        }
    };

print(table(" ", "^ is better", "v is better", " "));
module.exports = {
    compute1 : compute1,
    compute3 : compute3,
    timer : timer,
    timerEnd: timerEnd,
    profile: profile,
    print: print
};
