import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LearningLayout from "./components/LearningLayout";
import LessonContent from "./components/courseLearning/LessonContent";
import Quiz from "./components/courseLearning/quiz/Quiz";
import IsAuthenticate from "./components/redirectRoutes/IsAuthenticate";
import ProtectRoute from "./components/redirectRoutes/ProtectRoute";
import RedirectToFirstLesson from "./components/redirectRoutes/RedirectToFirstLesson";
import CompletedCourseDashboard from "./pages/CompletedCourseDashboard";
import CourseDetailScreen from "./pages/CourseDetailScreen";
import CourseLearningScreen from "./pages/CourseLearningScreen";
import CoursePage from "./pages/CourseScreen";
import Home from "./pages/Home";
import HomeDashboard from "./pages/HomeDashboard";
import InprogressDashboard from "./pages/InprogressDashboard";
import LearningDashboard from "./pages/LearningDashboard";
import Login from "./pages/Login";
import RecentViewDashboard from "./pages/RecentViewDashboard";
import ResetPasswordFlow from "./pages/ResetPasswordFlow";
import Signup from "./pages/Signup";
import NotFoundPage from "./ui/NotFoundPage";
import PricingScreen from "./pages/PricingScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* App Layout */}
        <Route path="/" element={<AppLayout />}>
          {/* Login and Signup */}
          <Route element={<IsAuthenticate />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPasswordFlow />} />
          </Route>
          {/* Learning Dashboard */}
          <Route element={<ProtectRoute />}>
            <Route path="/learning-dashboard" element={<LearningDashboard />}>
              <Route index element={<HomeDashboard />} />
              <Route path="recent-viewed" element={<RecentViewDashboard />} />
              <Route path="in-progress" element={<InprogressDashboard />} />
              <Route path="completed" element={<CompletedCourseDashboard />} />
            </Route>
          </Route>
          {/* Courses */}
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:courseId" element={<CourseDetailScreen />} />
          <Route path="/pricing" element={<PricingScreen />} />
        </Route>
        {/* Learning Layout */}
        <Route element={<ProtectRoute />}>
          <Route path="/courses/:courseId/lessons" element={<LearningLayout />}>
            <Route element={<CourseLearningScreen />}>
              <Route index element={<RedirectToFirstLesson />} />
              <Route path=":lessonId">
                <Route index element={<LessonContent />} />
                <Route path="quiz" element={<Quiz />} />
              </Route>
            </Route>
          </Route>
        </Route>
        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
