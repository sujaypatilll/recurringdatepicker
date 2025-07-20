import React, { useState, useContext } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addMonths } from 'date-fns';
import { RecurrenceContext } from '../context/RecurrentContext.jsx';
import useRecurrenceCalculator from '../hooks/useRecurrenceCalculator.jsx'; // Import the hook to get generated dates

const CalendarPreview = () => {
  const { startDate } = useContext(RecurrenceContext);
  const generatedDates = useRecurrenceCalculator(); // Get generated dates from the hook
  const [currentMonth, setCurrentMonth] = useState(startDate || new Date());

  // Modifiers to highlight the generated dates
  const modifiers = {
    recurring: generatedDates,
  };

  // Custom styling for recurring dates (applied via CSS in style tag in App.js)
  const modifiersStyles = {
    recurring: {
      backgroundColor: 'var(--rdp-recurring-bg-color, #93C5FD)', // light blue
      color: 'white',
      borderRadius: '50%',
    },
  };

  // Handle month navigation in the preview
  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  // Render previous/next month buttons for navigation
  const renderNavButtons = () => (
    <div className="flex justify-between items-center mb-4 px-2">
      <button
        onClick={() => handleMonthChange(addMonths(currentMonth, -1))}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        &larr;
      </button>
      <span className="font-semibold text-gray-800">
        {format(currentMonth, 'MMMM yyyy')}
      </span>
      <button
        onClick={() => handleMonthChange(addMonths(currentMonth, 1))}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        &rarr;
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <h4 className="text-md font-semibold mb-3 text-gray-700">Selected Dates Preview</h4>
      <div className="flex justify-center">
        <DayPicker
          month={currentMonth}
          onMonthChange={handleMonthChange}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          showOutsideDays // Shows days from prev/next month
          components={{
            Head: () => null, // Hide default header
            Caption: ({ displayMonth }) => renderNavButtons(),
          }}
          // Highlight the start date on the calendar as well
          selected={startDate || undefined}
        />
      </div>
      {generatedDates.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 max-h-40 overflow-y-auto">
          <p className="font-semibold mb-1">Generated Dates (First 100):</p>
          <ul className="list-disc list-inside space-y-1">
            {generatedDates.slice(0, 100).map((date, index) => (
              <li key={index}>{format(date, 'PPP')}</li>
            ))}
            {generatedDates.length > 100 && <li>... (and {generatedDates.length - 100} more)</li>}
          </ul>
        </div>
      )}
      {generatedDates.length === 0 && startDate && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          No recurring dates generated with the current settings (or end date reached).
        </div>
      )}
      {!startDate && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
          Please select a start date to see the preview.
        </div>
      )}
    </div>
  );
};

export default CalendarPreview;
