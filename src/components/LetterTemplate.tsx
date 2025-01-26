import React from 'react';
import { LetterTemplateProps } from '../types';
import { Scroll, Users, Calendar, FileCheck, Shield, Mail, MapPin, Quote } from 'lucide-react';

export const LetterTemplate: React.FC<LetterTemplateProps> = ({ letter, position }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg border border-green-100 print:shadow-none print:border-none">
      {/* Letterhead */}
      <div className="border-b-2 border-green-500 pb-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9tu2jBmeR0z3xxTGMLY-EHri-sqrUTPXbt5q55knyyqzkNaHyTcMEiE&s=10" 
            alt="MCAN Logo" 
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-green-700">MCAN</h1>
            <p className="text-green-600">Muslim Corpers Association of Nigeria (MCAN)</p>
            <p className="text-green-600">FCT Chapter</p>
          </div>
        </div>
        
        <div className="space-y-2 text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <p>NYSC Permanent Orientation Camp, Kubwa, Bwari Area Council, FCT Abuja</p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-green-600" />
            <p>Email: mcanictng@gmail.com</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-green-700 italic border-t border-green-200 pt-4">
          <Quote className="w-4 h-4" />
          <p className="text-sm">Motto: 'Say, Truly, my prayer and my service, my life and my death, (all) for Allah, the Cherisher of the Worlds'</p>
        </div>

        <div className="flex justify-end mt-4 text-sm text-gray-600">
          <div>
            <p className="font-medium">Reference: {letter.referenceNumber}</p>
            <p>{currentDate}</p>
          </div>
        </div>
      </div>

      {/* Recipient Details */}
      <div className="mb-8">
        <p className="font-medium text-gray-800">{letter.recipientName}</p>
        <p className="mt-4">Dear {letter.recipientName.split(' ')[0]},</p>
      </div>

      {/* Appointment Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 print:text-green-700">
          <Users className="w-5 h-5 print:text-green-700" />
          Appointment as {position.title}
        </h2>

        <p className="text-gray-700 leading-relaxed">
          I am pleased to inform you of your appointment as {position.title} of the Muslim
          Community Association of Nigeria (MCAN). This appointment is effective from{' '}
          <span className="font-medium">{letter.startDate}</span> to{' '}
          <span className="font-medium">{letter.endDate}</span>.
        </p>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100 print:bg-white print:border-green-200">
          <h3 className="font-semibold text-green-700 flex items-center gap-2 mb-3 print:text-green-700">
            <FileCheck className="w-5 h-5 print:text-green-700" />
            Duties and Responsibilities:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {position.duties.map((duty, index) => (
              <li key={index}>{duty}</li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100 print:bg-white print:border-green-200">
          <h3 className="font-semibold text-green-700 flex items-center gap-2 mb-3 print:text-green-700">
            <Shield className="w-5 h-5 print:text-green-700" />
            Reporting Structure:
          </h3>
          <p className="text-gray-700">{position.reporting}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100 print:bg-white print:border-green-200">
          <h3 className="font-semibold text-green-700 flex items-center gap-2 mb-3 print:text-green-700">
            <Calendar className="w-5 h-5 print:text-green-700" />
            Meeting Requirements:
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {position.meetings.map((meeting, index) => (
              <li key={index}>{meeting}</li>
            ))}
          </ul>
        </div>

        {/* Standard Sections */}
        <div className="space-y-4 mt-8">
          <h3 className="font-semibold text-green-700 print:text-green-700">Code of Conduct:</h3>
          <p className="text-gray-700">
            As a representative of MCAN, you are expected to maintain the highest
            standards of Islamic ethics and professional conduct at all times.
          </p>

          <h3 className="font-semibold text-green-700 print:text-green-700">Confidentiality:</h3>
          <p className="text-gray-700">
            You are required to maintain strict confidentiality regarding all MCAN
            matters and sensitive information accessed during your tenure.
          </p>
        </div>

        {/* Signature Block */}
        <div className="mt-12 space-y-8">
          <div>
            <p>Yours sincerely,</p>
            <div className="mt-8">
              <p className="font-semibold text-green-700 print:text-green-700">Chairman, Shurah Committee</p>
              <p>MCAN</p>
            </div>
          </div>

          <div className="border-t border-green-200 pt-6">
            <p className="font-semibold text-green-700 print:text-green-700">Acceptance of Appointment</p>
            <p className="mt-4 text-gray-700">
              I, {letter.recipientName}, accept this appointment and agree to fulfill
              the duties and responsibilities as outlined above.
            </p>
            <div className="mt-8 space-y-4">
              <div className="border-b border-gray-300 pb-2">
                <p>Signature: _____________________</p>
              </div>
              <div className="border-b border-gray-300 pb-2">
                <p>Date: _________________________</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};