// Official Rust logo SVG
function RustLogo({ size = 32, color = '#ce422b', spinning = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 106 106"
      width={size}
      height={size}
      style={spinning ? { animation: 'rust-logo-spin 8s linear infinite' } : undefined}
      aria-label="Rust logo"
    >
      <style>{`
        @keyframes rust-logo-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
      {/* Outer gear ring */}
      <circle cx="53" cy="53" r="46" fill="none" stroke={color} strokeWidth="3" />
      {/* Gear teeth (simplified as dashed circle) */}
      <circle
        cx="53"
        cy="53"
        r="46"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray="8 10"
      />
      {/* Inner circle */}
      <circle cx="53" cy="53" r="36" fill="none" stroke={color} strokeWidth="2" />
      {/* R letter */}
      <text
        x="53"
        y="53"
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="42"
        fontWeight="bold"
        fontFamily="serif"
      >
        R
      </text>
    </svg>
  );
}

export default RustLogo;
