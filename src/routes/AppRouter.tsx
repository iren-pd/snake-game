import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import routes from "./routes";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.game} element={<GamePage />} />

        <Route path="*" element={<Navigate to={routes.home} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
