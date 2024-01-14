import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthPage } from '../auth';
import { CalendarPage } from '../calendar';

const AppRouter = () => {
  // const authStatus = 'not-authenticated';
  const authStatus = 'authenticated';

  return (
    <Routes>
      {authStatus === 'not-authenticated' ? (
        <>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/*" element={<Navigate to="/auth" />} />
        </>
      ) : (
        <>
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/calendar" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
