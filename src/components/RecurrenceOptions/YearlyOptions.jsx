import React, { useContext } from 'react';
import { RecurrenceContext } from '../../context/RecurrentContext.jsx';
import { format } from 'date-fns';

const YearlyOptions = () => {
  const { startDate } = useContext(RecurrenceContext);

  return (
    <div className="mt-4">
      <span className="block text-sm font-medium text-gray-700 mb-2">on:</span>
      <p className="text-gray-600">
        Same month and day as start date: {startDate ? format(startDate, 'MMMM do') : 'N/A'}
      </p>
    </div>
  );
};

export default YearlyOptions;
