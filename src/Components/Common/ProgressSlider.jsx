import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setSavingGoals } from "../../redux/slices/goalSlices";

const ProgressSlider = () => {
  const dispatch = useDispatch();
  const { goal } = useSelector((state) => state.goals);
  const [localGoalValue, setLocalGoalValue] = useState(
    goal?.length > 0
      ? goal[0]
      : {
          goalName: "",
          goalAmt: 0,
          goalFulfilled: 0,
          goalRate: 0,
        }
  );
  const [progressPercent, setProgressPercent] = useState(0);

  console.log("progress", progressPercent);

  useEffect(() => {
    if (localGoalValue?.goalFulfilled && localGoalValue?.goalAmt)
      setProgressPercent(
        Math.round(
          (localGoalValue?.goalFulfilled / localGoalValue?.goalAmt) * 100
        )
      );
  }, [localGoalValue]);

  return (
    <div className="flex flex-col gap-y-14 w-1/3">
      <label
        htmlFor="goalName"
        className="text-xl text-gray-600 flex items-center gap-4"
      >
        <span className="flex-1 whitespace-nowrap">Goal Name:</span>

        <input
          type="text"
          id="goalName"
          placeholder="Set Name"
          defaultValue={localGoalValue?.goalName}
          className="bg-transparent border-b border-gray-600 outline-none w-full text-gray-500"
          onChange={(e) =>
            setLocalGoalValue((prev) => ({ ...prev, goalName: e.target.value }))
          }
        />
      </label>

      <label
        htmlFor="goalAmt"
        className="text-xl text-gray-600 flex items-center gap-4"
      >
        <span className="flex-1 whitespace-nowrap">Saving Amount:</span>
        <input
          type="number"
          id="goalAmt"
          placeholder="Set Amount"
          defaultValue={localGoalValue?.goalAmt}
          className="bg-transparent border-b border-gray-600 outline-none w-full text-gray-500"
          onChange={(e) =>
            setLocalGoalValue((prev) => ({
              ...prev,
              goalAmt: Number(e.target.value),
            }))
          }
        />
      </label>

      <label
        htmlFor="goalRate"
        className="text-xl text-gray-600 flex items-center gap-4"
      >
        <span className="flex-1 whitespace-nowrap">Set Rate:</span>
        <input
          type="number"
          id="goalRate"
          placeholder="Set Rate"
          defaultValue={localGoalValue?.goalRate}
          className="bg-transparent border-b border-gray-600 outline-none w-full text-gray-500"
          onChange={(e) => {
            setLocalGoalValue((prev) => ({
              ...prev,
              goalRate: Number(e.target.value),
            }));
          }}
        />
      </label>

      <button
        className="w-full bg-blue-200 text-white text-lg rounded-lg py-2 hover:scale-105 transition-all"
        onClick={() => {
          if (
            !localGoalValue?.goalName ||
            !localGoalValue?.goalAmt ||
            !localGoalValue?.goalRate
          )
            toast.warning("Saving goal Name, Amount & Rate are required!");
          else if (
            localGoalValue?.goalRate > 100 ||
            localGoalValue?.goalRate < 0
          )
            toast.warning("Rate should remain between 1 and 100");
          else {
            dispatch(setSavingGoals([localGoalValue]));
            toast.success("Goal set!");
          }
        }}
      >
        {goal?.length > 0 ? "Update" : "Save"}
      </button>

      <div className="relative w-full my-6">
        <span
          className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs absolute -top-8"
          style={{ left: `calc(${progressPercent}% - 16px)` }}
        >{`${progressPercent}%`}</span>

        <div className="w-full h-12 rounded-full border border-gray-600 overflow-hidden p-1">
          <div
            className="h-full bg-gray-600 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

ProgressSlider.propTypes = { progress: PropTypes.number };

export default ProgressSlider;
