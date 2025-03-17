'use client';

import { useState } from 'react';

interface IkshanaIdVerificationProps {
  onVerify: (ikshanaId: string) => void;
}

export default function IkshanaIdVerification({ onVerify }: IkshanaIdVerificationProps) {
  const [ikshanaId, setIkshanaId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ikshanaId.trim()) {
      setError('Please enter your Ikshana ID');
      return;
    }
    onVerify(ikshanaId);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Admin Verification
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ikshanaId" className="block text-sm font-semibold text-gray-800 mb-2">
              Ikshana ID
            </label>
            <input
              type="text"
              id="ikshanaId"
              value={ikshanaId}
              onChange={(e) => {
                setIkshanaId(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter your Ikshana ID"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}