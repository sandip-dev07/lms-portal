import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      {/* NAVBAR */}
      <div className="h-16 md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      {/* SIDEBAR */}
      <div className="hidden  md:flex h-full w-56 flex-col fixed inset-y-0 z-50 ">
        <Sidebar />
      </div>
      <main className="h-full w-full md:pl-56 pt-16">{children}</main>
    </div>
  );
};

export default DashboardLayout;
