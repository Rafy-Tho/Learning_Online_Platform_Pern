import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Coaching from "./pages/Coaching";
import Community from "./pages/Community";
import CourseDetailScreen from "./pages/CourseDetailScreen";
import CoursePage from "./pages/CourseScreen";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPasswordFlow from "./pages/ResetPasswordFlow";
import Signup from "./pages/Signup";
import NotFoundPage from "./ui/NotFoundPage";
import CourseLearningScreen from "./pages/CourseLearningScreen";
import LearningDashboard from "./pages/LearningDashboard";
import LessonScreen from "./pages/LessonScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPasswordFlow />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:courseId" element={<CourseDetailScreen />} />
          <Route
            path="/learning/:courseId"
            element={<CourseLearningScreen />}
          />
          <Route path="/learning-dashboard" element={<LearningDashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/lessons/:lessonId" element={<LessonScreen />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
