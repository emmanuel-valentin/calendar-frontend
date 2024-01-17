import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react'

const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h1>Cargando...</h1>;
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/*" element={<Navigate to="/auth" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
