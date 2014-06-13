self.addEventListener('message', function(e) {

    var data = e.data;

    var secs;
    var mins;

    var time = {
        bigTime: 1499,
        secsText: '00',
        minsText: '25',
        progress: 0
    }

    var counter = function counter() {

        mins = Math.floor(time.bigTime / 60);
        secs = time.bigTime - mins * 60;

        time.secsText = (secs < 10 ? '0' : '') + secs;
        time.minsText = (mins < 10 ? '0' : '') + mins;

        if (time.bigTime === 0) {
            self.postMessage(time);
            self.close();
        } else {
            time.bigTime--;
            time.progress++;
            self.postMessage(time);
        }
    };

    switch (data.cmd) {
        case 'start':
            setInterval(counter, 1000);
            break;
        case 'stop':
            self.close();
            break;
        default:
            self.postMessage('Unknown command: ' + data.msg);
    };

}, false);