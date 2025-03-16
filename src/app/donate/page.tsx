'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const donationTiers = [
    { amount: 500, impact: 'Provides meals for 10 children' },
    { amount: 1000, impact: 'Supports education materials for 5 students' },
    { amount: 2500, impact: 'Funds a month of vocational training' },
    { amount: 5000, impact: 'Enables complete education support for one child' }
  ];

  const handleDonateClick = () => {
    const amount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);
    // Implement payment gateway integration here
    console.log('Processing donation of ₹', amount);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <div className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-6xl font-extrabold text-gray-900 mb-8 animate-fade-in tracking-tight">
              Make a Difference Today
            </h1>
            <p className="text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Your contribution helps us create lasting impact in our community through education and empowerment.
            </p>
          </div>

          {/* Donation Section */}
          <div className="bg-white rounded-2xl shadow-xl p-10 mb-16 transform hover:scale-[1.01] transition-all duration-300 border border-gray-100">
            <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center tracking-tight">Select Donation Amount</h2>
            
            {/* Donation Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {donationTiers.map((tier, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAmount(tier.amount)}
                  className={`p-8 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${selectedAmount === tier.amount ? 'border-blue-600 bg-blue-50 shadow-lg ring-4 ring-blue-100' : 'border-gray-200 hover:border-blue-400 hover:shadow-lg'}`}
                >
                  <div className="text-4xl font-bold text-blue-600 mb-4">₹{tier.amount}</div>
                  <p className="text-base text-gray-700 leading-relaxed font-medium">{tier.impact}</p>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-12">
              <label htmlFor="custom-amount" className="block text-xl font-semibold text-gray-800 mb-4 text-center">
                Or enter custom amount
              </label>
              <div className="mt-2 relative rounded-xl shadow-lg max-w-sm mx-auto border border-gray-200">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-700 text-xl font-semibold">₹</span>
                </div>
                <input
                  type="number"
                  name="custom-amount"
                  id="custom-amount"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-4 text-xl text-gray-900 border-gray-300 rounded-xl transition-shadow duration-300 hover:shadow-xl bg-white"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                />
              </div>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonateClick}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-5 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg mx-auto block"
              disabled={!selectedAmount && !customAmount}
            >
              Proceed to Donate
            </button>
          </div>


        </div>
      </div>

      <Footer />
    </main>
  );
}