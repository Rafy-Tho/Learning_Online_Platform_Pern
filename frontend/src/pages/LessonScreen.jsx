import { lesson } from "../constants/constant";

function LessonScreen() {
  console.log(JSON.stringify(lesson));
  return (
    <div
      className="max-w-7xl mx-auto"
      dangerouslySetInnerHTML={{ __html: lesson }}
    ></div>
  );
}

export default LessonScreen;
