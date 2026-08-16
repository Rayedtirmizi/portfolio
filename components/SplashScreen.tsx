"use client";

import { useEffect, useState } from "react";

interface Bat {
  id: number;
  xStart: string;
  yStart: string;
  xEnd: string;
  yEnd: string;
  scale: number;
  rotate: number;
  duration: number;
  delay: number;
  flapDuration: number;
  maxOpacity: number;
}

function generateBats(count: number): Bat[] {
  const bats: Bat[] = [];
  for (let i = 0; i < count; i++) {
    const fromLeft = Math.random() > 0.5;
    const yStart = `${Math.random() * 80 + 10}vh`;
    const yEnd = `${Math.random() * 80 + 10}vh`;
    const isForeground = i > count * 0.75;

    bats.push({
      id: i,
      xStart: fromLeft ? "-15vw" : "115vw",
      yStart,
      xEnd: fromLeft ? "115vw" : "-15vw",
      yEnd,
      scale: isForeground ? 1.4 + Math.random() * 1.2 : 0.4 + Math.random() * 0.8,
      rotate: fromLeft ? Math.random() * 10 - 5 : 180 + (Math.random() * 10 - 5),
      duration: isForeground ? 1.4 + Math.random() * 0.8 : 2.5 + Math.random() * 2,
      delay: (i / count) * 3.2 + Math.random() * 0.3,
      flapDuration: 0.15 + Math.random() * 0.15,
      maxOpacity: isForeground ? 0.9 : 0.35 + Math.random() * 0.35,
    });
  }
  return bats;
}

function BatSVG({ bat }: { bat: Bat }) {
  return (
    <svg
      viewBox="0 0 100 60"
      className="absolute"
      style={
        {
          width: `${bat.scale * 60}px`,
          height: `${bat.scale * 36}px`,
          left: 0,
          top: 0,
          opacity: 0,
          "--x-start": bat.xStart,
          "--y-start": bat.yStart,
          "--x-end": bat.xEnd,
          "--y-end": bat.yEnd,
          "--rotate": `${bat.rotate}deg`,
          "--max-opacity": bat.maxOpacity,
          animation: `batFly ${bat.duration}s ease-in-out ${bat.delay}s forwards`,
        } as React.CSSProperties
      }
    >
      <g style={{ transformOrigin: "50px 30px" }}>
        <path
          d="M50 30 Q30 5 5 15 Q25 25 40 28 Q45 30 50 30"
          fill="#4a3226"
          style={{
            transformOrigin: "48px 28px",
            animation: `wingFlapLeft ${bat.flapDuration}s ease-in-out infinite`,
          }}
        />
        <path
          d="M50 30 Q70 5 95 15 Q75 25 60 28 Q55 30 50 30"
          fill="#4a3226"
          style={{
            transformOrigin: "52px 28px",
            animation: `wingFlapRight ${bat.flapDuration}s ease-in-out infinite`,
          }}
        />
        <ellipse cx="50" cy="30" rx="4" ry="6" fill="#4a3226" />
      </g>
    </svg>
  );
}

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [bats, setBats] = useState<Bat[]>([]);
  const [showName, setShowName] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setBats(generateBats(70));

    const nameTimer = setTimeout(() => setShowName(true), 4200);
    const fadeTimer = setTimeout(() => setFadeOut(true), 6800);
    const doneTimer = setTimeout(() => {
      setHidden(true);
      onComplete();
    }, 7800);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {bats.map((bat) => (
        <BatSVG key={bat.id} bat={bat} />
      ))}

      <div
        className={`relative z-10 text-center transition-all duration-[1400ms] ease-out ${
          showName ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <h1
          className="text-4xl md:text-6xl tracking-wide text-white"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          RAYED TIRMIZI
        </h1>
        <p className="text-sm md:text-base tracking-[0.3em] text-white/50 mt-4">
          SOFTWARE ENGINEER
        </p>
      </div>

      <style jsx global>{`
        @keyframes batFly {
          0% {
            transform: translate(var(--x-start), var(--y-start)) rotate(var(--rotate));
            opacity: 0;
          }
          12% {
            opacity: var(--max-opacity);
          }
          88% {
            opacity: var(--max-opacity);
          }
          100% {
            transform: translate(var(--x-end), var(--y-end)) rotate(var(--rotate));
            opacity: 0;
          }
        }
        @keyframes wingFlapLeft {
          0%,
          100% {
            transform: scaleY(1) rotate(0deg);
          }
          50% {
            transform: scaleY(0.45) rotate(-8deg);
          }
        }
        @keyframes wingFlapRight {
          0%,
          100% {
            transform: scaleY(1) rotate(0deg);
          }
          50% {
            transform: scaleY(0.45) rotate(8deg);
          }
        }
      `}</style>
    </div>
  );
}