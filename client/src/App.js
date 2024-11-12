// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import Forget from './pages/Forget';
import Category from './pages/Category';
import Notification from './pages/Notification';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import { useAxiosInterceptor } from './calls';

function App() {
  const { loading } = useSelector(state => state.loader);

  return (
    <div className='App'>
      {loading && (
        <div className='loader-container'>
          <div className='loader'></div>
        </div>
      )}
      <Router>
        <AxiosInterceptorSetup />
        <AppRoutes />
      </Router>
    </div>
  );
}

// Component to setup Axios interceptor within Router context
function AxiosInterceptorSetup() {
  useAxiosInterceptor();
  return null; // No UI, only for setting up the interceptor
}

// Separate component for routes
function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forget-password' element={<Forget />} />
      <Route path='/reset-password' element={<Reset />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
