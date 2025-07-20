import { useContext } from 'react';
import { RecurrenceContext } from '../context/RecurrentContext.jsx';

// This hook now simply provides the generatedDates from the context
const useRecurrenceCalculator = () => {
  const { generatedDates } = useContext(RecurrenceContext);
  return generatedDates;
};

export default useRecurrenceCalculator;
