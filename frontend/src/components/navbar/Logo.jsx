import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-1 shrink-0 group"
    >
      <i className="fa-solid fa-angle-left text-blue-600 text-xl transition-transform group-hover:-translate-x-0.5 hidden sm:block"></i>
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 px-2 sm:px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all">
        <i className="fa-solid fa-code text-white text-lg"></i>
        <span className="font-bold text-white tracking-tight text-sm sm:text-base lg:text-lg">
          E-Learning
        </span>
      </div>
      <i className="fa-solid fa-angle-right text-blue-600 text-xl transition-transform group-hover:translate-x-0.5 hidden sm:block"></i>
    </Link>
  );
}

export default Logo;
