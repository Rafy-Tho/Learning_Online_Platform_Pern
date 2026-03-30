import { Star } from "lucide-react";
const RatingStars = ({ rating = 4.5, maxStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxStars - Math.ceil(rating);

  return (
    <div className="flex">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-4 h-4 sm:w-5 sm:h-5 fill-orange-400 text-orange-400"
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
          <Star
            className="absolute top-0 left-0 w-4 h-4 sm:w-5 sm:h-5 fill-orange-400 text-orange-400"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400"
        />
      ))}
    </div>
  );
};

export default RatingStars;
