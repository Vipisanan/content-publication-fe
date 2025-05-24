import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <RootLayout>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/content/new" element={<ContentForm />} />
            <Route path="/content/:id" element={<ContentDetail />} />
            <Route
              path="/content/:id/edit"
              element={<ContentForm editMode />}
            /> */}
            {/* Add more routes as needed */}
          </Routes>
        </RootLayout>
      </Router>
    </>
  );
}

export default App;
