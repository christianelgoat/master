import { useState } from "react";
import { CheckCircle2, CircleDashed } from "lucide-react";
import { CaseStudy } from "../data";
import { cn } from "../lib/utils";

interface CaseStudyViewProps {
  data: CaseStudy[];
}

export function CaseStudyView({ data }: CaseStudyViewProps) {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentCase = data[currentCaseIndex];

  const handleSelect = (id: string) => {
    if (showResult) return;
    setSelectedOptionId(id);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setShowResult(true);
  };

  const handleNextCase = () => {
    setShowResult(false);
    setSelectedOptionId(null);
    setCurrentCaseIndex((prev) => (prev + 1) % data.length);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-12 border-b border-slate-200 pb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-serif text-slate-900 tracking-tight">Simulador del Método del Caso</h2>
          <span className="text-sm font-mono bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            Caso {currentCaseIndex + 1} de {data.length}
          </span>
        </div>
        <p className="text-slate-500 text-lg">Aplica la teoría a fricciones corporativas reales.</p>
      </header>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="bg-slate-50 border-b border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">{currentCase.title}</h3>
          <p className="text-slate-700 leading-relaxed text-lg">
            {currentCase.context}
          </p>
        </div>
        
        <div className="p-8 bg-white">
          <h4 className="font-semibold text-slate-800 text-xl mb-6">
            Dilema Estratégico: <span className="font-normal text-slate-600">{currentCase.challenge}</span>
          </h4>

          <div className="space-y-4">
            {currentCase.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrect = option.isCorrect;
              
              let stateClasses = "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700";
              
              if (isSelected && !showResult) {
                stateClasses = "border-slate-800 bg-slate-50 text-slate-900 ring-1 ring-slate-800";
              } else if (showResult) {
                if (isCorrect) {
                  stateClasses = isSelected ? "border-green-500 bg-green-50 text-green-900 ring-1 ring-green-500" : "border-green-200 bg-green-50/50 text-green-800";
                } else if (isSelected && !isCorrect) {
                  stateClasses = "border-red-500 bg-red-50 text-red-900 ring-1 ring-red-500";
                } else {
                  stateClasses = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                }
              }

              return (
                <div key={option.id} className="space-y-3">
                  <button
                    onClick={() => handleSelect(option.id)}
                    disabled={showResult}
                    className={cn(
                      "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-start gap-4",
                      stateClasses
                    )}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {showResult && isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <CircleDashed className={cn("w-5 h-5", isSelected ? "text-slate-800" : "text-slate-400")} />
                      )}
                    </div>
                    <span className="text-lg leading-snug">{option.text}</span>
                  </button>

                  {/* Explanation Reveal */}
                  {showResult && (isSelected || isCorrect) && (
                    <div className={cn(
                      "ml-11 p-4 rounded-lg text-sm leading-relaxed",
                      isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}>
                      <strong className="font-semibold">{isCorrect ? "Explicación Académica:" : "Error Estratégico:"}</strong> {option.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-end">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOptionId}
                className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Analizar Decisión
              </button>
            ) : (
              <button
                onClick={handleNextCase}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Siguiente Caso
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
