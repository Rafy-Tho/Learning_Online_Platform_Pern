import { ArrowUpRight, BookOpen, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatsCard } from "../components/StatsCard";
import { StatusBadge } from "../components/StatusBadge";
import { DashboardSkeleton } from "../components/ui/skeleton";
import { mockCourses, mockUsers } from "../data/mockData";
import useGetDashboardData from "../hooks/dashboard-data/use-get-dashboard-data";
export default function DashboardPage() {
  const navigate = useNavigate();
  const { data, isPending, error } = useGetDashboardData();
  const totalCourses = data?.data?.totalCourses || 0;
  const totalUsers = data?.data?.totalStudents || 0;
  const totalInstructors = data?.data?.totalInstructors || 0;
  const totalEnrollments = data?.data?.totalEnrollments || 0;
  if (isPending) return <DashboardSkeleton />;
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your learning platform
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Courses" value={totalCourses} icon={BookOpen} />
        <StatsCard title="Total Users" value={totalUsers} icon={Users} />
        <StatsCard
          title="Total Instructors"
          value={totalInstructors}
          icon={Users}
        />
        <StatsCard
          title="Enrollments"
          value={totalEnrollments}
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Courses</h2>
            <button
              onClick={() => navigate("/courses")}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {data?.data?.courses?.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {course.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {course.instructor_name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={course.status} />
                  <StatusBadge status={course.access_type} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Instructors</h2>
            <button
              onClick={() => navigate("/instructors")}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {data?.data?.instructors?.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <StatusBadge status={user.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
