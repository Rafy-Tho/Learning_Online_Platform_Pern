import { useRef } from "react";

function NavigateHelper() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <nav>
        <button onClick={() => scrollToSection(section1Ref)}>Section 1</button>
        <button onClick={() => scrollToSection(section2Ref)}>Section 2</button>
        <button onClick={() => scrollToSection(section3Ref)}>Section 3</button>
      </nav>

      <section ref={section1Ref} style={{ height: "100vh" }}>
        Section 1 Content
      </section>
      <section ref={section2Ref} style={{ height: "100vh" }}>
        Section 2 Content
      </section>
      <section ref={section3Ref} style={{ height: "100vh" }}>
        Section 3 Content
      </section>
    </div>
  );
}
