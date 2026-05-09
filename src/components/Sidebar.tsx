import { BrainCircuit, Layers, Presentation, Zap } from "lucide-react";
import { cn } from "../lib/utils";

export type ViewState = "theory" | "flashcards";

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export function Sidebar({ currentView, setView }: SidebarProps) {
  const navItems = [
    { id: "theory", label: "Masterclass Teórica", icon: Presentation },
    { id: "flashcards", label: "Active Recall (Gametificado)", icon: Zap },
  ] as const;

  return (
    <aside className="w-72 bg-[#020617] min-h-screen p-6 text-white flex flex-col gap-8 shadow-2xl z-10 border-r border-slate-800">
      <div className="flex items-center gap-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800 shadow-inner">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-wide text-slate-100 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            HBS Estrategia
          </h1>
          <p className="text-xs text-indigo-400 font-mono tracking-tighter uppercase mt-0.5">Nivel MIT / Harvard</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-3">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Módulos de Aprendizaje</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={cn(
                "group relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 text-left w-full overflow-hidden",
                isActive
                  ? "bg-slate-800 text-white shadow-md ring-1 ring-slate-700"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent" />
              )}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full" />
              )}
              <Icon className={cn("w-5 h-5 relative z-10 transition-colors", isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")} />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center">
        <p className="text-xs text-slate-400 font-mono uppercase tracking-widest">Estado</p>
        <p className="text-sm font-bold text-emerald-400 mt-1 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Conectado
        </p>
      </div>
    </aside>
  );
}
