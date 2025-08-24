import { useState } from 'react';
import FileUploader from './components/FileUploader';
import TimeFilter from './components/TimeFilter';
import ReportResult from './components/ReportResult';

function App() {
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);

  const handleDataParsed = (parsedData) => {
    setData(parsedData);
    setTotalAmount(null); 
  };

  const handleTotalCalculated = (total) => {
    setTotalAmount(total);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 font-sans bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Báo Cáo Doanh Thu Xăng Dầu
        </h1>
        <FileUploader onDataParsed={handleDataParsed} />
        <TimeFilter data={data} onTotalCalculated={handleTotalCalculated} />
        <ReportResult data={data} totalAmount={totalAmount} />
      </div>
    </div>
  );
}

export default App;