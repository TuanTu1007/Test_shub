import { useState } from 'react';
import { parseExcelFile } from '../utils/excelParser';

function FileUploader({ onDataParsed }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (!uploadedFile.name.endsWith('.xlsx')) {
        setError('Vui lòng upload file .xlsx');
        return;
      }
      setFile(uploadedFile);
      setError('');
      parseExcelFile(uploadedFile, (parsedData) => {
        onDataParsed(parsedData);
      });
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">Upload file Excel (.xlsx):</label>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {file && <p className="text-green-600 mt-2">File: {file.name}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

export default FileUploader;