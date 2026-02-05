import { Outlet } from "react-router-dom";
import { Backdrop } from "@shared/theme/layout/Backdrop";
import { AppHeader } from "@shared/theme/layout/AppHeader";
import { AppSidebar } from "@shared/theme/layout/AppSidebar";
import useSidebarStore from "@shared/theme/store/sidebarStore";

export const AppLayout = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebarStore();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}