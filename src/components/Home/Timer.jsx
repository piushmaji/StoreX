import { useEffect, useState } from 'react'

const Timer = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(endDate) - new Date()

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                expired: true
            }
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            expired: false
        }
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [endDate])

    const timeData = [
        { id: 1, value: timeLeft.days, label: "Days" },
        { id: 2, value: timeLeft.hours, label: "Hour" },
        { id: 3, value: timeLeft.minutes, label: "Min" },
        { id: 4, value: timeLeft.seconds, label: "Sec" }
    ]

    if (timeLeft.expired) {
        return (
            <div className='text-red-500 font-semibold text-lg'>
                Offer Expired!
            </div>
        )
    }

    return (
        <div className='w-full grid grid-cols-4 items-center justify-items-center gap-4'>
            {timeData.map((item) => (
                <div
                    key={item.id}
                    className='lg:h-14 lg:w-14 h-12 w-12 bg-gray-300 flex flex-col items-center justify-center rounded-lg shadow-md'
                >
                    <h2 className='text-lg lg:text-xl font-bold'>{String(item.value).padStart(2, '0')}</h2>
                    <h3 className='text-[10px] lg:text-xs text-gray-600'>{item.label}</h3>
                </div>
            ))}
        </div>
    )
}

export default Timer