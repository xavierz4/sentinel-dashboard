import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@shared/theme/icons";

export function MenuItem({ nav, index, menuType, openSubmenu, handleSubmenuToggle, showFullSidebar, isExpanded, isHovered, isMobileOpen, isActive, subMenuRefs, subMenuHeight }) {
  const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
  
  return (
    <li key={nav.name}>
      {nav.subItems ? (
        <button
          onClick={() => handleSubmenuToggle(index, menuType)}
          className={`menu-item group ${isOpen ? "menu-item-active" : "menu-item-inactive"} cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
        >
          <span className={`menu-item-icon-size  ${isOpen ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{nav.icon}</span>
          {showFullSidebar && <span className="menu-item-text">{nav.name}</span>}
          {showFullSidebar && (
            <ChevronDownIcon className={`ml-auto w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-500" : ""}`} />
          )}
        </button>
      ) : (
        nav.path && (
          <Link
            to={nav.path}
            className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}
          >
            <span className={`menu-item-icon-size ${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{nav.icon}</span>
            {showFullSidebar && <span className="menu-item-text">{nav.name}</span>}
          </Link>
        )
      )}
      {nav.subItems && showFullSidebar && (
        <div
          ref={el => { subMenuRefs.current[`${menuType}-${index}`] = el; }}
          className="overflow-hidden transition-all duration-300"
          style={{ height: isOpen ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px" }}
        >
          <ul className="mt-2 space-y-1 ml-9">
            {nav.subItems.map(subItem => (
              <li key={subItem.name}>
                <Link
                  to={subItem.path}
                  className={`menu-dropdown-item ${isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}
                >
                  {subItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
