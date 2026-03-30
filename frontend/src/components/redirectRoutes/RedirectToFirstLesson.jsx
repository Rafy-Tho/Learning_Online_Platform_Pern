import { Navigate, useParams } from "react-router-dom";
import useGetFirstLesson from "../../hooks/course/useGetFirstLesson";
import SpinnerLoader from "../../ui/SpinnerLoader";
import ErrorMessage from "../../ui/ErrorMessage";

function RedirectToFirstLesson() {
  const params = useParams();
  const { data, isPending, error } = useGetFirstLesson();
  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <Navigate
      to={`/courses/${params.courseId}/lessons/${data?.data?.id}`}
      replace
    />
  );
}

export default RedirectToFirstLesson;
