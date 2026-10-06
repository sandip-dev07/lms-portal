import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";
import { isClerkConfigured } from "@/lib/auth";

const Navbar = () => {
  return (
    <div className="px-4 border-b h-full flex items-center bg-white dark:bg-[#020817] z-10 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes clerkConfigured={isClerkConfigured()} />
    </div>
  );
};

export default Navbar;
