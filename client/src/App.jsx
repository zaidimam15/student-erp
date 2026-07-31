import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import AttendanceLog from "./pages/AttendanceLog";
import Timetable from "./pages/Timetable";
import ClassFees from "./pages/ClassFees";
import SessionalMarks from "./pages/SessionalMarks";
import Notices from "./pages/Notices";
import Assignments from "./pages/Assignments";
import StaffManagement from "./pages/StaffManagement";
import StaffAttendance from "./pages/StaffAttendance";
import FinanceControl from "./pages/FinanceControl";
import ExamSchedule from "./pages/ExamSchedule";
import AcademicResults from "./pages/AcademicResults";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/students" element={<Students />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance-log" element={<AttendanceLog />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/class-fees" element={<ClassFees />} />
            <Route path="/sessional-marks" element={<SessionalMarks />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/staff-management" element={<StaffManagement />} />
            <Route path="/staff-attendance" element={<StaffAttendance />} />
            <Route path="/finance-control" element={<FinanceControl />} />
            <Route path="/exam-schedule" element={<ExamSchedule />} />
            <Route path="/academic-results" element={<AcademicResults />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
