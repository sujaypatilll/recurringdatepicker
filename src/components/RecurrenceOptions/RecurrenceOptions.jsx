import React, { useContext } from 'react';
import { RecurrenceContext } from '../../context/RecurrentContext.jsx';
import DailyOptions from './DailyOptions';
import WeeklyOptions from './WeeklyOptions';
import MonthlyOptions from './MonthlyOptions';
import YearlyOptions from './YearlyOptions';

const RecurrenceOptions = () => {
  const { recurrenceType, interval, updateRecurrenceState } = useContext(RecurrenceContext);

  const options = [
    { type: 'daily', label: 'Daily' },
    { type: 'weekly', label: 'Weekly' },
    { type: 'monthly', label: 'Monthly' },
    { type: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="mb-6">
      <div className="flex space-x-2 mb-4">
        {options.map((option) => (
          <button
            key={option.type}
            onClick={() => updateRecurrenceState({ recurrenceType: option.type })}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${recurrenceType === option.type
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        {/* Interval Input for all types */}
        <div className="mb-4">
          <label htmlFor="interval" className="block text-sm font-medium text-gray-700 mb-2">
            Recur every
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              id="interval"
              min="1"
              value={interval}
              onChange={(e) => updateRecurrenceState({ interval: parseInt(e.target.value) || 1 })}
              className="w-20 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-gray-600">
              {recurrenceType === 'daily' && 'day(s)'}
              {recurrenceType === 'weekly' && 'week(s)'}
              {recurrenceType === 'monthly' && 'month(s)'}
              {recurrenceType === 'yearly' && 'year(s)'}
            </span>
          </div>
        </div>

        {/* Render specific options based on selected type */}
        {recurrenceType === 'daily' && <DailyOptions />}
        {recurrenceType === 'weekly' && <WeeklyOptions />}
        {recurrenceType === 'monthly' && <MonthlyOptions />}
        {recurrenceType === 'yearly' && <YearlyOptions />}
      </div>
    </div>
  );
};

export default RecurrenceOptions;
