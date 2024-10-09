import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BudgetInputFields from "./Common/BudgetInputFields";
import { setBudgetItems } from "../redux/slices/budgetSlices";
import { toast } from "sonner";

const BudgetingTool = () => {
  const dispatch = useDispatch();
  const { amount } = useSelector((state) => state.income);
  const { budgetItems } = useSelector((state) => state.budget);

  const [budgetItemArr, setBudgetItemArr] = useState(
    budgetItems?.length > 0
      ? budgetItems
      : [{ budgetName: "", budgetAmt: 0, spendedAmt: 0 }]
  );

  // sum of already assigned budget
  const totalAssignedBudgetAmt = budgetItemArr?.reduce(
    (accumlator, currentItem) => accumlator + currentItem?.budgetAmt,
    0
  );

  // checking if empty budget exists
  const arrayHasEmptyBudgetName = budgetItemArr?.some(
    (item) => !item?.budgetName
  );

  // setting updated budget to redux store
  useEffect(() => {
    if (!arrayHasEmptyBudgetName) {
      dispatch(setBudgetItems(budgetItemArr));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budgetItemArr]);

  function setBudget(
    currentAssignedBudgetName,
    currentAssignedBudgetAmt,
    index
  ) {
    if (
      budgetItemArr?.some(
        (item) =>
          item?.budgetName?.toLowerCase() ===
          currentAssignedBudgetName?.toLowerCase()
      )
    ) {
      toast.warning(`${currentAssignedBudgetName} already exists`);
      return;
    }

    if (
      arrayHasEmptyBudgetName &&
      totalAssignedBudgetAmt + currentAssignedBudgetAmt <= amount
    ) {
      setBudgetItemArr((prev) =>
        prev?.map((item, count) =>
          index === count
            ? {
                ...item,
                budgetName: currentAssignedBudgetName,
                budgetAmt: currentAssignedBudgetAmt,
                spendedAmt: currentAssignedBudgetAmt,
              }
            : item
        )
      );
      toast.success("New Budget Added!");
    } else {
      const newTotalBudget =
        totalAssignedBudgetAmt -
        budgetItemArr?.[index]?.budgetAmt +
        currentAssignedBudgetAmt;
      if (newTotalBudget <= amount) {
        setBudgetItemArr((prev) =>
          prev?.map((item, count) =>
            index === count
              ? {
                  ...item,
                  budgetName: currentAssignedBudgetName,
                  budgetAmt: currentAssignedBudgetAmt,
                }
              : item
          )
        );
        toast.success("Budget Updated!");
      }
    }
  }

  function removeBudgetItem(index) {
    setBudgetItemArr(
      (prev) => prev?.length && prev?.filter((item, pos) => pos !== index)
    );
  }

  return (
    <div
      className="container mx-auto py-40 space-y-20 flex flex-col items-center border-b border-blue-200"
      id="budgeting"
    >
      <h1 className="text-6xl text-gray-600">Set your budget here!</h1>

      <div className="grid grid-cols-3 justify-center gap-4">
        {budgetItemArr?.length > 0 &&
          budgetItemArr?.map((item, index) => (
            <BudgetInputFields
              key={index}
              index={index}
              item={item}
              setBudget={setBudget}
              removeBudgetItem={removeBudgetItem}
            />
          ))}

        <button
          className={`shadow-lg rounded-xl text-white ${
            totalAssignedBudgetAmt >= amount ? "bg-gray-500" : "bg-blue-200"
          }  min-h-[12.25rem] h-full text-lg`}
          disabled={totalAssignedBudgetAmt >= amount ? true : false}
          onClick={() =>
            totalAssignedBudgetAmt >= amount
              ? null
              : setBudgetItemArr((prev) => [
                  ...prev,
                  { budgetName: "", budgetAmt: 0 },
                ])
          }
        >
          {totalAssignedBudgetAmt >= amount
            ? `Budget Limit Reached`
            : `Add New`}
        </button>
      </div>
    </div>
  );
};

export default BudgetingTool;
