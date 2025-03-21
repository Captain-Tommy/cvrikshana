'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import DonateButton from '../components/DonateButton';
import Footer from '../components/Footer';
import { CoreTeamMember, loadCoreTeamData } from '@/utils/loadCsvData';

type Founder = {
  image: string;
  name: string;
  quote: string;
};

const loadFoundersData = async (): Promise<Founder[]> => {
  const response = await fetch('/data/founders.csv');
  const csvText = await response.text();
  const rows = csvText.split('\n').filter(Boolean);
  return rows.map(row => {
    const matches = row.match(/(?:^|,)("[^"]*"|[^,]*)/g);
    if (!matches) return { image: '', name: '', quote: '' };
    const [image, name, quote] = matches.map(field => 
      field.startsWith(',') ? field.slice(1) : field
    ).map(field =>
      field.startsWith('"') ? field.slice(1, -1) : field
    );
    return { image, name, quote };
  });
};

export default function AboutUs() {
  const [coreTeam, setCoreTeam] = useState<CoreTeamMember[]>([]);
  const [founders, setFounders] = useState<Founder[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    loadCoreTeamData().then(data => setCoreTeam(data));
    loadFoundersData().then(data => setFounders(data));
  }, []);

  return (
    <main className="min-h-screen pt-16 px-4 sm:px-5 bg-gray-50">
      <Header />
      <DonateButton />
      <div className="container mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        <div className="bg-transparent py-8 sm:py-12 md:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">ABOUT US</h4>
            <p className="mt-2 text-gray-600 text-xs sm:text-sm md:text-base">Learn more about our mission and impact</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center px-0">
            <div className="relative h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] w-full">
              <video
                src="/images/tro.mp4"
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className="relative z-10 bg-white/90 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm">
              <p className="text-justify text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed">
                Ikshana Club is dedicated to creating a positive impact through social outreach and community empowerment. We bring together compassionate individuals committed to uplifting lives, whether through educational support, wellness initiatives, or acts of kindness. United by purpose, we believe in the power of small actions to create lasting change and inspire hope in every community we serve.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        <div className="bg-transparent py-24">
          <div className="text-center mb-12">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800">MESSAGE FROM OUR FOUNDERS</h4>
            <p className="mt-2 text-gray-600 text-sm md:text-base">Meet the visionaries who laid our foundation</p>
          </div>
          
          <div className="relative group">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 md:gap-8 px-4 pb-4 scroll-smooth scrollbar-hide"
              style={{
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {founders.map((founder, index) => (
                <div
                  key={index}
                  className="flex-none w-[280px] bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h5 className="font-semibold text-gray-900 mb-3 text-lg">{founder.name}</h5>
                    <p className="text-gray-600 italic">{founder.quote}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-r-lg p-2 cursor-pointer transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus:outline-none disabled:opacity-0"
              style={{ transform: 'translate(0, -50%)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-l-lg p-2 cursor-pointer transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus:outline-none disabled:opacity-0"
              style={{ transform: 'translate(0, -50%)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="text-center mb-12 mt-24">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800">OUR VERTICALS</h4>
            <p className="mt-2 text-gray-600 text-sm md:text-base">Our key focus areas for community development</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-0">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600">
                  <Image
                    src="/icons/si.gif"
                    alt="Social Impact Icon"
                    width={64}
                    height={64}
                  />
                </div>
              </div>
              <h5 className="text-xl font-semibold text-gray-900 mb-3 text-center">Social Impact</h5>
              <p className="text-gray-600 text-center">Empowering grassroots initiatives and fostering local leadership to build resilient communities, while promoting sustainable practices and inclusive growth at every level.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 text-blue-600">
                  <Image
                    src="/icons/fe.gif"
                    alt="Food & Education Icon"
                    width={64}
                    height={64}
                  />
                </div>
              </div>
              <h5 className="text-xl font-semibold text-gray-900 mb-3 text-center">Food & Education</h5>
              <p className="text-gray-600 text-center">Addressing fundamental needs through food security programs while fostering educational initiatives that empower individuals to build better futures.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Sustainable Development Goals</h4>
            <p className="text-gray-600 mb-6">We are committed to the UN&apos;s Sustainable Development Goals</p>
            <div className="flex justify-start sm:justify-between items-center max-w-7xl mx-auto overflow-x-auto py-4 gap-2 sm:gap-4">
              {[1, 2, 3, 4, 5, 10, 13, 15, 17].map((num) => (
                <div key={num} className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 hover:scale-105 transition-transform duration-300 flex-shrink-0 group">
                  <Image
                    src={`/icons/sdg inverted/SDG_Icons_Inverted_Transparent_WEB-${num.toString().padStart(2, '0')}.png`}
                    alt={`SDG ${num}`}
                    fill
                    className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <Image
                    src={`/icons/SDG Icons/E-WEB-Goal-${num.toString().padStart(2, '0')}.png`}
                    alt={`SDG ${num}`}
                    fill
                    className="object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        <div className="bg-transparent py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 md:px-0">
            <div className="text-left">
              <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">OUR PROJECTS</h4>
              <p className="text-gray-600 text-sm md:text-base mb-6">Discover our initiatives and their impact. We&apos;re committed to creating lasting change through various community-focused projects that address education, health, and social development.</p>
              <button className="cta border-none bg-transparent cursor-pointer">
                <a href="/projects" className="no-underline">
                  <span className="hover-underline-animation inline-block pb-7 tracking-[4px] text-sm pr-4 uppercase text-blue-600">
                    View Our Projects
                  </span>
                  <svg
                    className="transform -translate-x-2 transition-all duration-300 ease-in-out inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={10}
                    viewBox="0 0 46 16"
                    style={{ verticalAlign: 'middle' }}
                  >
                    <path
                      fill="currentColor"
                      className="text-blue-600"
                      d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                      transform="translate(30)"
                    />
                  </svg>
                </a>
                <style jsx>{`
                  .cta:hover svg {
                    transform: translateX(0);
                  }
                  .cta:active svg {
                    transform: scale(0.9);
                  }
                  .hover-underline-animation {
                    position: relative;
                  }
                  .hover-underline-animation:after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    transform: scaleX(0);
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: #2563eb;
                    transform-origin: bottom right;
                    transition: transform 0.25s ease-out;
                  }
                  .cta:hover .hover-underline-animation:after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
                  }
                `}</style>
              </button>
            </div>
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src="/images/abtusproj.svg"
                alt="Projects Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>


      </div>

      <div className="container mx-auto min-h-[calc(100vh-4rem)] flex flex-col justify-center mb-16">
        <div className="bg-transparent py-24">
          <div className="text-center mb-12">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800">CORE TEAM</h4>
            <p className="mt-2 text-gray-600 text-sm md:text-base">Meet the dedicated individuals behind our mission</p>
          </div>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-0">
            {coreTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <h5 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{member.name}</h5>
                  <p className="text-xs sm:text-sm text-gray-600">{member.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}