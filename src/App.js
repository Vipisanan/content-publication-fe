import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContentListPage from "./pages/ContentListPage";
import { CreateContentPage } from "./pages/CreateContentPage";
import { Toaster } from "react-hot-toast";
import ViewContentPage from "./pages/ViewContentPage";
import CategoryPage from "./pages/CategoryPage";
import AddProfilePage from "./pages/AddProfilePage";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <Router>
        {token ? (
          <RootLayout>
            <Routes>
              <Route path="/" element={<ContentListPage />} />
              <Route path="/content/new" element={<CreateContentPage />} />
              <Route path="/content/:id" element={<ViewContentPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/add-profile" element={<AddProfilePage />} />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </RootLayout>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{ duration: 5000 }}
        reverseOrder={false}
      />
    </>
  );
}

export default App;
