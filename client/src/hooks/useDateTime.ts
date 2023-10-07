import { useEffect, useState } from "react";

export function currentTimePlusOneMinute() {
    const options = { hour: 'numeric', minute: 'numeric' };
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    return now.toLocaleTimeString([], options);
}

function timeStringToDate(specificTimeString) {
    if (specificTimeString) {
        const [rawTime, amOrPm] = specificTimeString.split(' ');
        const [hours, minutes] = rawTime.split(':');
        // const adjustedHours = amOrPm === 'PM' && hours !== '12' ?
        //     parseInt(hours, 10) + 12 :
        //     amOrPm === 'AM' && hours === '12' ?
        //     '00' :
        //     hours;
        const formattedTime = `${hours}:${minutes}`;
        const date = new Date(`01/01/1970 ${formattedTime}:00`);
        return date;
    } else return ""
}

//console.log(specificTimeStringToDate('12:00 PM')); // Output: Sun Aug 01 2021 12:00:00 GMT-0700 (Pacific Daylight Time)
export function addOneMinuteToTimeString(specificTimeString) {
    // console.log(specificTimeString.slice(specificTimeString.length - 2), "SSSSSSSSSSSSSSSSSSS")
    //under maintenance ---------------------------||----------------------------------------------------------------
    let date = new Date(timeStringToDate(specificTimeString));
    //console.log("specificTimeString", specificTimeString)
    let newMinutes = date.getMinutes();
    if (date.getMinutes() <= 9)
        newMinutes = `0${date.getMinutes()}`;
    newMinutes = parseInt(newMinutes) + 1;
    let hours = date.getHours();
    const amOrPmStr = specificTimeString.slice(specificTimeString.length - 2);
    let res = `${hours}:${newMinutes} ${amOrPmStr}`;
    return res;
}

console.log(addOneMinuteToTimeString('12:07 PM')); // Output: "12:08 PM"

export function currntTime() {
    const options = { hour: 'numeric', minute: 'numeric' };

    return new Date().toLocaleTimeString('en-US', options); //the first parameter By passing 'en-US' as the first argument, you ensure that the time is formatted according to English language conventions regardless of the user's browser settings. if you need to let the setting as you determine in your browser settings replace the first param with []
}
export function currntDate() {
    return new Date().toLocaleDateString();
}
const useDateTime = () => {
    let [date, setDate] = useState(currntDate);
    let [time, setTime] = useState(currntTime);
    useEffect(() => {
        let interval = setInterval(() => {
            setTime(currntTime());
            setDate(currntDate());
            console.log("_____________________" + time)
        }, 600);
        return () => clearInterval(interval);
    }, [time])

    return ({ time: time, date });
}

export default useDateTime;