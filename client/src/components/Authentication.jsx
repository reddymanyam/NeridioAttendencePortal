import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignIn = (formData) => {
    console.log('Sign In Data:', formData);
    // Handle sign in logic here
  };

  const handleSignUp = (formData) => {
    console.log('Sign Up Data:', formData);
    // Handle sign up logic here
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