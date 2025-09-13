// src/components/MultipleChoiceCard.tsx
import React, { useState } from "react";

type Props = {
  cloze: string;
  options: string[];
  correct: string;
  onCorrect: () => void;
};

export default function MultipleChoiceCard({ cloze, options, correct, onCorrect }: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle"|"right"|"wrong">("idle");

  const select = (opt: string) => {
    setPicked(opt);
    if (opt === correct) {
      setStatus("right");
      setTimeout(onCorrect, 400); // small "correct" flash
    } else {
      setStatus("wrong");
    }
  };

  return (
    <div className="mt-4 rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/10">
      <p className="text-white/90 mb-3 text-lg font-medium">Step 1: Choose the correct word</p>
      <p className="text-xl md:text-2xl mb-4">{
        // Capitalize first letter for nicer look
        cloze.charAt(0).toUpperCase() + cloze.slice(1)
      }</p>
      <div className="grid gap-3">
        {options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isPicked = picked === opt;
          const color =
            status === "right" && isPicked ? "ring-2 ring-green-400 bg-green-500/15" :
            status === "wrong" && isPicked ? "ring-2 ring-rose-400 bg-rose-500/15" :
            "hover:bg-white/10";
          return (
            <button
              key={opt + idx}
              onClick={() => select(opt)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition ${color} border border-white/10`}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">{letter}</span>
              <span className="text-lg">{opt}</span>
            </button>
          );
        })}
      </div>
      {status === "wrong" && (
        <p className="mt-3 text-rose-300">Not quite — try again.</p>
      )}
      {status === "right" && (
        <p className="mt-3 text-green-300">Correct! Now speak the complete sentence.</p>
      )}
    </div>
  );
}