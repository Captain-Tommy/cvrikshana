export interface Payment {
  referenceNumber: string;
  name: string;
  email: string;
  phone: string;
  amount: string;
  notes: string;
  paymentMethod: 'upi' | 'bank';
  status: 'verified' | 'rejected' | 'pending';
}

export interface PaymentVerificationRequest {
  screenshot: File;
  referenceNumber: string;
  amount: string;
  email: string;
  phone: string;
  paymentMethod: string;
  name: string;
}