import {useState} from 'react';
import {format, startOfMonth, endOfMonth, eachDayOfInterval, 
    isSameMonth, isSameDay, addMonths, subMonths, isBefore,
    startOfWeek, endOfWeek} from 'date-fns';
import { CiCalendar } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

function CalendarButton() {
    const [selectedDate, setSelectedDate] = useState("");
    const [currentMonth, setCurrentMonth] = useState(Date.now());
    const [showCalendar, setShowCalendar] = useState(false);
    console.log(currentMonth)

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const daysInMonth = eachDayOfInterval({start : startDate, end: endDate});

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const handleDateClick = (date) => {
        if (!isBefore(date, new Date())) {
            setSelectedDate(date);
            setShowCalendar(false);
        }
    }

    return(
        <div className="relative">
            <button 
                onClick={() => setShowCalendar(!showCalendar)}
                className="px-4 py-2 text-black font-bold rounded-md hover:cursor-pointer"
            >
                <CiCalendar/>
            </button>

            {showCalendar && (
                <div className="absolute top-12 left-0 bg-white border rounded-lg shadow-lg p-4 z-10 w-64">
                    <div className="flex justify-between items-center mb-4">
                        <button 
                            onClick={handlePrevMonth}
                            className="p-2 hover:cursor-pointer hover:scale-105 hover:bg-grey-300 rounded-full "
                        >
                            <FaArrowLeft/>
                        </button>
                        <span className="font-semibold">
                            {format(currentMonth, 'MMMM yyyy')}
                        </span>
                        <button 
                            onClick={handleNextMonth}
                            className="p-2 hover:cursor-pointer hover:scale-105 hover:bg-grey-300 rounded-full "
                        >
                            <FaArrowRight/>
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-5">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-xs text-grey-500">
                                {day}
                            </div>
                        ))}

                        {daysInMonth.map(date => {
                            const isDisabled = isBefore(date, Date.now());
                            const isSelected = selectedDate && isSameDay(date, selectedDate);
                            const isCurrentMonth = isSameMonth(date, currentMonth);

                            return (
                                <button
                                    key={date.toString()}
                                    onClick={() => handleDateClick(date)}
                                    disabled={isDisabled}
                                    className={`
                                        p-2 rounded-md text-sm hover:cursor-pointer hover:scale-105
                                        ${isSelected ? 'bg-primary text-white' : ''}
                                        ${!isCurrentMonth ? 'text-grey-400' : ''}
                                        ${isDisabled ? 'opacity-50' : ''}
                                    `}
                                >
                                    {format(date, 'd')}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarButton;