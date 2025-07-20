import React, { createContext, useState, useMemo, useContext } from 'react';
import {
  addYears,
  isAfter,
  isSameDay,
  getDate,
  getMonth,
  getYear,
  setDate,
  startOfMonth,
  endOfMonth,
  getDay,
  isBefore,
  addDays,
  addWeeks,
  addMonths,
} from 'date-fns';

// Helper to convert day string to number (date-fns getDay uses 0=Sunday, 1=Monday...)
const dayStringToNumber = (day) => {
  switch (day.toLowerCase()) {
    case 'sunday':
      return 0;
    case 'monday':
      return 1;
    case 'tuesday':
      return 2;
    case 'wednesday':
      return 3;
    case 'thursday':
      return 4;
    case 'friday':
      return 5;
    case 'saturday':
      return 6;
    default:
      return 0;
  }
};

// Create the context
export const RecurrenceContext = createContext(null);

// Recurrence Provider component
export const RecurrenceProvider = ({ children }) => {
  const [recurrenceState, setRecurrenceState] = useState({
    recurrenceType: 'daily',
    interval: 1,
    selectedDaysOfWeek: [],
    monthlyPattern: 'dayOfMonth',
    dayOfMonth: 1,
    nthWeek: 1,
    nthDay: 0, // Sunday
    startDate: new Date(),
    endDate: null,
  });

  const updateRecurrenceState = (updates) => {
    setRecurrenceState((prevState) => ({ ...prevState, ...updates }));
  };

  // Helper to check if a date should be included based on recurrence type
  const shouldIncludeDate = (dateToCheck, currentRecurrenceState) => {
    const {
      startDate,
      endDate,
      recurrenceType,
      selectedDaysOfWeek,
      monthlyPattern,
      dayOfMonth,
      nthWeek,
      nthDay,
    } = currentRecurrenceState;

    // Don't include dates before the actual start date of the recurrence
    if (isBefore(dateToCheck, startDate) && !isSameDay(dateToCheck, startDate))
      return false;
    // Don't include dates after the end date
    if (endDate && isAfter(dateToCheck, endDate)) return false;

    switch (recurrenceType) {
      case 'daily':
        return true;
      case 'weekly':
        if (selectedDaysOfWeek.length === 0) return false;
        const dayNumToCheck = getDay(dateToCheck);
        return selectedDaysOfWeek
          .map(dayStringToNumber)
          .includes(dayNumToCheck);
      case 'monthly':
        if (monthlyPattern === 'dayOfMonth') {
          return getDate(dateToCheck) === dayOfMonth;
        } else if (monthlyPattern === 'nthDayOfWeek') {
          const monthStart = startOfMonth(dateToCheck);
          let count = 0;
          let foundNthDate = null;
          for (let d = 0; d < 31; d++) {
            // Iterate through days of the month
            const dayInMonth = addDays(monthStart, d);
            if (getMonth(dayInMonth) !== getMonth(dateToCheck)) break; // Moved to next month

            if (getDay(dayInMonth) === nthDay) {
              count++;
              if (nthWeek === 5) {
                // 'last' occurrence
                const nextWeekDay = addDays(dayInMonth, 7);
                if (getMonth(nextWeekDay) !== getMonth(dateToCheck)) {
                  foundNthDate = dayInMonth;
                  break;
                }
              } else if (count === nthWeek) {
                foundNthDate = dayInMonth;
                break;
              }
            }
          }
          return foundNthDate ? isSameDay(dateToCheck, foundNthDate) : false;
        }
        return false;
      case 'yearly':
        return (
          getMonth(dateToCheck) === getMonth(startDate) &&
          getDate(dateToCheck) === getDate(startDate)
        );
      default:
        return false;
    }
  };

  // Custom hook to calculate recurring dates - now part of context for simplicity in this structure
  const generatedDates = useMemo(() => {
    const {
      startDate,
      endDate,
      recurrenceType,
      interval,
      selectedDaysOfWeek,
      monthlyPattern,
      dayOfMonth,
      nthWeek,
      nthDay,
    } = recurrenceState;

    if (!startDate) {
      return [];
    }

    const dates = [];
    const maxDateLimit = addYears(startDate, 2); // Generate dates for up to 2 years from start date
    const maxCountLimit = 500; // Limit generated dates to prevent infinite loops / performance issues

    let count = 0;

    while (
      count < maxCountLimit &&
      (!endDate || !isAfter(addDays(startDate, count), endDate)) &&
      isBefore(addDays(startDate, count), maxDateLimit)
    ) {
      let potentialDateToAdd = null;

      switch (recurrenceType) {
        case 'daily':
          potentialDateToAdd = addDays(startDate, count * interval);
          break;
        case 'weekly':
          if (selectedDaysOfWeek.length === 0) {
            count = maxCountLimit; // Exit loop
            continue;
          }
          const sortedDayNums = selectedDaysOfWeek
            .map(dayStringToNumber)
            .sort((a, b) => a - b);
          const daysInCycle = sortedDayNums.length;

          const targetDayIndex = count % daysInCycle;
          const weeksPassed = Math.floor(count / daysInCycle);

          let baseDateForWeek = addWeeks(startDate, weeksPassed * interval);
          let targetDayOfWeek = sortedDayNums[targetDayIndex];

          potentialDateToAdd = setDate(
            baseDateForWeek,
            getDate(baseDateForWeek) +
              (targetDayOfWeek - getDay(baseDateForWeek))
          );

          if (
            isBefore(potentialDateToAdd, startDate) &&
            !isSameDay(potentialDateToAdd, startDate)
          ) {
            potentialDateToAdd = addWeeks(potentialDateToAdd, interval);
          }
          break;
        case 'monthly':
          let monthOffset = count * interval;
          let baseMonthDate = addMonths(startDate, monthOffset);

          if (monthlyPattern === 'dayOfMonth') {
            potentialDateToAdd = setDate(
              baseMonthDate,
              Math.min(dayOfMonth, getDate(endOfMonth(baseMonthDate)))
            );
          } else {
            // nthDayOfWeek
            let currentMonthStart = startOfMonth(baseMonthDate);
            let foundDateInMonth = null;
            let nthCount = 0;
            for (let d = 0; d < 31; d++) {
              const checkDate = addDays(currentMonthStart, d);
              if (getMonth(checkDate) !== getMonth(baseMonthDate)) break;

              if (getDay(checkDate) === nthDay) {
                nthCount++;
                if (nthWeek === 5) {
                  // 'last' occurrence
                  const nextWeekDay = addDays(checkDate, 7);
                  if (getMonth(nextWeekDay) !== getMonth(baseMonthDate)) {
                    foundDateInMonth = checkDate;
                    break;
                  }
                } else if (nthCount === nthWeek) {
                  foundDateInMonth = checkDate;
                  break;
                }
              }
            }
            potentialDateToAdd = foundDateInMonth;
          }
          break;
        case 'yearly':
          potentialDateToAdd = addYears(startDate, count * interval);
          potentialDateToAdd = setDate(potentialDateToAdd, getDate(startDate));
          potentialDateToAdd = setDate(
            addMonths(
              potentialDateToAdd,
              getMonth(startDate) - getMonth(potentialDateToAdd)
            ),
            getDate(potentialDateToAdd)
          );
          break;
        default:
          break;
      }

      if (
        potentialDateToAdd &&
        shouldIncludeDate(potentialDateToAdd, recurrenceState)
      ) {
        if (!dates.some((d) => isSameDay(d, potentialDateToAdd))) {
          dates.push(potentialDateToAdd);
        }
      }
      count++;
    }

    const uniqueDates = Array.from(new Set(dates.map((d) => d.getTime())))
      .map((time) => new Date(time))
      .sort((a, b) => a.getTime() - b.getTime());

    return uniqueDates;
  }, [recurrenceState]);

  const contextValue = useMemo(
    () => ({
      ...recurrenceState,
      updateRecurrenceState,
      generatedDates,
      dayStringToNumber, // Expose helper if needed by other components
    }),
    [recurrenceState, generatedDates]
  );

  return (
    <RecurrenceContext.Provider value={contextValue}>
      {children}
    </RecurrenceContext.Provider>
  );
};
