import ReactDOM from "react-dom";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg mb-4">{message}</h2>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("render-portal")
  );
};

export default ConfirmationPopup;
