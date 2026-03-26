import CourseCard from "./CourseCard";

function CourseCardGrid({ courses }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {courses.map((c) => (
        <CourseCard key={c.title} course={c} />
      ))}
    </div>
  );
}

export default CourseCardGrid;
