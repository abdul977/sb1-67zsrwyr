import React, { useState, useRef } from 'react';
import { LetterForm } from './components/LetterForm';
import { LetterTemplate } from './components/LetterTemplate';
import { Letter } from './types';
import { positions } from './data/positions';
import { Scroll, FileText, Download, Award } from 'lucide-react';
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
      <header className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg border-b border-green-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Award className="w-12 h-12 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                MCAN ADHOC EXECUTIVE APPOINTMENT LETTER SYSTEM
              </h1>
              <p className="text-green-100 mt-1">Muslim Corpers' Association of Nigeria - FCT Chapter</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-600">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-semibold text-green-800">Generate Appointment Letter</h2>
            </div>
            <LetterForm onSubmit={handleGenerateLetter} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-600">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Scroll className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-green-800">Preview</h2>
              </div>
              {generatedLetter && position && (
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 shadow-md"
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