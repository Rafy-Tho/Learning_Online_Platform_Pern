import { Star } from "lucide-react";

const StarRating = () => (
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <Star className="w-5 h-5 text-yellow-400 fill-current" key={i} />
    ))}
  </div>
);

export default StarRating;
