import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        const now = new Date();

        const hours = now.getHours();
        if (hours < 12) {
            setMessage('Good Morning');
        } else if (hours < 18) {
            setMessage('Good Afternoon');
        } else {
            setMessage('Good Evening');
        }

        return unsubscribe;
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            window.location.href = '/login';
            alert('logout successfully!')
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) {
        return <div className='text-center mt-64 text-xl'>Loading...</div>;
    }

    return (
        <div className='flex justify-around p-4 bg-indigo-300'>
        <p className='text-2xl text-white'>{message}, {user.email}</p>
        <button className="bg-red-500 text-white text-lg px-4 py-2 rounded hover:bg-red-600 active:bg-red-700 active:scale-95 transition"
        onClick={logout}
        >
            Logout
            </button>
        </div>
  );
};

export default Navbar;
