import type { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div className="main-page flex-grow-1 p-4">{children}</div>
    </div>
  );
};

export default MainLayout;