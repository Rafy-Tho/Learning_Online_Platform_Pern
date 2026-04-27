import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget this!
import useAuth from '../hooks/useAuth';
import ErrorMessage from '../ui/ErrorMessage';
import Footer from './Footer';
import Navigation from './Navigation';
function AppLayout() {
  const { error } = useAuth();

  if (error) return <ErrorMessage message={error.message || 'Server error'} />;
  return (
    <div className="min-w-sm bg-slate-100 dark:bg-slate-900">
      <Navigation />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default AppLayout;
