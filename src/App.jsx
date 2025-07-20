import React from 'react';
import { RecurrenceProvider } from './context/RecurrentContext.jsx';
import RecurringDatePicker from './components/RecurringDatePicker.jsx';

const App = () => {
  return (
   <RecurrenceProvider>
           {/* Global styles for react-day-picker and custom elements */}
           <style>
        {`
          /* react-day-picker styles */
          .rdp {
            --rdp-cell-size: 38px;
            --rdp-background-color: #e0e7ff; /* blue-100 */
            --rdp-accent-color: #3b82f6; /* blue-500 */
            --rdp-border-color: #bfdbfe; /* blue-200 */
            --rdp-text-color: #374151; /* gray-700 */
            --rdp-selected-color: #2563eb; /* blue-600 */
            --rdp-selected-text-color: #ffffff;
            --rdp-hover-color: #dbeafe; /* blue-100 */
            --rdp-button-color: #4b5563; /* gray-600 */
            --rdp-button-hover-color: #6b7280; /* gray-500 */
            --rdp-caption-color: #1f2937; /* gray-900 */
            --rdp-nav-button-color: #6b7280; /* gray-500 */
            --rdp-nav-button-hover-color: #9ca3af; /* gray-400 */
            --rdp-outline: 2px solid var(--rdp-accent-color);
            --rdp-outline-offset: 2px;
          }

          .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
            background-color: var(--rdp-selected-color) !important;
            color: var(--rdp-selected-text-color) !important;
          }

          .rdp-day_today {
            font-weight: bold;
            color: var(--rdp-accent-color);
          }

          .rdp-day_today:not(.rdp-day_selected) {
            border: 1px solid var(--rdp-accent-color);
            border-radius: 50%;
          }

          .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
            background-color: var(--rdp-hover-color);
          }

          /* Custom recurring date style */
          :root {
            --rdp-recurring-bg-color: #93C5FD; /* Define a CSS variable for consistency */
          }
          .rdp-day_recurring {
            background-color: var(--rdp-recurring-bg-color) !important;
            color: white !important;
            border-radius: 50% !important;
          }
          /* Basic styling for form-radio to ensure it's visible */
          .form-radio {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            border: 1px solid #ccc;
            outline: none;
            cursor: pointer;
            vertical-align: middle;
            position: relative;
            top: -1px;
          }
          .form-radio:checked {
            background-color: #2563EB; /* blue-600 */
            border-color: #2563EB;
          }
          .form-radio:checked::before {
            content: '';
            display: block;
            width: 0.5rem;
            height: 0.5rem;
            background-color: white;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}
      </style>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans antialiased">
        <RecurringDatePicker/>
      </div>
     </RecurrenceProvider>
  );
};

export default App;
