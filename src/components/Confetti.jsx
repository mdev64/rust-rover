import './Confetti.css';

const COLORS = [
  '#ff6b6b',
  '#ffd93d',
  '#6bcb77',
  '#4d96ff',
  '#c77dff',
  '#ff9f1c',
  '#2ec4b6',
  '#ff4d6d',
  '#4cc9f0',
  '#f72585',
];

const PARTICLE_COUNT = 120;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  color: COLORS[i % COLORS.length],
  left: Math.random() * 100,
  delay: Math.random() * 1.8,
  duration: 1.8 + Math.random() * 1.5,
  size: 6 + Math.floor(Math.random() * 9),
  isCircle: Math.random() > 0.6,
  rotate: Math.floor(Math.random() * 360),
}));

function Confetti() {
  return (
    <div className="confetti-wrapper" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`confetti-piece${p.isCircle ? ' confetti-piece--circle' : ''}`}
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.isCircle ? p.size : Math.round(p.size * 0.55)}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--rotate': `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
