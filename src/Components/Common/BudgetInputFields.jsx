import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import ConfirmationPopup from "./ConfirmationPopup";

const BudgetInputFields = ({ index, item, setBudget, removeBudgetItem }) => {
  const [portal, setPortal] = useState({ enable: false, index: null });
  const [inputData, setInputData] = useState(
    item ? item : { budgetName: "", budgetAmt: 0 }
  );

  function handleInputChange(e) {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="border border-gray shadow-lg flex flex-col rounded-xl px-8 pt-10 pb-6 gap-y-4 text-left text-lg group relative">
      <button
        className="absolute top-4 right-4"
        onClick={() => setPortal((prev) => ({ ...prev, enable: true, index }))}
      >
        <svg
          width="24px"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-0 group-hover:opacity-100 transition-all"
        >
          <path
            d="M10 12V17"
            stroke="#a84c32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 12V17"
            stroke="#a84c32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 7H20"
            stroke="#a84c32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
            stroke="#a84c32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
            stroke="#a84c32"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <label htmlFor="budgetName" className="flex justify-between gap-4">
        <span className="flex-1">Budget Type:</span>
        <input
          type="text"
          name="budgetName"
          id="budgetName"
          placeholder="New Name"
          defaultValue={inputData?.budgetName}
          onChange={handleInputChange}
          className="border-b border-gray-500 bg-transparent text-gray-500 outline-none"
        />
      </label>

      <label htmlFor="budgetAmt" className="flex justify-between gap-4">
        <span className="flex-1"> Budget Amount:</span>
        <input
          type="number"
          name="budgetAmt"
          id="budgetAmt"
          defaultValue={inputData?.budgetAmt}
          placeholder="New Amount"
          onChange={handleInputChange}
          className="border-b border-gray-500 bg-transparent text-gray-500 outline-none"
        />
      </label>

      <button
        className="w-full bg-blue-200 text-white rounded-lg py-1"
        onClick={() => {
          inputData?.budgetName && inputData?.budgetAmt
            ? setBudget(
                inputData?.budgetName,
                Number(inputData?.budgetAmt),
                index
              )
            : toast.warning("Incomplete Data!");
        }}
      >
        {item?.budgetName ? `Update` : `Save`}
      </button>

      {portal.enable && (
        <ConfirmationPopup
          message="Sure you want to delete this budget?"
          onConfirm={() => {
            removeBudgetItem(portal.index);
            setPortal((prev) => ({ ...prev, enable: false, index: null }));
          }}
          onCancel={() =>
            setPortal((prev) => ({ ...prev, enable: false, index: null }))
          }
        />
      )}
    </div>
  );
};

BudgetInputFields.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    budgetName: PropTypes.string,
    budgetAmt: PropTypes.number,
  }),
  setBudget: PropTypes.func.isRequired,
  removeBudgetItem: PropTypes.func.isRequired,
};

export default BudgetInputFields;
