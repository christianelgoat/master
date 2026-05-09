import { useState } from "react";
import { Sidebar, ViewState } from "./components/Sidebar";
import { TheoryView } from "./components/TheoryView";
import { FlashcardView } from "./components/FlashcardView";
import { theoryData, flashcardsData } from "./data";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("theory");

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 max-h-screen overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-12">
          {currentView === "theory" && <TheoryView data={theoryData} />}
          {currentView === "flashcards" && <FlashcardView data={flashcardsData} />}
        </div>
      </main>
    </div>
  );
}
