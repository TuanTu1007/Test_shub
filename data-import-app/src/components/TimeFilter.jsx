import { useState, useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function TimeFilter({ data, onTotalCalculated }) {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [error, setError] = useState('');
  const startPickerRef = useRef(null);
  const endPickerRef = useRef(null);

  useEffect(() => {
    const startPicker = flatpickr(startPickerRef.current, {
      enableTime: true,
      enableSeconds: true,
      dateFormat: 'd/m/Y H:i:S',
      time_24hr: true,
      onChange: (selectedDates) => {
        if (selectedDates[0]) setStartTime(selectedDates[0]); 
      },
    });

    const endPicker = flatpickr(endPickerRef.current, {
      enableTime: true,
      enableSeconds: true,
      dateFormat: 'd/m/Y H:i:S',
      time_24hr: true,
      onChange: (selectedDates) => {
        if (selectedDates[0]) setEndTime(selectedDates[0]); 
      },
    });

    return () => {
      startPicker.destroy();
      endPicker.destroy();
    };
  }, []);

  const calculateTotal = () => {
    if (!startTime || !endTime) {
      setError('Vui lòng chọn thời gian bắt đầu và thời gian kết thúc.');
      return;
    }
    if (data.length === 0) {
      setError('Vui lòng upload file trước.');
      return;
    }

    const formatTime = (date) => {
      if (!date) return '';
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };

    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timeRegex.test(formattedStartTime) || !timeRegex.test(formattedEndTime)) {
      setError('Định dạng giờ không hợp lệ.');
      return;
    }

    const filtered = data.filter((row) => {
      const time = row['Giờ'];
      if (!time || typeof time !== 'string') return false;
      return time >= formattedStartTime && time <= formattedEndTime;
    });

    console.log('Filtered rows:', filtered);

    const total = filtered.reduce((sum, row) => {
      const amountStr = row['Thành tiền (VNĐ)']
        ? String(row['Thành tiền (VNĐ)']).replace(/\./g, '')
        : '0';
      const amount = parseInt(amountStr, 10) || 0;
      console.log('Amount:', amountStr, '->', amount);
      return sum + amount;
    }, 0);

    setError('');
    onTotalCalculated(total);
  };

  const formatDisplayDate = (dateObj) => {
    if (!dateObj) return '';
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Thời gian bắt đầu:</label>
        <input
          type="text"
          ref={startPickerRef}
          value={formatDisplayDate(startTime)}
          onChange={(e) => e.preventDefault()}
          placeholder="dd/mm/yyyy hh:mm:ss"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Thời gian kết thúc:</label>
        <input
          type="text"
          ref={endPickerRef}
          value={formatDisplayDate(endTime)}
          onChange={(e) => e.preventDefault()}
          placeholder="dd/mm/yyyy hh:mm:ss"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={calculateTotal}
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Tính Tổng Thành Tiền
      </button>

      {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}
    </div>
  );
}

export default TimeFilter;