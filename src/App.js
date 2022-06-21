import "./assets/styles/GlobalStyles.scss";
import "./assets/styles/darkmode.scss";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Error from "components/NotFound/notFound";
import Main from "pages/Main/main";
import SignIn from "pages/SignIn/signin";
import SignUp from "pages/SignUp/signup";
import moment from "moment";
import { useEffect } from "react";

function App() {
  const account = JSON.parse(localStorage.getItem("account"));
  useEffect(() => {
    if (!account) return;
    else if (new Date().getTime() > account.expired) {
      localStorage.removeItem("account");
    }
  }, [account]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={account ? "main" : "signin"} />}
        />

        {account ? (
          <Route index path="main/*" element={<Main />} />
        ) : (
          <Route index path="signin" element={<SignIn />} />
        )}

        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
