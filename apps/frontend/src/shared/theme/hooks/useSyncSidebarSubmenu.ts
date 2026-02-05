import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import useSidebarStore from "@shared/theme/store/sidebarStore";
import { navItems, othersItems } from "@shared/theme/components/sidebar/SidebarMenuItems";

export default function useSyncSidebarSubmenu() {
  const { setOpenSubmenu } = useSidebarStore();
  const location = useLocation();

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType, index });
              submenuMatched = true;
            }
          });
        }
      });
    });
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive, setOpenSubmenu]);
}
