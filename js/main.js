(function(){
    'use stict'

    var timer = document.getElementById('timer');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');
    var start = document.getElementById('start');
    var reset = document.getElementById('reset');

    var startTime;
    var timeLeft;
    var timeToCountDown = 0;
    var timerId;
    var isRunning = false;

    function updateTimer(t){
        var d = new Date(t);
        var m = d.getMinutes();
        var s = d.getSeconds();
        var ms = d.getMilliseconds();
        var timerSTring;
        m = ('0' + m ).slice(-2)
        s = ('0' + s ).slice(-2)
        ms = ('00' + ms ).slice(-2)
        timerSTring =  m + ":" + s + "." + ms;
        timer.textContent = timerSTring;
        document.title = timerSTring;

    }
    function countDown(){
        timerId = setTimeout(function(){
        //     var elapsedTime = Date.now - startTime;
        //    timeLeft = timeToCountDown - elapsedTime;
           timeLeft = timeToCountDown - ( Date.now() - startTime);
           if (timeLeft < 0 ){
                alert('timer has been finished!');
                isRunning = false;
                start.textContent = "Start";
               clearTimeout(timerId);
               timeLeft = 0;
               timeToCountDown = 0;
               updateTimer(timeLeft);
               return;
           }
           updateTimer(timeLeft);
           countDown();

        } , 10)
    }
    start.addEventListener('click',function(){
        if ( isRunning === false){
            isRunning = true;
            start.textContent = "stop";
            startTime = Date.now();
            countDown();
        }else{
            isRunning = false;
            start.textContent = "start";
            timeToCountDown = timeLeft;
            clearTimeout(timerId);
        }
        
    });
    min.addEventListener('click',function(){
        if ( isRunning === true){
            return;
        }
        if(timeToCountDown >= 60 * 1000 * 60 ){
            timetoCountDoun = 0;
        }
        timeToCountDown += 60 * 1000;
        updateTimer(timeToCountDown);
        // countDown();
    });
    sec.addEventListener('click',function(){
        if ( isRunning === true){
            return;
        }
        if(timeToCountDown >= 60 * 1000 * 60 ){
            timetoCountDoun = 0;
        }
        timeToCountDown += 1000;
        updateTimer(timeToCountDown);
        // countDown();
    });
    reset.addEventListener('click',function(){

        timeToCountDown = 0;
        updateTimer(timeToCountDown);
        // countDown();
    });


})();