import { ChevronRight, CheckCircle2, Sparkles } from "lucide-react";
import { lesson } from "../../constants/constant";

export function LessonContent() {
  return (
    <article className="px-6 py-8 md:px-10 lg:px-16">
      {/* Breadcrumb */}
      <div className="" dangerouslySetInnerHTML={{ __html: lesson }}></div>
    </article>
  );
}
