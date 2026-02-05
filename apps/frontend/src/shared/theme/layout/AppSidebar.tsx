
import { Link, useLocation } from "react-router-dom";
import { useRef, useCallback, useState } from "react";
import useSidebarStore from "@shared/theme/store/sidebarStore";
import { MenuSection } from '@shared/theme/components/sidebar/MenuSection';
import useSyncSidebarSubmenu from "@shared/theme/hooks/useSyncSidebarSubmenu";
import { useSidebarSubmenuHeight } from "@shared/theme/hooks/useSidebarSubmenuHeight";
import { navItems, othersItems } from '@shared/theme/components/sidebar/SidebarMenuItems';

export const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, openSubmenu, toggleSubmenu, setIsHovered } = useSidebarStore();
  const location = useLocation();
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  useSyncSidebarSubmenu();
  useSidebarSubmenuHeight(openSubmenu, subMenuRefs, setSubMenuHeight);

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const handleSubmenuToggle = (index, menuType) => {
    toggleSubmenu({ type: menuType, index });
  };

  const showFullSidebar = isExpanded || isHovered || isMobileOpen;

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${showFullSidebar ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link to="/">
          {showFullSidebar ? (
            <>
              <img className="dark:hidden" src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
              <img className="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" width={150} height={40} />
            </>
          ) : (
            <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>
      
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <MenuSection
              title="Menu"
              menuType="main"
              items={navItems}
              isActive={isActive}
              isHovered={isHovered}
              isExpanded={isExpanded}
              subMenuRefs={subMenuRefs}
              openSubmenu={openSubmenu}
              isMobileOpen={isMobileOpen}
              subMenuHeight={subMenuHeight}
              showFullSidebar={showFullSidebar}
              handleSubmenuToggle={handleSubmenuToggle}
            />
            <MenuSection
              title="Others"
              menuType="others"
              items={othersItems}
              isActive={isActive}
              isHovered={isHovered}
              isExpanded={isExpanded}
              openSubmenu={openSubmenu}
              subMenuRefs={subMenuRefs}
              isMobileOpen={isMobileOpen}
              subMenuHeight={subMenuHeight}
              showFullSidebar={showFullSidebar}
              handleSubmenuToggle={handleSubmenuToggle}
            />
          </div>
        </nav>
      </div>
    </aside>
  );
}
