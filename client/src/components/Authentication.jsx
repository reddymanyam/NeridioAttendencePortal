import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = (formData) => {
    console.log('Sign In Data:', formData);

    // Mock role assignment (replace with real API response)
    if (formData.email === "admin@test.com") {
      login("admin");
      navigate("/admin"); 
    } else {
      login("employee");
      navigate("/employee");
    }
  };

  const handleSignUp = (formData) => {
    console.log('Sign Up Data:', formData);
    // Handle sign up
    setIsSignIn(true);
  };

  return (
    <>
      {isSignIn ? (
        <SignIn 
          onToggleForm={() => setIsSignIn(false)} 
          onSignIn={handleSignIn}
        />
      ) : (
        <SignUp 
          onToggleForm={() => setIsSignIn(true)} 
          onSignUp={handleSignUp}
        />
      )}
    </>
  );
};

export default Authentication;
