function updateTime() {
    let time = new Date;
    let currentHour = time.getHours();
    let currentMin = time.getMinutes();
    let currentSec = time.getSeconds();
    let currentDate = time.getDate();
    let currentMonth = time.getMonth()+1;
    let currentYear = time.getFullYear();
    
    let timeOfDay = (currentHour < 12) ? 'AM' : 'PM';
    
     

    currentHour = (currentHour > 12) ? currentHour - 12 : currentHour;
    currentHour = (currentHour == 0) ? 12 : currentHour;
    currentHour = ((currentHour < 10) ? "0" : '') + currentHour ;
    currentMin = ((currentMin < 10) ? "0" : '') + currentMin ;
    currentSec = ((currentSec < 10) ? "0" : '') + currentSec ;
    currentMonth = ((currentMonth < 10) ? "0" : '') + currentMonth ;
    currentDate = ((currentDate < 10) ? "0" : '') + currentDate ;
    

    let timeStr = currentHour + ':' + currentMin + ':' + currentSec + ' ' + timeOfDay + ' Of ' + currentDate + '/' + currentMonth + '/' + currentYear;

    let clock = document.getElementById('clock').innerHTML = timeStr;
    
}

