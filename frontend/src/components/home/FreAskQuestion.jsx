import { useState } from "react";
import questions from "../../constants/questions";

function FreAskQuestion() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section id="faq" className="md:mt-28 mt-16 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-4xl mx-auto pb-10">
          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
            QUESTIONS?
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-relaxed">
            Frequently asked questions
          </h2>
        </div>
        <div className="divide-y divide-gray-300 dark:divide-gray-700">
          {questions.map((item, idx) => (
            <div key={idx} className="accordion py-2">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left font-semibold py-4 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between"
              >
                <span>{item.q}</span>
                <svg
                  className={`w-3 fill-current transform transition-transform ${
                    openFaq === idx ? "rotate-45" : ""
                  }`}
                  viewBox="0 0 42 42"
                >
                  <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === idx ? "max-h-40 pb-4" : "max-h-0"
                }`}
              >
                <p className="leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FreAskQuestion;
