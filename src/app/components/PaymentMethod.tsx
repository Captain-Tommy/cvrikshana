'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PaymentMethodProps {
  onClose: () => void;
  amount: number;
}

export default function PaymentMethod({ onClose, amount }: PaymentMethodProps) {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank' | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append('screenshot', screenshot);
    formData.append('referenceNumber', referenceNumber);
    formData.append('amount', amount.toString());
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('paymentMethod', paymentMethod || '');
    formData.append('name', name);

    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Payment verification submitted successfully! We have sent the details to your email address. Please check your spam folder if you don\'t see it in your inbox.');
        onClose();
      } else {
        alert('Failed to submit payment verification. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-black/30 flex items-center justify-center z-[100] p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative animate-slideUp my-4 border border-white/20">
        <div className="flex flex-col justify-center items-center md:border-r border-gray-200/50 md:pr-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 sm:mb-4">Payment Summary</h2>
          <div className="text-center w-full p-8 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl shadow-inner relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-600/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 relative">₹{amount}</p>
            <p className="text-gray-600 text-sm sm:text-base relative">Total Amount to Pay</p>
            <div className="mt-4 pt-4 border-t border-blue-100">
              <p className="text-sm text-gray-500">Your donation will help us:</p>
              <ul className="text-sm text-gray-600 mt-2 space-y-2">
                <li className="flex items-center">✨ Support education initiatives</li>
                <li className="flex items-center">💝 Empower communities</li>
                <li className="flex items-center">🌱 Create sustainable impact</li>
              </ul>
            </div>
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
                className="w-full p-6 border-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 border-transparent hover:border-blue-400 transition-all duration-300 font-medium relative group overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center gap-4 relative w-full">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Image
                      src="/icons/upi.png"
                      alt="UPI"
                      width={32}
                      height={32}
                      className="transition-all duration-300"
                    />
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold text-lg">UPI Payment</span>
                    <span className="text-sm text-white/80">Pay instantly using any UPI app</span>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod('bank')}
                className="w-full p-6 border-2 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black border-transparent hover:border-gray-600 transition-all duration-300 font-medium relative group overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center gap-4 relative w-full">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Image
                      src="/icons/transfer.png"
                      alt="Bank Transfer"
                      width={32}
                      height={32}
                      className="transition-all duration-300"
                    />
                  </div>
                  <div className="text-left">
                    <span className="block font-semibold text-lg">Bank Transfer</span>
                    <span className="text-sm text-white/80">Direct bank account transfer</span>
                  </div>
                </div>
              </button>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <Image
                  src="/images/upi-qr.webp"
                  alt="UPI QR Code"
                  width={192}
                  height={192}
                  className="mx-auto mb-4"
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
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
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
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
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
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 font-semibold relative"
                >
                  {isLoading ? (
                    <>
                      <span className="opacity-0">Verify Payment</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      </div>
                    </>
                  ) : (
                    'Verify Payment'
                  )}
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
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
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
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
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