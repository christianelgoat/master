import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Bot, Zap, Trophy, Brain, HeartCrack } from "lucide-react";
import { Flashcard } from "../data";
import { cn } from "../lib/utils";

interface FlashcardViewProps {
  data: Flashcard[];
}

const SNARK_WIN = [
  "Impresionante. Tal vez sí llegues a Harvard.",
  "La miopía estratégica no te afectó hoy.",
  "Michael Porter estaría orgulloso... marginalmente.",
  "Tu eficiencia cognitiva está optimizada.",
  "Nivel de consultor de McKinsey desbloqueado.",
  "¿Ves que sí rinde leer los casos?",
];

const SNARK_LOSS = [
  "Tu estrategia acaba de quebrar como Kodak.",
  "Eficacia: Cero. Optimiza tus recursos cerebrales.",
  "Hasta un pasante de primer año sabría eso.",
  "Disonancia estratégica detectada en tus neuronas.",
  "Tu ventaja competitiva acaba de caducar.",
  "Esa respuesta fue tan predecible como ineficaz.",
];

export function FlashcardView({ data }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [robotMsg, setRobotMsg] = useState("Iniciemos. Demuestra tus capacidades dinámicas. Toca la tarjeta para voltearla.");
  const [isAnimatingRobot, setIsAnimatingRobot] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [actionEffect, setActionEffect] = useState<'win' | 'loss' | null>(null);

  const audioWinRef = useRef<HTMLAudioElement | null>(null);
  const audioLossRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // We use data URIs for simple beeps
    audioWinRef.current = new Audio("data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"+Array(200).join("A"));
  }, []);

  const playSound = (type: 'win'|'loss') => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'win') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  };

  const handleRobotSpeak = (type: 'win' | 'loss') => {
    setIsAnimatingRobot(true);
    const msgs = type === 'win' ? SNARK_WIN : SNARK_LOSS;
    setRobotMsg(msgs[Math.floor(Math.random() * msgs.length)]);
    setTimeout(() => setIsAnimatingRobot(false), 2000);
  };

  const handleGrade = (knewIt: boolean) => {
    setActionEffect(knewIt ? 'win' : 'loss');

    if (knewIt) {
      setScore(s => s + 1);
      playSound('win');
      handleRobotSpeak('win');
    } else {
      playSound('loss');
      handleRobotSpeak('loss');
    }

    // Set faster transition
    setTimeout(() => {
      setIsFlipped(false);
      setActionEffect(null);
      setTimeout(() => {
        if (currentIndex < data.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setGameComplete(true);
          setRobotMsg(`Simulación terminada. Puntuación: ${score + (knewIt ? 1 : 0)}/${data.length}. El mercado decidirá tu destino.`);
        }
      }, 150); // Faster flip back
    }, 400); // Super fast rating delay
  };

  if (gameComplete) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center bg-white p-12 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/50 via-white to-white -z-10" />
        <Trophy className="w-24 h-24 text-amber-500 mx-auto mb-6 animate-bounce" />
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Reporte Estratégico</h2>
        <p className="text-2xl text-slate-600 mb-8">Nivel de Competencia: 
          <span className="font-bold text-indigo-600 block text-6xl mt-4 drop-shadow-md">{Math.round((score / data.length) * 100)}%</span>
        </p>
        <button 
          onClick={() => { setGameComplete(false); setCurrentIndex(0); setScore(0); setRobotMsg("Reiniciando sistemas..."); }}
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-200"
        >
          Reiniciar Simulación
        </button>
      </div>
    );
  }

  const currentCard = data[currentIndex];
  const progressPercent = ((currentIndex) / data.length) * 100;

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-start min-h-[85vh] pt-4 relative">
      
      {/* Visual Effects Overlay */}
      <AnimatePresence>
        {actionEffect === 'win' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1.5, y: 0 }}
            exit={{ opacity: 0, scale: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none drop-shadow-2xl text-amber-400"
          >
            <Zap className="w-48 h-48 fill-amber-400" />
          </motion.div>
        )}
        {actionEffect === 'loss' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1.5, y: 0, rotate: [-10, 10, -10, 0] }}
            exit={{ opacity: 0, scale: 2, y: 50 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none drop-shadow-2xl text-red-500"
          >
            <HeartCrack className="w-48 h-48 fill-red-500" />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="w-full flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <Zap className="w-8 h-8 text-amber-500 fill-amber-500 animate-pulse" />
            Active Recall Arena
          </h2>
          <p className="text-slate-500 font-medium mt-1">Nivel {currentIndex + 1} de {data.length} &mdash; Defiende tu posición</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Score</p>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-2">
            <p className="text-3xl font-black text-indigo-600 font-mono">{score}</p>
          </div>
        </div>
      </header>

      {/* Progress Bar & Robot */}
      <div className="w-full flex items-center gap-6 mb-10">
        <div className="flex-1">
          <div className="h-4 w-full bg-slate-200/60 rounded-full overflow-hidden shadow-inner p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        
        {/* The Snarky Robot */}
        <div className="relative flex items-end">
          <div className={cn(
            "absolute -top-16 right-full mr-4 w-72 bg-slate-900 text-white p-4 rounded-3xl rounded-br-none text-sm font-medium shadow-2xl transition-all duration-300 border border-slate-700",
            isAnimatingRobot ? "scale-105 bg-indigo-900 border-indigo-500/50" : "scale-100"
          )}>
            {robotMsg}
          </div>
          <div className={cn(
            "bg-gradient-to-br from-slate-800 to-slate-950 p-4 rounded-2xl shadow-xl border border-slate-700 transition-transform duration-200 z-10",
            isAnimatingRobot && "scale-110 -translate-y-2 rotate-[5deg] ring-4 ring-indigo-500/30"
          )}>
            <Bot className={cn("w-10 h-10 transition-colors", isAnimatingRobot ? "text-amber-400" : "text-indigo-400")} />
          </div>
        </div>
      </div>

      {/* Card Arena */}
      <div className="relative w-full max-w-3xl aspect-[16/10] perspective-1000 cursor-pointer mb-12" onClick={() => !isFlipped && setIsFlipped(true)}>
        <motion.div
          className="w-full h-full relative preserve-3d transition-transform duration-300 ease-out"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-amber-300 to-orange-400 border border-orange-200 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-14 text-center overflow-hidden hover:scale-[1.02] transition-transform">
            <div className="absolute inset-0 bg-white/20 backface-hidden" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '16px 16px' }} />
            
            <span className="absolute top-8 left-8 text-sm font-bold uppercase tracking-widest text-orange-900 bg-white/40 backdrop-blur-sm px-5 py-2 rounded-full z-10 shadow-sm border border-white/30">
              {currentCard.category}
            </span>
            <span className="absolute top-8 right-8 text-4xl font-black text-white/50 select-none z-0 mix-blend-overlay">
              Q{currentCard.difficulty}
            </span>
            
            <h3 className="text-4xl md:text-5xl font-black text-orange-950 leading-tight relative z-10 tracking-tight drop-shadow-sm">
              {currentCard.question}
            </h3>
            
            <div className="absolute bottom-8 flex items-center gap-2 text-white/80 font-bold bg-black/10 px-6 py-2 rounded-full animate-pulse">
              <span>Touch to Hack</span>
              <Brain className="w-5 h-5" />
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-pink-500 to-rose-600 border border-pink-400 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center p-14 text-center text-white rotate-y-180 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />
            <Brain className="absolute -bottom-10 -right-10 w-80 h-80 text-rose-900 opacity-20 pointer-events-none" />
            
            <span className="absolute top-8 left-8 text-sm font-bold uppercase tracking-widest text-pink-100 bg-black/20 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
              Desencriptado
            </span>
            
            <p className="text-3xl md:text-4xl text-white leading-tight font-bold relative z-10 drop-shadow-md">
              {currentCard.answer}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Grading Controls */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-8"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); handleGrade(false); }}
              className="flex items-center gap-3 px-8 py-5 rounded-3xl bg-white border-2 border-slate-200 text-slate-800 font-black hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-all shadow-xl hover:shadow-red-500/20 group hover:-translate-y-1 active:translate-y-1 text-lg"
            >
              <div className="bg-slate-100 group-hover:bg-red-100 p-2.5 rounded-2xl transition-colors">
                <X className="w-7 h-7" strokeWidth={3} />
              </div>
              Fallé
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleGrade(true); }}
              className="flex items-center gap-3 px-8 py-5 rounded-3xl bg-indigo-600 text-white font-black hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all shadow-xl group hover:-translate-y-1 active:translate-y-1 text-lg"
            >
              Impecable
              <div className="bg-indigo-500/50 group-hover:bg-white text-white group-hover:text-indigo-600 p-2.5 rounded-2xl transition-colors">
                <Check className="w-7 h-7" strokeWidth={3} />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
