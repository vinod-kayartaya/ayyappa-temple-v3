import React from 'react';

function DateRangePicker({ startDate, endDate, onChange }) {
  const handleStartDateChange = (e) => {
    onChange({
      startDate: new Date(e.target.value),
      endDate: endDate
    });
  };

  const handleEndDateChange = (e) => {
    onChange({
      startDate: startDate,
      endDate: new Date(e.target.value)
    });
  };

  return (
    <div className='d-flex gap-3'>
      <div>
        <label className='form-label small mb-1'>Start Date</label>
        <input
          type='date'
          className='form-control'
          value={startDate.toISOString().split('T')[0]}
          onChange={handleStartDateChange}
          max={endDate.toISOString().split('T')[0]}
        />
      </div>
      <div>
        <label className='form-label small mb-1'>End Date</label>
        <input
          type='date'
          className='form-control'
          value={endDate.toISOString().split('T')[0]}
          onChange={handleEndDateChange}
          min={startDate.toISOString().split('T')[0]}
        />
      </div>
    </div>
  );
}

export default DateRangePicker; 