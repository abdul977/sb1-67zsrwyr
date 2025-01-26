import React, { useState } from 'react';
import { positions } from '../data/positions';
import { Letter } from '../types';
import { User, Briefcase, Calendar, Hash } from 'lucide-react';

interface LetterFormProps {
  onSubmit: (letter: Letter) => void;
}

export const LetterForm: React.FC<LetterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Letter>({
    recipientName: '',
    position: '',
    startDate: '',
    endDate: '',
    referenceNumber: `MCAN/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const allPositions = Object.values(positions).flat();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <User className="w-4 h-4 text-green-600" />
          Recipient's Full Name
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.recipientName}
          onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-green-600" />
          Position
        </label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
        >
          <option value="">Select a position</option>
          {Object.entries(positions).map(([category, categoryPositions]) => (
            <optgroup key={category} label={category.toUpperCase()}>
              {categoryPositions.map((pos) => (
                <option key={pos.title} value={pos.title}>
                  {pos.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            Start Date
          </label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-600" />
            End Date
          </label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <Hash className="w-4 h-4 text-green-600" />
          Reference Number
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={formData.referenceNumber}
          onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Generate Letter
      </button>
    </form>
  );
};