import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import ToDoInput from './components/ToDoInput';
import ToDoList from './components/ToDoList';
import Register from './components/Register';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div className='text-center mt-64 text-xl'>Loading...</div>;
  }

  return (
    <Router>
    <Routes>
    <Route path="/" element= {
        user ?  
        (
          <>
            <Navbar/>
            <ToDoInput/>
            <ToDoList />
          </>
        ) : <Navigate to='/register'/>
    } />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
  );
}

export default App;
