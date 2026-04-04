import { useState } from "react";
import HalfStar from "./HalfStar";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function StarRating({ value, onChange, setError }) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeft = e.clientX - rect.left < rect.width / 2;
    setHovered(isLeft ? index - 0.5 : index);
  };

  const handleClick = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeft = e.clientX - rect.left < rect.width / 2;
    onChange(isLeft ? index - 0.5 : index);
    setError("");
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="cursor-pointer"
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => setHovered(0)}
            onClick={(e) => handleClick(e, i)}
          >
            <HalfStar index={i} active={active} />
          </div>
        ))}
      </div>
      {active > 0 && (
        <span className="text-sm font-medium text-orange-600">
          {labels[active]}
        </span>
      )}
    </div>
  );
}
export default StarRating;
