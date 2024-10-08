import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Layout = () => {
  return (
    <div className="w-full h-screen bg-blue-200 p-8 font-concert">
      <div className="w-full h-full bg-gray-100 rounded-xl overflow-x-hidden overflow-y-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
