function HalfStar({ index, active }) {
  const full = active >= index;
  const half = !full && active >= index - 0.5;
  const id = `star-${index}`;

  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <defs>
        <clipPath id={`left-${id}`}>
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>
      {/* Empty background */}
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill="#e2e8f0"
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Half fill */}
      {half && (
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          fill="#ea580c"
          stroke="#ea580c"
          strokeWidth="1.2"
          strokeLinejoin="round"
          clipPath={`url(#left-${id})`}
        />
      )}
      {/* Full fill */}
      {full && (
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          fill="#ea580c"
          stroke="#ea580c"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default HalfStar;
