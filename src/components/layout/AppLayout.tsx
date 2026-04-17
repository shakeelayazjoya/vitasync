import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const AppLayout = () => (
  <div className="min-h-screen bg-background">
    <Sidebar />
    <TopBar />
    <main className="md:ml-60 pt-16 min-h-screen p-4 md:p-6">
      <Outlet />
    </main>
  </div>
);

export default AppLayout;
