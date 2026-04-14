import React, { useEffect, useState } from 'react'

const Timer = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(endDate) - new Date();
        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            expired: false,
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, [endDate]);

    const timeData = [
        { value: timeLeft.days, label: "D" },
        { value: timeLeft.hours, label: "H" },
        { value: timeLeft.minutes, label: "M" },
        { value: timeLeft.seconds, label: "S" },
    ];

    if (timeLeft.expired) {
        return (
            <span className="text-red-400 font-semibold text-sm tracking-widest uppercase">
                Offer Expired
            </span>
        );
    }

    return (
        <div className="flex items-center gap-1.5">
            {timeData.map((item, idx) => (
                <React.Fragment key={item.label}>
                    {/* Time block */}
                    <div className="flex flex-col items-center">
                        <div className="h-10 w-10 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white font-bold text-sm tabular-nums">
                                {String(item.value).padStart(2, '0')}
                            </span>
                        </div>
                        <span className="text-gray-500 text-[9px] mt-0.5 tracking-widest">
                            {item.label}
                        </span>
                    </div>

                    {/* Colon separator (not after last) */}
                    {idx < timeData.length - 1 && (
                        <span className="text-white/40 font-bold text-sm mb-3 select-none">:</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Timer;