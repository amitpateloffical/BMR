import React, { useState } from "react";
import BMRRecords from "../pages/BMRRecords/BMRRecords";
import { useNavigate } from "react-router-dom";

const InitiateModal = ({ approvedBMR, onClose }) => {
  const [openBMRRecordsModal, setOpenBMRRecordsModal] = useState(false);
  const [selectedBMR, setSelectedBMR] = useState(null);

  const handleOpenRecordModal = (item) => {
    setSelectedBMR(item);
    setOpenBMRRecordsModal(true);
    console.log(selectedBMR, "selectedBMR: ");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-100 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Initiate BMR Record
          </h2>
          <button
            className="text-gray-600 text-xl hover:bg-gray-50 rounded-full p-2 hover:text-gray-900 focus:outline-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {approvedBMR.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-white hover:bg-blue-100 rounded-md shadow-lg"
              >
                <button
                  className="text-gray-800 font-thin hover:font-extrabold cursor-pointer"
                  onClick={() => handleOpenRecordModal(item)}
                >
                  • {item.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-1000 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      {openBMRRecordsModal && (
        <BMRRecords selectedBMR={selectedBMR} onClose={onClose} />
      )}
    </div>
  );
};

export default InitiateModal;
