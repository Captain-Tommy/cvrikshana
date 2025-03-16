'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

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
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const duration = 1000; // Animation duration in milliseconds

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * stat.number));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(stat.number);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, stat.number]);

  return (
    <div ref={cardRef} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-center">
      <div className="relative h-16 w-16 mx-auto mb-4">
        <Image
          src={stat.icon}
          alt={stat.label}
          fill
          className="object-contain"
        />
      </div>
      <h5 className="text-3xl font-bold text-gray-900 mb-2">
        {count.toLocaleString()}{stat.suffix || ''}
      </h5>
      <p className="text-lg font-medium text-gray-800 mb-2">{stat.label}</p>
      <p className="text-sm text-gray-600">{stat.description}</p>
    </div>
  );
}