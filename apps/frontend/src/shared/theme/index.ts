// Contexts
export { ThemeProvider, useTheme } from '@shared/theme/context/ThemeContext';

// Layout
export { Backdrop } from '@shared/theme/layout/Backdrop';
export { AppHeader } from '@shared/theme/layout/AppHeader';
export { AppLayout } from '@shared/theme/layout/AppLayout';
export { AppSidebar } from '@shared/theme/layout/AppSidebar';

// Components
export { Dropdown } from '@shared/theme/components/ui/dropdown/Dropdown';
export { UserDropdown } from '@shared/theme/components/header/UserDropdown';
export { DropdownItem } from '@shared/theme/components/ui/dropdown/DropdownItem';
export { ThemeToggleButton } from '@shared/theme/components/common/ThemeToggleButton';
export { NotificationDropdown } from '@shared/theme/components/header/NotificationDropdown';

// Icons (puedes importar individualmente o usar index.ts si lo tienes tipado)
export * as Icons from '@shared/theme/icons';
