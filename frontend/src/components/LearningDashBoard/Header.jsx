import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// src/components/Header.tsx
export default function Header() {
  const { user } = useAuth();
  return (
    <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex gap-4">
        <img
          src={user.image_url}
          alt=""
          className="size-14 shrink-0 rounded-full border border-slate-200 dark:border-slate-700"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome, {user.name}!
            </h1>
          </div>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Take the first steps to building your professional skills
          </p>
        </div>
      </div>
      <Link
         to='/courses'
        className="shrink-0 self-start rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-indigo-600 dark:border-slate-600 dark:text-indigo-400 block"
      >
        Explore All
      </Link>
    </header>
  );
}
