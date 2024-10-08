import Budgeting from "../Components/BudgetingTool";
import IncomeAction from "../Components/IncomeAction";
import { persistor } from "../redux/store";

const Dashboard = () => {
  return (
    <div className="text-center">
      <IncomeAction />
      {/* <Budgeting /> */}

      {/* <button
        onClick={() => {
          persistor.purge();
        }}
      >
        Reset
      </button> */}
    </div>
  );
};

export default Dashboard;
