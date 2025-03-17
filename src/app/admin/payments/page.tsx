'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IkshanaIdVerification from '../../components/IkshanaIdVerification';

interface Payment {
  referenceNumber: string;
  name: string;
  email: string;
  phone: string;
  amount: string;
  notes: string;
  paymentMethod: 'upi' | 'bank';
  status: 'verified' | 'rejected' | 'pending';
}

export default function AdminPaymentsPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [ikshanaId, setIkshanaId] = useState('');
  const [payment, setPayment] = useState<Payment>({
    referenceNumber: '',
    name: '',
    email: '',
    phone: '',
    amount: '',
    notes: '',
    paymentMethod: 'upi',
    status: 'pending'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payment, verifiedBy: ikshanaId }),
      });

      if (response.ok) {
        alert('Payment record updated successfully!');
        setPayment({
          referenceNumber: '',
          name: '',
          email: '',
          phone: '',
          amount: '',
          notes: '',
          paymentMethod: 'upi',
          status: 'pending'
        });
      } else {
        alert('Failed to update payment record.');
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 px-3 sm:px-6 lg:px-8">
        {!isVerified ? (
          <IkshanaIdVerification
            onVerify={(id) => {
              setIkshanaId(id);
              setIsVerified(true);
            }}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                Admin Payment Management
              </h1>
              <p className="text-base sm:text-lg text-gray-800">
                Manage and verify donation payments
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="referenceNumber" className="block text-sm font-semibold text-gray-800 mb-1.5 sm:mb-2">
                      Reference Number *
                    </label>
                    <input
                      type="text"
                      id="referenceNumber"
                      required
                      value={payment.referenceNumber}
                      onChange={(e) => setPayment({ ...payment, referenceNumber: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Donor Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={payment.name}
                      onChange={(e) => setPayment({ ...payment, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={payment.email}
                      onChange={(e) => setPayment({ ...payment, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={payment.phone}
                      onChange={(e) => setPayment({ ...payment, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                      Amount (₹) *
                    </label>
                    <input
                      type="number"
                      id="amount"
                      required
                      value={payment.amount}
                      onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700 mb-2">
                      Payment Method *
                    </label>
                    <select
                      id="paymentMethod"
                      required
                      value={payment.paymentMethod}
                      onChange={(e) => setPayment({ ...payment, paymentMethod: e.target.value as 'upi' | 'bank' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="upi">UPI</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                      Verification Status *
                    </label>
                    <select
                      id="status"
                      required
                      value={payment.status}
                      onChange={(e) => setPayment({ ...payment, status: e.target.value as 'pending' | 'verified' | 'rejected' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-semibold text-gray-800 mb-1.5 sm:mb-2">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      rows={4}
                      value={payment.notes}
                      onChange={(e) => setPayment({ ...payment, notes: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                      placeholder="Add any additional notes or comments..."
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-sm sm:text-base"
                  >
                    Update Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}