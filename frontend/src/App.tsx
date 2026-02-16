import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import Login from './auth/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import { isLoggedIn } from './auth/authService';
import AIInsights from './pages/AIInsights';
import MonthlyReport from './pages/Monthly';
import AnnualReport from './pages/Annual';

interface AppRoute {
  path: string;
  element: () => ReactNode;
  isPrivate?: boolean;
}

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const routes: AppRoute[] = [
    { path: '/login', element: () => <Login />, isPrivate: false },
    { path: '/dashboard', element: () => <Dashboard />, isPrivate: true },
    { path: '/transactions', element: () => <Transactions />, isPrivate: true },
    { path: '/ai-insights', element: () => <AIInsights />, isPrivate: true },
    { path: '/reports/monthly', element: () => <MonthlyReport />, isPrivate: true },
    { path: '/reports/annual', element: () => <AnnualReport />, isPrivate: true },
  ];

  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={isPrivate ? <PrivateRoute>{element()}</PrivateRoute> : element()}
          />
        ))}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;