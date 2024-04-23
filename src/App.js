import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Views/SignUp/SignUp';
import SignIn from './Views/SignIn/SignIn';

const App = () => {
  return (
    <Routes>
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
