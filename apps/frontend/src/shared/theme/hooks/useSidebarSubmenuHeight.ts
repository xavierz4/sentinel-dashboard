import { useEffect } from "react";

export function useSidebarSubmenuHeight(openSubmenu, subMenuRefs, setSubMenuHeight) {
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu, subMenuRefs, setSubMenuHeight]);
}
