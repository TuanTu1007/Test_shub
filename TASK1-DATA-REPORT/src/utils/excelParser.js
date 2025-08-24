import * as XLSX from 'xlsx';

export const parseExcelFile = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const binaryStr = event.target.result;
    const workbook = XLSX.read(binaryStr, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const headers = jsonData[7]; 
    const rows = jsonData.slice(8); 

    const parsedData = rows
      .map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      })
      .filter((row) => row['STT']); 

    console.log('Parsed data:', parsedData); 
    callback(parsedData);
  };
  reader.readAsBinaryString(file);
};