'use client';

import { useState } from 'react';

interface PaymentMethodProps {
  onClose: () => void;
  amount: number;
}

export default function PaymentMethod({ onClose, amount }: PaymentMethodProps) {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank' | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [referenceNumber, setReferenceNumber] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment verification:', {
      method: paymentMethod,
      referenceNumber,
      screenshot: screenshot?.name
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-gradient-to-br from-white/30 to-gray-700/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center items-center md:border-r border-gray-200 md:pr-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Summary</h2>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">₹{amount}</p>
            <p className="text-gray-600">Total Amount to Pay</p>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Payment Method</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              aria-label="Close payment method selection"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {!paymentMethod && (
            <div className="space-y-4">
              <button
                onClick={() => setPaymentMethod('upi')}
                className="w-full p-4 border-2 rounded-lg bg-black text-white hover:bg-white hover:text-black hover:border-gray-600 transition-all duration-300 font-medium relative group overflow-hidden"
              >
                <div className="flex items-center justify-center relative w-full">
                  <img
                    src="/icons/upi.png"
                    alt="UPI"
                    className="w-8 h-8 mr-3 transition-all duration-300 absolute left-4 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:mr-0"
                  />
                  <span className="transition-opacity duration-300 group-hover:opacity-0 ml-12">UPI Payment</span>
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod('bank')}
                className="w-full p-4 border-2 rounded-lg bg-black text-white hover:bg-white hover:text-black hover:border-gray-600 transition-all duration-300 font-medium relative group overflow-hidden"
              >
                <div className="flex items-center justify-center relative w-full">
                  <img
                    src="/icons/transfer.png"
                    alt="Bank Transfer"
                    className="w-8 h-8 mr-3 transition-all duration-300 absolute left-4 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:mr-0"
                  />
                  <span className="transition-opacity duration-300 group-hover:opacity-0 ml-12">Direct Bank Transfer</span>
                </div>
              </button>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <img
                  src="/images/upi-qr.webp"
                  alt="UPI QR Code"
                  className="mx-auto w-48 h-48 mb-4"
                />
                <p className="text-lg font-semibold text-gray-900 mb-2">UPI ID: gnane.jpb@ybl</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Upload Payment Screenshot
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Reference Number
                </label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 text-gray-900"
                  required
                />
              </div>
              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod(null)}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 font-semibold"
                >
                  Verify Payment
                </button>
              </div>
            </form>
          )}

          {paymentMethod === 'bank' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="font-semibold text-gray-900">Bank Account Details:</p>
                <p className="text-gray-800">Account Name: CVR IKSHANA</p>
                <p className="text-gray-800">Account Number: XXXXXXXX1234</p>
                <p className="text-gray-800">IFSC Code: XXXX0001234</p>
                <p className="text-gray-800">Bank Name: Example Bank</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Upload Payment Screenshot
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Reference Number
                </label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 text-gray-900"
                  required
                />
              </div>
              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod(null)}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 font-semibold"
                >
                  Verify Payment
                </button>
              </div>
            </form>
          )}


        </div>
      </div>
    </div>
  );
}