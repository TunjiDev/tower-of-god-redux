import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthContext from "./context-store/authContext";
import Layout from "./components/Layout/Layout";
import NewCharacterPage from "./pages/NewCharacterPage";
import AllCharactersPage from "./pages/AllCharactersPage";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="app">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          {authCtx.isLoggedIn && <Route path="/new-character" element={<NewCharacterPage />} />}
          {authCtx.isLoggedIn && <Route path="/all-characters" element={<AllCharactersPage />} />}
          {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
