import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Views/Home/Home';
import SignUp from './Views/SignUp/SignUp';
import SignIn from './Views/SignIn/SignIn';
import AnimeInfo from './Views/AnimeInfo/AnimeInfo';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/anime/:id" element={<AnimeInfo />} />
    </Routes>
  );
}

export default App;
