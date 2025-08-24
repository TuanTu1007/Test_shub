function ReportResult({ data, totalAmount }) {
  return (
    <div>
      {data.length > 0 && (
        <p className="text-green-600 mb-4">
          File đã upload thành công. Số giao dịch: {data.length}
        </p>
      )}
      {totalAmount !== null && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Tổng Thành Tiền: {totalAmount.toLocaleString('vi-VN')} VNĐ
          </h3>
        </div>
      )}
    </div>
  );
}

export default ReportResult;