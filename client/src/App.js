import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import Forget from './pages/Forget';
import Category from './pages/Category';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';

function App() {
  const { loading } = useSelector(state => state.loader);

  return (
    <div className='App'>
      {loading && (
        <div className='loader-container'>
          {" "}
          <div className='loader'> </div>{" "}
        </div>
      )}
        <Router>
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
          </Routes>
        </Router>
    </div>
  );
}

export default App;