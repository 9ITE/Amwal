import { useDispatch } from "react-redux";
import { creditIncome, debitIncome } from "../redux/slices";
import { useState } from "react";

const IncomeAction = () => {
  const dispatch = useDispatch();
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);

  return (
    <div className="container mx-auto border-b border-blue-200 py-40">
      <h1 className="text-6xl text-gray-600">Welcome to Amwal</h1>

      <div className="flex justify-center w-full gap-x-10 my-20 items-center">
        <div className="border border-blue-200 w-[18rem] rounded-full overflow-hidden flex">
          <input
            type="number"
            name="credit"
            placeholder="amount"
            className="bg-transparent px-4 py-3 outline-none flex-1 w-full"
            onChange={(e) => setCredit(Number(e.target.value))}
          />
          <button
            className="bg-blue-200 text-white hover:scale-105 transition-all px-4 py-3 rounded-full"
            onClick={() => {
              dispatch(creditIncome(credit));
            }}
          >
            Credit
          </button>
        </div>

        <div className="border border-yellow-600 w-[18rem] rounded-full overflow-hidden flex">
          <input
            type="number"
            name="debit"
            placeholder="amount"
            className="bg-transparent px-4 py-3 outline-none flex-1 w-full"
            onChange={(e) => setDebit(Number(e.target.value))}
          />
          <button
            className="bg-yellow-600 text-white hover:scale-105 transition-all px-4 py-3 rounded-full"
            onClick={() => {
              dispatch(debitIncome(debit));
            }}
          >
            Debit
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeAction;
