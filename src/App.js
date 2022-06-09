import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import { Loading } from "components/Loading";

const Home = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("pages/Home/home")), 1000);
  });
});

const About = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("pages/About/about")), 1000);
  });
});

const Trash = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("pages/Trash/trash")), 3000);
  });
});
const User = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("pages/Users/user")), 3000);
  });
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />

        <Route
          index
          path="/home"
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="/about"
          element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          }
        />

        <Route
          path="/trash"
          element={
            <Suspense fallback={<Loading />}>
              <Trash />
            </Suspense>
          }
        />

        <Route
          path="/user"
          element={
            <Suspense fallback={<Loading />}>
              <User />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
