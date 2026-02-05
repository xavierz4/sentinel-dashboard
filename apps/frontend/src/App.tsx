import { AppRouter } from '@root/AppRouter';
import { ThemeProvider } from '@shared/theme';

export const App = () => {
  return (
    <ThemeProvider>
      {/* Zustand no necesita Provider envolvente */}
      <AppRouter />
    </ThemeProvider>
  );
}
