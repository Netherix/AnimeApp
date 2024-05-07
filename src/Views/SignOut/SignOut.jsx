import React from 'react';
import { signOut } from 'firebase/auth';
import auth from '../../Firebase';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/signin'); // Redirect to the login screen after sign-out
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <span className='nav-link' style={{ cursor: 'pointer' }} onClick={handleSignOut}>
      Sign Out
    </span>
  );
};

export default SignOut;
