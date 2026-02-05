
import { Outlet } from 'react-router-dom';
import { DashboardPage } from '@modules/dashboard/pages';

export const DashboardRouter = () => {
  return (
    <>
      <DashboardPage />
      <Outlet />
    </>
  );
};