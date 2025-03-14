'use client';

import Image from 'next/image';

type StatProps = {
  stat: {
    icon: string;
    number: number;
    label: string;
    description: string;
    suffix?: string;
  };
};

export default function StatCard({ stat }: StatProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-center">
      <div className="relative h-16 w-16 mx-auto mb-4">
        <Image
          src={stat.icon}
          alt={stat.label}
          fill
          className="object-contain"
        />
      </div>
      <h5 className="text-3xl font-bold text-gray-900 mb-2">
        {stat.number.toLocaleString()}{stat.suffix || ''}
      </h5>
      <p className="text-lg font-medium text-gray-800 mb-2">{stat.label}</p>
      <p className="text-sm text-gray-600">{stat.description}</p>
    </div>
  );
}