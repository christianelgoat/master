import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ExternalLink, Lightbulb, GraduationCap, ArrowLeft, ArrowRight } from "lucide-react";
import { TheoryTopic } from "../data";
import { cn } from "../lib/utils";

interface TheoryViewProps {
  data: TheoryTopic[];
}

export function TheoryView({ data }: TheoryViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedDeepDive, setExpandedDeepDive] = useState<string | null>(null);

  const themeColors = {
    blue: "from-blue-500 to-cyan-500 bg-blue-50 text-blue-900 border-blue-200 ring-blue-500",
    indigo: "from-indigo-500 to-purple-500 bg-indigo-50 text-indigo-900 border-indigo-200 ring-indigo-500",
    emerald: "from-emerald-500 to-teal-500 bg-emerald-50 text-emerald-900 border-emerald-200 ring-emerald-500"
  };

  const topic = data[currentIndex];
  const colors = themeColors[topic.theme] || themeColors.blue;
  const isExpanded = expandedDeepDive === topic.id;

  const handleNext = () => {
    setExpandedDeepDive(null);
    setCurrentIndex((prev) => Math.min(prev + 1, data.length - 1));
  };

  const handlePrev = () => {
    setExpandedDeepDive(null);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-[85vh] py-4">
      <header className="border-b border-slate-200 pb-6 mb-8 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>Syllabus Premium</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">Masterclass: Organización & Estrategia</h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === data.length - 1}
            className="p-4 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          <motion.article 
            key={topic.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group w-full"
          >
            {/* Header Banner */}
            <div className={cn("h-3 w-full bg-gradient-to-r opacity-80", colors.split(" ")[0], colors.split(" ")[1])} />
            
            <div className="p-8 md:p-12 relative flex flex-col lg:flex-row gap-12">
              {/* Number Watermark */}
              <span className="absolute top-8 right-8 text-8xl font-black text-slate-50 opacity-50 select-none -z-10 tracking-tighter">
                0{currentIndex + 1}
              </span>

              <div className="flex-1">
                <div className="flex items-baseline gap-4 mb-3">
                  <h3 className="text-4xl font-bold text-slate-900 tracking-tight">{topic.title}</h3>
                </div>
                <h4 className={cn("text-xl font-medium mb-8 flex items-center gap-3", colors.split(" ")[3])}>
                  <div className={cn("w-2 h-2 rounded-full bg-current")} />
                  {topic.subtitle}
                </h4>
                
                <p className="text-slate-600 leading-relaxed max-w-2xl mb-8 text-xl font-light">
                  {topic.content}
                </p>

                {/* Deep Dive Action */}
                <div className="mt-auto">
                  <motion.button
                    onClick={() => setExpandedDeepDive(isExpanded ? null : topic.id)}
                    className={cn(
                      "w-full lg:w-4/5 text-left p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group/btn flex flex-col h-full justify-center",
                      isExpanded ? "border-slate-900 bg-slate-900 text-white shadow-xl" : "border-slate-200 hover:border-slate-300 bg-white shadow-sm"
                    )}
                  >
                    {/* Hover effect gradient */}
                    <div className={cn("absolute inset-0 opacity-0 group-hover/btn:opacity-10 transition-opacity bg-gradient-to-br", colors.split(" ")[0], colors.split(" ")[1])} />
                    
                    <div className="relative z-10 w-full">
                      <div className="flex justify-between items-center mb-3">
                        <span className={cn("text-xs font-bold uppercase tracking-widest", isExpanded ? "text-slate-400" : "text-slate-500")}>
                          Caso de Estudio & Reflexión
                        </span>
                        <ExternalLink className={cn("w-5 h-5 transition-transform duration-300", isExpanded ? "text-white rotate-45" : "text-slate-400")} />
                      </div>
                      <h6 className={cn("font-bold text-xl leading-tight", isExpanded ? "text-white" : "text-slate-900")}>
                        {topic.deepDive.title}
                      </h6>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="overflow-hidden"
                          >
                            <div className={cn("rounded-2xl p-6 border-l-4 bg-slate-800/50 backdrop-blur-sm shadow-inner text-slate-200", colors.split(" ")[2].replace('bg-','border-'))}>
                              <p className="text-lg leading-relaxed font-serif">
                                {topic.deepDive.content}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Bullet points */}
              <div className="lg:w-96 shrink-0 bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-inner h-fit">
                <h5 className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-sm flex items-center gap-3 border-b border-slate-200 pb-4">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Dimensiones
                </h5>
                <ul className="space-y-6">
                  {topic.bulletPoints.map((point, i) => (
                    <li key={i} className="flex gap-4 items-start group/point">
                      <div className={cn("mt-1 p-1.5 rounded-lg text-white bg-gradient-to-br shadow-sm flex-shrink-0 transition-transform group-hover/point:scale-110", colors.split(" ")[0], colors.split(" ")[1])}>
                        <ChevronRight className="w-4 h-4" strokeWidth={4} />
                      </div>
                      <span className="text-slate-700 font-medium leading-relaxed text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Progress Footer */}
      <div className="mt-8 flex items-center justify-center gap-3 mx-auto">
        {data.map((_, i) => (
           <button 
             key={i} 
             onClick={() => { setExpandedDeepDive(null); setCurrentIndex(i); }} 
             className={cn("h-2.5 rounded-full transition-all duration-300", i === currentIndex ? "w-10 bg-indigo-600" : "w-2.5 bg-slate-300 hover:bg-slate-400")}
             aria-label={`Ir al módulo ${i + 1}`}
           />
        ))}
      </div>
    </div>
  );
}
