
import { Route, Routes } from 'react-router-dom';
import { UserCreate, UserAdminPage } from '@modules/user';

export const UserRouter = () => {
  return (
    <Routes>
      <Route index element={<UserAdminPage />} />
      <Route path="create" element={<UserCreate />} />
    </Routes>
  );
};