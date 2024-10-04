import React, { useEffect, useRef, useState } from "react";


const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const countdownDate = new Date('October 7, 2024 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return {
            days: days > 0 ? days : '00',
            hours: hours > 0 ? hours : '00',
            minutes: minutes > 0 ? minutes : '00',
            seconds: seconds > 0 ? seconds : '00',
        };
    };


    const[timerDays, setTimerDays] = useState(calculateTimeLeft().days);
    const[timerHours, setTimerHours] = useState(calculateTimeLeft().hours);
    const[timerMinutes, setTimerMinutes] = useState(calculateTimeLeft().minutes);
    const [timerSeconds, setTimerSeconds] = useState(calculateTimeLeft().seconds);

    let interval= useRef();
    const startTimer = () => {
        const countdownDate = new Date('October 7, 2024 00:00:00').getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days= Math.floor(distance/(1000 * 60 * 60 * 24));
            const hours= Math.floor((distance % (1000 * 60 * 60 * 24)/ (1000 * 60 * 60)));
            const minutes= Math.floor((distance % (1000 * 60 * 60 )/(1000 * 60)));
            const seconds= Math.floor((distance % (1000 * 60 ))/ 1000);

            if(distance < 0){
                //stop timerc
                clearInterval(interval.current);
            }else{
                //update timer
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
            
            
        },1000);
    }

        useEffect(() => {
            startTimer();
            return () => {
                clearInterval(interval.current);
            }
        });
    
    return (
        <section className="timer-container flex flex-col items-center justify-center m-4">
            <section className="timer bg- p-4 md:p-6 lg:p-8 rounded-lg shadow-lg text-center"> Bid Ends In:
                <div className="flex justify-center space-x-2 md:space-x-4 lg:space-x-6 text-lg md:text-2xl lg:text-3xl font-semibold text-gray-800">
                    <section className="flex flex-col items-center">
                        <p className="text-green-500">{timerDays}</p>
                        <p className="text-sm text-gray-600"><small>Days</small></p>
                    </section>
                    <span className="text-black">:</span>
                    <section className="flex flex-col items-center">
                        <p className="text-green-500">{timerHours}</p>
                        <p className="text-sm text-gray-600"><small>Hours</small></p>
                    </section>
                    <span className="text-black">:</span>
                    <section className="flex flex-col items-center">
                        <p className="text-green-500">{timerMinutes}</p>
                        <p className="text-sm text-gray-600"><small>Minutes</small></p>
                    </section>
                    <span className="text-black">:</span>
                    <section className="flex flex-col items-center">
                        <p className="text-green-500">{timerSeconds}</p>
                        <p className="text-sm text-gray-600"><small>Seconds</small></p>
                    </section>
                </div>
            </section>
        </section>
    );
};
export default CountdownTimer;