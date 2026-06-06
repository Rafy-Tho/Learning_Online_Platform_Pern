import SpinnerLoader from "./SpinnerLoader";
import ErrorMessage from "./ErrorMessage";

function AsyncBoundary({ query, children, loader = <SpinnerLoader /> }) {
  if (query.isPending || query.isLoading) return loader;
  if (query.error) return <ErrorMessage message={query.error.message} />;
  return children;
}

export default AsyncBoundary;
