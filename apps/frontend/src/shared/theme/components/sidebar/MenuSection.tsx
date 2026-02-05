import { HorizontaLDots } from "@shared/theme/icons";
import { MenuItem } from "@shared/theme/components/sidebar/MenuItem";

export function MenuSection({ title, items, menuType, ...props }) {
  return (
    <div>
      <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!props.isExpanded && !props.isHovered ? "lg:justify-center" : "justify-start"}`}>
        {props.showFullSidebar ? title : <HorizontaLDots className="size-6" />}
      </h2>
      <ul className="flex flex-col gap-4">
        {items.map((nav, index) => (
          <MenuItem
            key={nav.name}
            nav={nav}
            index={index}
            menuType={menuType}
            {...props}
          />
        ))}
      </ul>
    </div>
  );
}
