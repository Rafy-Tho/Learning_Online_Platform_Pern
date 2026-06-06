import { Award, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useMyCertificates } from "../../hooks/queries/useCourses";

export default function CertificationSection() {
  const { data: certificates, isPending } = useMyCertificates();

  if (isPending) return null;

  if (certificates && certificates.length > 0) {
    return (
      <div className="my-8 md:my-16">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
            <Award className="size-4 text-indigo-600 dark:text-indigo-400" />
          </span>
          My Certificates
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Link
              key={cert.id}
              to={`/certificates/${cert.id}`}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
                  <Award className="size-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {cert.course_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(cert.issued_at).toLocaleDateString()}
                  </p>
                </div>
                <ExternalLink className="size-4 text-gray-400 shrink-0" />
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-mono truncate">
                {cert.certificate_number}
              </p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 md:my-16">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
          <Award className="size-4 text-indigo-600 dark:text-indigo-400" />
        </span>
        Certification
      </h2>
      <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 md:flex-row md:items-center dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-indigo-300 bg-slate-50 dark:border-indigo-700 dark:bg-slate-800/50 md:w-40">
          <Award className="size-10 text-indigo-300 dark:text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">
            Your certificate is waiting. Don&apos;t delay!
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Complete a course to earn your first certificate.
          </p>
        </div>
        <Link
          to="/learning-dashboard/in-progress"
          className="shrink-0 rounded-lg border-2 border-purple-600 px-4 py-2 font-medium text-purple-600 dark:border-purple-400 dark:text-purple-400 text-center hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors"
        >
          Explore
        </Link>
      </div>
    </div>
  );
}
