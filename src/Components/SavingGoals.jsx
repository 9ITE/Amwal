import ProgressSlider from "./Common/ProgressSlider";

const SavingGoals = () => {
  return (
    <div
      className="container mx-auto py-40 space-y-20 flex flex-col items-center border-b border-blue-200"
      id="goals"
    >
      <h1 className="text-6xl text-gray-600">Save money for goals</h1>

      <ProgressSlider />
    </div>
  );
};

export default SavingGoals;
