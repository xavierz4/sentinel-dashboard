import { useState } from "react";
import { Link } from "react-router-dom";
import { DropdownItem } from "@shared/theme/components/ui/dropdown/DropdownItem";
import { Dropdown } from "@shared/theme/components/ui/dropdown/Dropdown";
import { useLoginLogic } from "@modules/auth"; // Hook para Logout
import { useAuthStore } from "@core/store/authStore"; // Datos del usuario

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Conectar con la lógica real
  const { logout } = useLoginLogic();
  const user = useAuthStore((state) => state.user);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/images/user/owner.jpg" alt="User" />
        </span>
        <span className="block mr-1 font-medium text-theme-sm">{user?.username || 'Usuario'}</span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.username || 'Usuario'}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email || 'email@example.com'}
          </span>
        </div>
        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <svg className="w-5 h-5 stroke-gray-500 group-hover:stroke-gray-700 dark:group-hover:stroke-gray-200" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.5C12.0711 12.5 13.75 10.8211 13.75 8.75C13.75 6.67893 12.0711 5 10 5C7.92893 5 6.25 6.67893 6.25 8.75C6.25 10.8211 7.92893 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.5 17.5V16.25C17.5 15.2554 17.1049 14.3016 16.4017 13.5983C15.6984 12.8951 14.7446 12.5 13.75 12.5H6.25C5.25544 12.5 4.30161 12.8951 3.59835 13.5983C2.89509 14.3016 2.5 15.2554 2.5 16.25V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Edit profile
            </DropdownItem>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <svg className="w-5 h-5 stroke-gray-500 group-hover:stroke-gray-700 dark:group-hover:stroke-gray-200" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 6.25L16.25 10L12.5 13.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.25 10H8.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.125 3.125H5C4.50272 3.125 4.02581 3.32254 3.67417 3.67417C3.32254 4.02581 3.125 4.50272 3.125 5V15C3.125 15.4973 3.32254 15.9742 3.67417 16.3258C4.02581 16.6775 4.50272 16.875 5 16.875H8.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}
