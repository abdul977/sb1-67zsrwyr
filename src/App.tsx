import React, { useState, useRef } from 'react';
import { LetterForm } from './components/LetterForm';
import { LetterTemplate } from './components/LetterTemplate';
import { Letter } from './types';
import { positions } from './data/positions';
import { Scroll, FileText, Download } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

function App() {
  const [generatedLetter, setGeneratedLetter] = useState<Letter | null>(null);
  const letterTemplateRef = useRef<HTMLDivElement>(null);

  const handleGenerateLetter = (letter: Letter) => {
    setGeneratedLetter(letter);
  };

  const handlePrint = useReactToPrint({
    content: () => letterTemplateRef.current,
    documentTitle: `MCAN_Appointment_${generatedLetter?.position.replace(/\s+/g, '_')}_${generatedLetter?.recipientName.replace(/\s+/g, '_')}`,
  });

  const position = generatedLetter
    ? Object.values(positions).flat().find(p => p.title === generatedLetter.position)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9tu2jBmeR0z3xxTGMLY-EHri-sqrUTPXbt5q55knyyqzkNaHyTcMEiE&s=10" 
              alt="MCAN Logo" 
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl font-semibold text-green-800">
              MCAN Executive Appointment Letter System
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-medium text-green-800">Generate Appointment Letter</h2>
            </div>
            <LetterForm onSubmit={handleGenerateLetter} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Scroll className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-medium text-green-800">Preview</h2>
              </div>
              {generatedLetter && position && (
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  Save as PDF
                </button>
              )}
            </div>
            <div ref={letterTemplateRef}>
              {generatedLetter && position ? (
                <LetterTemplate letter={generatedLetter} position={position} />
              ) : (
                <div className="text-center text-gray-500 py-12 bg-green-50 rounded-lg border border-green-100">
                  Fill out the form to generate a letter preview
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;