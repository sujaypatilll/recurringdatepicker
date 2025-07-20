import React, { useState, useRef, useEffect, useContext } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { RecurrenceContext } from '../context/RecurrentContext.jsx';

const DateRangeSelector = () => {
  const { startDate, endDate, updateRecurrenceState } = useContext(RecurrenceContext);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (startDatePickerRef.current && !startDatePickerRef.current.contains(event.target)) {
        setShowStartDatePicker(false);
      }
      if (endDatePickerRef.current && !endDatePickerRef.current.contains(event.target)) {
        setShowEndDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex space-x-4 mb-4">
      <div className="relative flex-1" ref={startDatePickerRef}>
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
        <input
          id="start-date"
          type="text"
          readOnly
          value={startDate ? format(startDate, 'PPP') : ''}
          onClick={() => setShowStartDatePicker(!showStartDatePicker)}
          className="w-full p-2 border border-gray-300 rounded-md cursor-pointer bg-white focus:ring-blue-500 focus:border-blue-500"
        />
        {showStartDatePicker && (
          <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
            <DayPicker
              mode="single"
              selected={startDate || undefined}
              onSelect={(date) => {
                if (date) {
                  updateRecurrenceState({ startDate: date });
                  setShowStartDatePicker(false);
                }
              }}
            />
          </div>
        )}
      </div>

      <div className="relative flex-1" ref={endDatePickerRef}>
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
        <input
          id="end-date"
          type="text"
          readOnly
          value={endDate ? format(endDate, 'PPP') : ''}
          onClick={() => setShowEndDatePicker(!showEndDatePicker)}
          className="w-full p-2 border border-gray-300 rounded-md cursor-pointer bg-white focus:ring-blue-500 focus:border-blue-500"
        />
        {showEndDatePicker && (
          <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
            <DayPicker
              mode="single"
              selected={endDate || undefined}
              onSelect={(date) => {
                updateRecurrenceState({ endDate: date || null });
                setShowEndDatePicker(false);
              }}
              disabled={{ before: startDate || new Date() }} // Disable dates before start date
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeSelector;
