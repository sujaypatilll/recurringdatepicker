import React, { useContext } from 'react';
import { RecurrenceContext } from '../../context/RecurrentContext.jsx';

const daysOfWeekOptions = [
  { id: 'sunday', label: 'Sunday', dayNum: 0 },
  { id: 'monday', label: 'Monday', dayNum: 1 },
  { id: 'tuesday', label: 'Tuesday', dayNum: 2 },
  { id: 'wednesday', label: 'Wednesday', dayNum: 3 },
  { id: 'thursday', label: 'Thursday', dayNum: 4 },
  { id: 'friday', label: 'Friday', dayNum: 5 },
  { id: 'saturday', label: 'Saturday', dayNum: 6 },
];

const nthWeekOptions = [
  { value: 1, label: 'first' },
  { value: 2, label: 'second' },
  { value: 3, label: 'third' },
  { value: 4, label: 'fourth' },
  { value: 5, label: 'last' },
];

const MonthlyOptions = () => {
  const { monthlyPattern, dayOfMonth, nthWeek, nthDay, updateRecurrenceState } = useContext(RecurrenceContext);

  return (
    <div className="mt-4">
      <div className="mb-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-600"
            name="monthlyPattern"
            value="dayOfMonth"
            checked={monthlyPattern === 'dayOfMonth'}
            onChange={() => updateRecurrenceState({ monthlyPattern: 'dayOfMonth' })}
          />
          <span className="ml-2 text-gray-700">Day</span>
        </label>
        <input
          type="number"
          min="1"
          max="31"
          value={dayOfMonth}
          onChange={(e) => updateRecurrenceState({ dayOfMonth: parseInt(e.target.value) || 1 })}
          className="w-16 p-1 border border-gray-300 rounded-md ml-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={monthlyPattern !== 'dayOfMonth'}
        />
        <span className="ml-1 text-gray-600">of the month</span>
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-600"
            name="monthlyPattern"
            value="nthDayOfWeek"
            checked={monthlyPattern === 'nthDayOfWeek'}
            onChange={() => updateRecurrenceState({ monthlyPattern: 'nthDayOfWeek' })}
          />
          <span className="ml-2 text-gray-700">The</span>
        </label>
        <select
          value={nthWeek}
          onChange={(e) => updateRecurrenceState({ nthWeek: parseInt(e.target.value) })}
          className="p-1 border border-gray-300 rounded-md ml-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={monthlyPattern !== 'nthDayOfWeek'}
        >
          {nthWeekOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <select
          value={nthDay}
          onChange={(e) => updateRecurrenceState({ nthDay: parseInt(e.target.value) })}
          className="p-1 border border-gray-300 rounded-md ml-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={monthlyPattern !== 'nthDayOfWeek'}
        >
          {daysOfWeekOptions.map(option => (
            <option key={option.id} value={option.dayNum}>{option.label}</option>
          ))}
        </select>
        <span className="ml-1 text-gray-600">of the month</span>
      </div>
    </div>
  );
};

export default MonthlyOptions;
