import { useState } from "react";
import { freAskQuestions } from "../../constants/freAskQuestions";
import { Minus, Plus } from "lucide-react";

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
          {freAskQuestions.map((item, idx) => (
            <div key={idx} className="accordion py-2">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left font-semibold py-4 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between"
              >
                <span>{item.q}</span>
                {openFaq === idx ? <Minus /> : <Plus />}
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
