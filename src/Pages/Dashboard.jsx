import Budgeting from "../Components/BudgetingTool";
import IncomeAction from "../Components/IncomeAction";
import SavingGoals from "../Components/SavingGoals";
import { persistor } from "../redux/store";

const Dashboard = () => {
  // persistor.purge();
  return (
    <>
      <IncomeAction />
      <Budgeting />
      <SavingGoals />
    </>
  );
};

export default Dashboard;
