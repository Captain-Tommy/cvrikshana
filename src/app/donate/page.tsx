'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PaymentMethod from '../components/PaymentMethod';

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const donationTiers = [
    { amount: 500, impact: 'Provides meals for 10 children' },
    { amount: 1000, impact: 'Supports education materials for 5 students' },
    { amount: 2500, impact: 'Funds a month of vocational training' },
    { amount: 5000, impact: 'Enables complete education support for one child' }
  ];

  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const handleDonateClick = () => {
    setShowPaymentMethod(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <div className="pt-32 sm:pt-36 md:pt-40 lg:pt-44 px-3 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 md:space-y-20">
          {/* Hero Section */}
          <div className="text-center relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-100 to-blue-50 -z-10 rounded-full opacity-70"></div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 tracking-tight animate-slideUp">
              Make a Difference Today
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-900 max-w-2xl mx-auto leading-relaxed font-medium px-4">
              Your contribution helps us create lasting impact in our community through education and empowerment.
            </p>
          </div>

          {/* Donation Section */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 transform hover:scale-[1.01] transition-all duration-300 border border-gray-100/50 mx-3 sm:mx-4 md:mx-0 animate-slideUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 text-center tracking-tight">Select Donation Amount</h2>
            
            {/* Donation Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {donationTiers.map((tier, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAmount(tier.amount)}
                  className={`p-4 sm:p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-2 group ${selectedAmount === tier.amount ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-xl ring-4 ring-blue-100' : 'border-gray-200 hover:border-blue-400 hover:shadow-xl bg-white/80 hover:bg-white'}`}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">₹{tier.amount}</div>
                  <p className="text-sm sm:text-base text-gray-900 leading-relaxed font-medium">{tier.impact}</p>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-8 sm:mb-12">
              <label htmlFor="custom-amount" className="block text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">
                Or enter custom amount
              </label>
              <div className="mt-2 relative rounded-xl shadow-lg max-w-sm mx-auto border border-gray-200">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-700 text-lg sm:text-xl font-semibold">₹</span>
                </div>
                <input
                  type="number"
                  name="custom-amount"
                  id="custom-amount"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-3 sm:py-4 text-lg sm:text-xl text-gray-900 border-gray-300 rounded-xl transition-shadow duration-300 hover:shadow-xl bg-white"
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
              disabled={!selectedAmount && !customAmount}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg sm:text-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg mx-auto block relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative">Proceed to Donate</span>
            </button>

            {showPaymentMethod && (
              <PaymentMethod
                onClose={() => setShowPaymentMethod(false)}
                amount={selectedAmount || (customAmount ? parseInt(customAmount) : 0)}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}