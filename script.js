const numberOfHours = 12;
const secPerHour = 3600;
const secPerMinute = 60;
const secPerHalfOfADay = secPerHour * numberOfHours;
const milisecondsInSecond = 1000;
const timeForMinuteTipToRotateOneDeg = 10;
const timeForHourTipToRotateOneDeg = 120;

let clock = document.querySelector(".clock");
let fasterBtn = document.querySelector(".btnFaster");
let slowerBtn = document.querySelector(".btnSlower");

let secondTip = document.querySelector(".second");
let minuteTip = document.querySelector(".minute");
let hourTip = document.querySelector(".hour");

let rotateAngleForSecondTip, rotateAngleForMinuteTip, rotateAngleForHourTip;
let numberOfSeconds;

fasterBtn.addEventListener("click", goFaster);
slowerBtn.addEventListener("click", goSlower);

let clockShieldDeg = 0, clockShieldRotationTempo = 0;

async function main()
{
    //let minuteTip = document.querySelector(".minute");

    let actDateAndTime, hours, minutes, seconds;

    actDateAndTime = new Date;
    hours = actDateAndTime.getHours();
    minutes = actDateAndTime.getMinutes();
    seconds = actDateAndTime.getSeconds();

    console.log(`${hours}:${minutes}:${seconds}`);
    hours = hours % numberOfHours;
    
    numberOfSeconds = hours * secPerHour + minutes * secPerMinute + seconds;

    setTipsInitially();
    
    while(1)
    {
        setTips();
        clockShieldDeg = clockShieldDeg + clockShieldRotationTempo;
        console.log(clockShieldDeg);
        clock.style.transform = `scale3d(0.95, 0.95, 0.95) rotateZ(calc(${clockShieldDeg}deg)`;
        numberOfSeconds++;

        if(numberOfSeconds === secPerHalfOfADay)
            numberOfSeconds = 0;

        await wait(milisecondsInSecond / (1 + clockShieldRotationTempo));
    }
};

function wait(miliseconds)
{
    return new Promise(resolve => setTimeout(resolve, miliseconds));
};

function goFaster()
{
    if(clockShieldRotationTempo === 999)
        return;

    if(clockShieldRotationTempo === 0)
    {
        clockShieldDeg = 1;
        clockShieldRotationTempo = 1;
    }
    else
        clockShieldRotationTempo++;
}

function goSlower()
{
    if(clockShieldRotationTempo === 0)
    {
        setTipsInitially();
        clock.style.transform = `scale3d(0.95, 0.95, 0.95) rotateZ(0deg)`;
        clockShieldDeg = 0;
        return;
    }
    clockShieldRotationTempo--;
}

function setTips()
{
    rotateAngleForSecondTip = numberOfSeconds % secPerMinute * 6 + 'deg';
    
    secondTip.style.transform = `rotateZ(calc(${rotateAngleForSecondTip})`;

    if(numberOfSeconds % timeForMinuteTipToRotateOneDeg === 0)
    {
            rotateAngleForMinuteTip = numberOfSeconds % secPerHour / timeForMinuteTipToRotateOneDeg + 'deg';
            minuteTip.style.transform = `rotateZ(calc(${rotateAngleForMinuteTip})`;
    }

    if(numberOfSeconds % 120 === 0)
    {
            rotateAngleForHourTip = numberOfSeconds % secPerHalfOfADay / timeForHourTipToRotateOneDeg + 'deg';
            hourTip.style.transform = `rotateZ(calc(${rotateAngleForHourTip})`;
    }
}

function setTipsInitially()
{
    rotateAngleForSecondTip = numberOfSeconds % secPerMinute * 6 + 'deg';
        
    secondTip.style.transform = `rotateZ(calc(${rotateAngleForSecondTip})`;

    
    rotateAngleForMinuteTip = numberOfSeconds % secPerHour / timeForMinuteTipToRotateOneDeg + 'deg';
    minuteTip.style.transform = `rotateZ(calc(${rotateAngleForMinuteTip})`;

    rotateAngleForHourTip = numberOfSeconds % secPerHalfOfADay / timeForHourTipToRotateOneDeg + 'deg';
    hourTip.style.transform = `rotateZ(calc(${rotateAngleForHourTip})`;
}

main();
