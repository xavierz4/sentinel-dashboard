import { NotFound } from '@shared/pages';
import { UserRouter } from '@modules/user';
import { LoginPage, AuthGuard } from '@modules/auth';
import { AppLayout } from '@shared/theme/layout';
import { Routes, Route } from 'react-router-dom';
import { DashboardRouter } from '@modules/dashboard';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<AuthGuard />}>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<DashboardRouter />} />
          <Route path="/user/*" element={<UserRouter />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
