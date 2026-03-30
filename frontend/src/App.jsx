import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LearningLayout from "./components/LearningLayout";
import LessonContent from "./components/courseLearning/LessonContent";
import RedirectToFirstLesson from "./components/redirectRoutes/RedirectToFirstLesson";
import Coaching from "./pages/Coaching";
import Community from "./pages/Community";
import CourseDetailScreen from "./pages/CourseDetailScreen";
import CourseLearningScreen from "./pages/CourseLearningScreen";
import CoursePage from "./pages/CourseScreen";
import Home from "./pages/Home";
import LearningDashboard from "./pages/LearningDashboard";
import Login from "./pages/Login";
import ResetPasswordFlow from "./pages/ResetPasswordFlow";
import Signup from "./pages/Signup";
import NotFoundPage from "./ui/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* App Layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPasswordFlow />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:courseId" element={<CourseDetailScreen />} />

          <Route path="/learning-dashboard" element={<LearningDashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/coaching" element={<Coaching />} />
        </Route>
        {/* Learning Layout */}
        <Route path="/courses/:courseId/lessons" element={<LearningLayout />}>
          <Route element={<CourseLearningScreen />}>
            <Route index element={<RedirectToFirstLesson />} />
            <Route path=":lessonId" element={<LessonContent />} />
          </Route>
        </Route>
        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
