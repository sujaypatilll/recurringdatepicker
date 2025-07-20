import React from 'react';
import CalendarPreview from './CalendarPreview.jsx';
import DateRangeSelector from './DateRangeSelector.jsx';
import RecurrenceOptions from './RecurrenceOptions/RecurrenceOptions.jsx';


const RecurringDatePicker = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-4xl w-full border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Recurring Date Picker</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recurrence Options Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Recurrence Pattern</h3>
        <RecurrenceOptions/>
        </div>

        {/* Date Range & Preview */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Date Range & Preview</h3>
          <div className="mb-6">
           <DateRangeSelector/>
          </div>
         <CalendarPreview/>
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker;
