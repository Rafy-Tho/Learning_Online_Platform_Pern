import guideSteps from "../../constants/guideSteps";

function Guide() {
  return (
    <section id="how-it-works" className="md:mt-28 mt-16 px-4 sm:px-10 mb-16">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-blue-500 dark:text-blue-400 font-semibold mb-2">
            YOUR LEARNING JOURNEY
          </p>
          <h2 className="text-2xl md:text-3xl font-bold leading-relaxed">
            Start in three simple steps
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {guideSteps.map((step, index) => (
            <div className="text-center" key={index}>
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Guide;
