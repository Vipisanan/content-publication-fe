import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContentListPage from "./pages/ContentListPage";
import { CreateContentPage } from "./pages/CreateContentPage";
import { Toaster } from "react-hot-toast";
import ViewContentPage from "./pages/ViewContentPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const token = localStorage.getItem("authToken");
  return (
    <>
      {/* <NotificationDropdown userId={userId} /> */}

      <Router>
        {token ? (
          <RootLayout>
            <Routes>
              <Route path="/" element={<ContentListPage />} />
              <Route path="/content/new" element={<CreateContentPage />} />
              <Route path="/content/:id" element={<ViewContentPage />} />
              <Route path="/category" element={<CategoryPage />} />
              {/*<Route
              path="/content/:id/edit"
              element={<ContentForm editMode />}
            /> */}
              {/* Add more routes as needed */}
            </Routes>
          </RootLayout>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        )}
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
        reverseOrder={false}
      />
    </>
  );
}

export default App;
