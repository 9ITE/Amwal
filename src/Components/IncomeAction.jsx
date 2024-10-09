import { useDispatch, useSelector } from "react-redux";
import { creditIncome, debitIncome } from "../redux/slices/incomeSlices";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { setBudgetItems } from "../redux/slices/budgetSlices";
import ConfirmationPopup from "./Common/ConfirmationPopup";
import { setSavingGoals } from "../redux/slices/goalSlices";

const IncomeAction = () => {
  const dispatch = useDispatch();
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [debitType, setDebitType] = useState("");
  const [portal, setPortal] = useState({
    enable: false,
    response: false,
    credit: false,
    goal: null,
    message: "",
  });

  const { budgetItems } = useSelector((state) => state.budget);
  const { goal } = useSelector((state) => state.goals);

  useEffect(() => {
    if (portal?.goal !== null) setCreditWithGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portal?.goal]);

  useEffect(() => {
    if (portal?.response) setDebitPerBudgetItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portal?.response]);

  function setCreditWithGoals() {
    if (credit) {
      if (portal?.goal === null && goal?.length > 0) {
        setPortal((prev) => ({
          ...prev,
          enable: true,
          credit: true,
          message: "Want to save some credit for Goal?",
        }));

        console.log("here");
        return;
      } else if (portal?.goal) {
        const currentGoal = goal?.length ? goal[0] : null;
        if (currentGoal) {
          const tempGoal = [...goal];

          tempGoal[0] = {
            ...currentGoal,
            goalFulfilled: parseInt(
              (credit * (currentGoal?.goalRate / 100))?.toFixed(2)
            ),
          };

          dispatch(setSavingGoals(tempGoal));
          dispatch(creditIncome(credit));
          toast.success("Goal amount credited!");
          setPortal((prev) => ({ ...prev, goal: null, credit: false }));
          return;
        }
      }

      setPortal((prev) => ({ ...prev, goal: null, credit: false }));
      dispatch(creditIncome(credit));
      toast.success("Amount credited!");
    }
  }

  function setDebitPerBudgetItem() {
    // Early exit if `setDebitType` is "Other"
    if (setDebitType === "Other") {
      dispatch(debitIncome(debit));
      toast.success("Amount debited!");
      return;
    }

    // Create a copy of the budgetItems array
    const copyOfBudgetItems = [...budgetItems];
    let remainingAmt = copyOfBudgetItems?.[debitType]?.spendedAmt ?? 0;

    // Check if the debit amount exceeds the remaining amount
    if (debit > remainingAmt) {
      toast.warning("Not enough budget.");
      return;
    }

    // If remaining amount is close to budget limit, show portal
    if (remainingAmt - debit < 100 && !portal.response) {
      setPortal((prev) => ({
        ...prev,
        enable: true,
        message: "Budget Limit is about to reach. Sure to continue?",
      }));
      return;
    }

    // Update the specific budget item in the array
    copyOfBudgetItems[debitType] = {
      ...copyOfBudgetItems[debitType],
      spendedAmt: remainingAmt - debit,
    };

    // Dispatch updated budget items and reset the portal response
    dispatch(setBudgetItems(copyOfBudgetItems));
    setPortal((prev) => ({ ...prev, response: false }));

    // Finally, debit the income and show a success message
    dispatch(debitIncome(debit));
    toast.success("Amount debited!");
  }

  return (
    <div
      className="container mx-auto border-b border-blue-200 space-y-20 py-40 text-center"
      id="income"
    >
      <h1 className="text-6xl text-gray-600">Welcome to Amwal</h1>

      <div className="flex justify-center w-full gap-x-10 items-center">
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
            onClick={setCreditWithGoals}
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
              if (debit && debitType) {
                setDebitPerBudgetItem();
              } else if (!debitType) toast.warning("Select Debit type");
            }}
          >
            Debit
          </button>

          <select
            className="outline-none overflow-hidden max-w-20 w-full"
            defaultValue={""}
            onChange={(e) => setDebitType(e.target.value)}
          >
            <option value={""} disabled>
              Select
            </option>
            {budgetItems?.map((item, i) => (
              <option key={i} value={i}>
                {item?.budgetName}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {portal?.enable && (
        <ConfirmationPopup
          message={portal?.message}
          onConfirm={() =>
            portal?.credit
              ? setPortal((prev) => ({
                  ...prev,
                  enable: false,
                  goal: true,
                }))
              : setPortal((prev) => ({
                  ...prev,
                  response: true,
                  enable: false,
                }))
          }
          onCancel={() =>
            portal?.credit
              ? setPortal((prev) => ({
                  ...prev,
                  enable: false,
                  goal: false,
                }))
              : setPortal((prev) => ({
                  ...prev,
                  response: false,
                  enable: false,
                }))
          }
        />
      )}
    </div>
  );
};

export default IncomeAction;
