import React from 'react';
import { LetterTemplateProps } from '../types';
import { Scroll, Users, Calendar, FileCheck, Shield, Mail, MapPin, Quote, Download } from 'lucide-react';

export const LetterTemplate: React.FC<LetterTemplateProps> = ({ letter, position }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleExportWord = () => {
    const template = document.querySelector('.letter-content');
    if (template) {
      const html = template.innerHTML;
      const blob = new Blob([`
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Appointment Letter</title>
            <style>
              body { font-family: Arial, sans-serif; }
              .signature-line { border-bottom: 1px solid #000; width: 200px; }
            </style>
          </head>
          <body>${html}</body>
        </html>
      `], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `MCAN_Appointment_${letter.position.replace(/\s+/g, '_')}_${letter.recipientName.replace(/\s+/g, '_')}.doc`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white border-b border-green-100 p-4 mb-4 flex justify-end gap-4">
        <button
          onClick={handleExportWord}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          Save as Word
        </button>
      </div>
      
      <div className="letter-content max-w-4xl mx-auto bg-white p-6 shadow-lg border border-green-100 print:shadow-none print:border-none print:p-4">
        {/* Letterhead */}
        <div className="border-b-2 border-green-500 pb-4 mb-6">
          <div className="flex items-center gap-4 mb-3">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9tu2jBmeR0z3xxTGMLY-EHri-sqrUTPXbt5q55knyyqzkNaHyTcMEiE&s=10" 
              alt="MCAN Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-green-700">MCAN</h1>
              <p className="text-sm text-green-600">Muslim Corpers Association of Nigeria (MCAN)</p>
              <p className="text-sm text-green-600">FCT Chapter</p>
            </div>
          </div>
          
          <div className="space-y-1 text-gray-600 mb-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <p>NYSC Permanent Orientation Camp, Kubwa, Bwari Area Council, FCT Abuja</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-green-600" />
              <p>Email: mcanictng@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-green-700 italic border-t border-green-200 pt-2 text-xs">
            <Quote className="w-3 h-3" />
            <p>Motto: 'Say, Truly, my prayer and my service, my life and my death, (all) for Allah, the Cherisher of the Worlds'</p>
          </div>

          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <p className="font-medium">Batch: {letter.batch}</p>
            <div>
              <p className="font-medium">Reference: {letter.referenceNumber}</p>
              <p>{currentDate}</p>
            </div>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="mb-4">
          <p className="font-medium text-gray-800">{letter.recipientName}</p>
          <p className="mt-2">Dear {letter.recipientName.split(' ')[0]},</p>
        </div>

        {/* Appointment Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2 print:text-green-700">
            <Users className="w-4 h-4 print:text-green-700" />
            Appointment as {position.title}
          </h2>

          <p className="text-gray-700 leading-relaxed text-sm">
            I am pleased to inform you of your appointment as {position.title} of the Muslim
            Community Association of Nigeria (MCAN). This appointment is effective from{' '}
            <span className="font-medium">{letter.startDate}</span> to{' '}
            <span className="font-medium">{letter.endDate}</span>.
          </p>

          <div className="bg-green-50 p-3 rounded-lg border border-green-100 print:bg-white print:border-green-200">
            <h3 className="font-semibold text-green-700 flex items-center gap-2 mb-2 text-sm print:text-green-700">
              <FileCheck className="w-4 h-4 print:text-green-700" />
              Duties and Responsibilities:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
              {position.duties.map((duty, index) => (
                <li key={index}>{duty}</li>
              ))}
            </ul>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-100 print:bg-white print:border-green-200">
            <h3 className="font-semibold text-green-700 flex items-center gap-2 mb-2 text-sm print:text-green-700">
              <Shield className="w-4 h-4 print:text-green-700" />
              Reporting Structure:
            </h3>
            <p className="text-gray-700 text-sm">{position.reporting}</p>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-100 print:bg-white print:border-green-200">
            <h3 className="font-semibold text-green-700 flex items-center gap-2 mb-2 text-sm print:text-green-700">
              <Calendar className="w-4 h-4 print:text-green-700" />
              Meeting Requirements:
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
              {position.meetings.map((meeting, index) => (
                <li key={index}>{meeting}</li>
              ))}
            </ul>
          </div>

          {/* Standard Sections */}
          <div className="space-y-2 mt-4">
            <h3 className="font-semibold text-green-700 text-sm print:text-green-700">Code of Conduct:</h3>
            <p className="text-gray-700 text-sm">
              As a representative of MCAN, you are expected to maintain the highest
              standards of Islamic ethics and professional conduct at all times.
            </p>

            <h3 className="font-semibold text-green-700 text-sm print:text-green-700">Confidentiality:</h3>
            <p className="text-gray-700 text-sm">
              You are required to maintain strict confidentiality regarding all MCAN
              matters and sensitive information accessed during your tenure.
            </p>
          </div>

          {/* Signature Block with enhanced styling */}
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-sm">Yours sincerely,</p>
              <div className="mt-8 space-y-1">
                <div className="w-48 h-16 border border-green-100 rounded-md mb-2"></div>
                <p className="font-semibold text-green-700 print:text-green-700">Chairman, Shurah Committee</p>
                <p className="text-sm">MCAN</p>
              </div>
            </div>

            <div className="border-t border-green-200 pt-4">
              <p className="font-semibold text-green-700 text-sm print:text-green-700">Acceptance of Appointment</p>
              <p className="mt-2 text-gray-700 text-sm">
                I, {letter.recipientName}, accept this appointment and agree to fulfill
                the duties and responsibilities as outlined above.
              </p>
              <div className="mt-6 space-y-4">
                <div className="space-y-1">
                  <div className="w-48 h-16 border border-green-100 rounded-md"></div>
                  <p className="text-sm text-gray-600">Signature</p>
                </div>
                <div className="space-y-1">
                  <div className="w-48 h-8 border border-green-100 rounded-md"></div>
                  <p className="text-sm text-gray-600">Date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};