import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget this!
import useAuth from '../hooks/useAuth';
import ErrorMessage from '../ui/ErrorMessage';
import SpinnerLoader from '../ui/SpinnerLoader';
import Footer from './Footer';
import Navigation from './Navigation';
function AppLayout() {
  
  const { isLoading, error } = useAuth();
  if (isLoading) return <div className="w-full h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400">Loading...</div>

  if (error) return <div className="w-full h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400"><ErrorMessage className="bg-red-50 dark:bg-red-900/20 w-full" message={error?.message || 'Server error'} /></div>
   
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
