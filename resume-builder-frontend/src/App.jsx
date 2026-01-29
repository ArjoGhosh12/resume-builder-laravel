import { Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateResume from "./components/CreateResume";
import EditResumePage from "./components/EditResumePage";
import ResumeDownload from "./Pages/ResumeDownload";
import AdminDashboard from './Pages/AdminDashboard';
import AdminRoute from './routes/AdminRoute';
import './index.css';


function App() {
  return (
    <Routes>
      <Route path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
         <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

      <Route path="/resume/new" element={<CreateResume />} />
      <Route path="/resume/:id" element={<EditResumePage />} />
      {/* <Route path="/resume/:id/preview" element={<ResumeDownload />} /> */}
      <Route path="/resume/:id/download" element={<ResumeDownload />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
