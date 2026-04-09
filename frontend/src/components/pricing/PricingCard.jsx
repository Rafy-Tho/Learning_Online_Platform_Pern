import { CheckCircle2, Info } from "lucide-react";

export default function PricingCard({
  tier,
  price,
  description,
  features,
  highlighted = false,
}) {
  return (
    <div
      className={`
        relative flex flex-col rounded-2xl p-8 transition-all duration-300
        bg-white shadow-lg dark:bg-slate-900 max-w-[340px] 
        ${
          highlighted
            ? "ring-2 ring-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.15)] dark:ring-cyan-400"
            : "ring-1 ring-gray-200 dark:ring-slate-700"
        }
      `}
    >
      <div className="mb-6">
        <h3
          className={`text-lg font-semibold mb-4 ${
            highlighted ? "text-cyan-400" : "text-gray-900 dark:text-white"
          }`}
        >
          {tier}
        </h3>

        <div className="flex items-end gap-1 mb-4">
          <span className="text-6xl font-bold leading-none text-gray-900 dark:text-white">
            ${price}
          </span>
          <span className="mb-2 text-sm text-gray-500 dark:text-slate-400">
            / price
          </span>
        </div>

        <p className="text-sm leading-relaxed text-gray-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle2
              size={18}
              className="flex-shrink-0 text-gray-500 dark:text-slate-400"
            />
            <span className="text-sm text-gray-700 dark:text-slate-300">
              {feature.text}
            </span>
            {feature.hasInfo && (
              <Info
                size={14}
                className="flex-shrink-0 text-gray-400 dark:text-slate-500"
              />
            )}
          </li>
        ))}
      </ul>

      <button
        className={`
          w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer
          ${
            highlighted
              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25"
              : "border border-gray-300 text-gray-900 hover:bg-gray-50 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800"
          }
        `}
      >
        Get Started
      </button>
    </div>
  );
}
