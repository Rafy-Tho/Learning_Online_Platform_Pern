import { ArrowLeft, Award, Download } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useCertificateById } from "../hooks/queries/useCourses";
import ErrorMessage from "../ui/ErrorMessage";
import SpinnerLoader from "../ui/SpinnerLoader";

export default function CertificateView() {
  const { id } = useParams();
  const { data: certificate, isPending, error } = useCertificateById(id);

  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!certificate) return <ErrorMessage message="Certificate not found" />;

  const issuedDate = new Date(certificate.issued_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/learning-dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
            <Award className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white">Certificate of Completion</h1>
          </div>

          <div className="p-8 sm:p-12">
            <div className="border-2 border-indigo-200 dark:border-indigo-800 rounded-xl p-8 sm:p-12">
              <div className="text-center space-y-6">
                <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  This certifies that
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  {certificate.user_name}
                </h2>
                <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  has successfully completed the course
                </p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {certificate.course_name}
                </h3>
                <div className="w-24 h-0.5 bg-indigo-300 dark:bg-indigo-700 mx-auto" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Issued on {issuedDate}
                </p>
                <div className="pt-4">
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                    Certificate ID: {certificate.certificate_number}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
