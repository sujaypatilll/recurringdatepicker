import React, { useContext } from 'react';
import { RecurrenceContext } from '../../context/RecurrentContext.jsx';

const daysOfWeekOptions = [
  { id: 'sunday', label: 'Su', dayNum: 0 },
  { id: 'monday', label: 'Mo', dayNum: 1 },
  { id: 'tuesday', label: 'Tu', dayNum: 2 },
  { id: 'wednesday', label: 'We', dayNum: 3 },
  { id: 'thursday', label: 'Th', dayNum: 4 },
  { id: 'friday', label: 'Fr', dayNum: 5 },
  { id: 'saturday', label: 'Sa', dayNum: 6 },
];

const WeeklyOptions = () => {
  const { selectedDaysOfWeek, updateRecurrenceState } = useContext(RecurrenceContext);

  const toggleDay = (dayId) => {
    updateRecurrenceState({
      selectedDaysOfWeek: selectedDaysOfWeek.includes(dayId)
        ? selectedDaysOfWeek.filter((d) => d !== dayId)
        : [...selectedDaysOfWeek, dayId],
    });
  };

  return (
    <div className="mt-4">
      <span className="block text-sm font-medium text-gray-700 mb-2">on:</span>
      <div className="flex flex-wrap gap-2 justify-center">
        {daysOfWeekOptions.map((day) => (
          <button
            key={day.id}
            onClick={() => toggleDay(day.id)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
              ${selectedDaysOfWeek.includes(day.id)
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeeklyOptions;
