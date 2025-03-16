'use client';

import { useState, useEffect } from 'react';
import StatCard from './components/StatCard';
import Image from 'next/image';
import './fonts.css';
import Header from './components/Header';
import DonateButton from './components/DonateButton';
import Footer from './components/Footer';

type Slide = {
  image: string;
  title: string;
  description: string;
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [ctas, setCtas] = useState<{enable: string; content: string; buttontext: string; link: string; imagepath: string; venue: string; date: string; time: string; registration_deadline: string; registration_fee: string; rewards: string}[]>([]);

  const [slides, setSlides] = useState<Slide[]>([
    {
      image: '/images/hero/banner.jpg',
      title: 'Welcome to Ikshana',
      description: 'Join us in making a difference in our community'
    }
  ]);

  useEffect(() => {
    async function loadCtaContent() {
      try {
        const response = await fetch('/data/cta.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n').filter(line => line.trim());
        const rows = lines.slice(1);
        
        const ctaData = rows.map(row => {
          const fields = [];
          let currentField = '';
          let inQuotes = false;
          
          for (let i = 0; i < row.length; i++) {
            const char = row[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              fields.push(currentField.trim());
              currentField = '';
            } else {
              currentField += char;
            }
          }
          fields.push(currentField.trim());
          
          const [enable, content, buttontext, link, imagepath, venue, date, time, registration_deadline, registration_fee, rewards] = fields.map(field =>
            field.startsWith('"') && field.endsWith('"') ? field.slice(1, -1) : field
          );
          
          return { enable, content, buttontext, link, imagepath, venue, date, time, registration_deadline, registration_fee, rewards };
        });

        if (ctaData.length > 0) {
          setCtas(ctaData);
        }
      } catch (error) {
        console.error('Error loading CTA content:', error);
      }
    }

    loadCtaContent();
  }, []);

  useEffect(() => {
    async function loadHeroContent() {
      try {
        const response = await fetch('/data/hero-content.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n').filter(line => line.trim());
        const rows = lines.slice(1);
        
        const heroSlides = rows.map(row => {
          const fields = [];
          let currentField = '';
          let inQuotes = false;
          
          for (let i = 0; i < row.length; i++) {
            const char = row[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              fields.push(currentField.trim());
              currentField = '';
            } else {
              currentField += char;
            }
          }
          fields.push(currentField.trim());
          
          const [image, title, description] = fields.map(field =>
            field.startsWith('"') && field.endsWith('"') ? field.slice(1, -1) : field
          );
          
          return { image, title, description };
        });

        if (heroSlides.length > 0) {
          setSlides(heroSlides);
        }
      } catch (error) {
        console.error('Error loading hero content:', error);
      }
    }

    loadHeroContent();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <main className="min-h-screen pt-16 px-4 sm:px-5 bg-gray-50">
      <Header />
      <DonateButton />

      <div className="relative h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] w-full overflow-hidden rounded-lg mt-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 flex items-end justify-center text-white">
              <div className="w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="container max-w-5xl mx-auto px-6 py-12 text-center">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 graffiti-title drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{slide.title}</h2>
                  <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto hero-description drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

       {ctas.map((cta, index) => cta.enable === 'yes' && (
        <div key={index} className="relative w-full overflow-hidden rounded-lg mt-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
            <div className="w-full lg:w-1/2 lg:pr-8 mb-6 lg:mb-0">
              <div className="inline-block bg-green-100 text-green-800 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Registrations Open</div>
              <div className="block lg:hidden w-full h-[300px] relative mb-4">
                <Image
                  src={cta.imagepath}
                  alt="CTA Image"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-4 sm:mb-6 leading-relaxed">{cta.content}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 text-gray-700 text-sm sm:text-base">
                <div className="flex items-start gap-2">
                  <Image src="/icons/venue.gif" alt="Venue" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
                  <div>
                    <p className="font-semibold">Venue:</p>
                    <p className="text-sm">{cta.venue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Image src="/icons/dt.gif" alt="Date & Time" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
                  <div>
                    <p className="font-semibold">Date & Time:</p>
                    <p className="text-sm">{cta.date} | {cta.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Image src="/icons/fee.gif" alt="Registration Fee" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
                  <div>
                    <p className="font-semibold">Registration Fee:</p>
                    <p className="text-sm">{cta.registration_fee}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Image src="/icons/deadline.gif" alt="Registration Deadline" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
                  <div>
                    <p className="font-semibold">Registration Deadline:</p>
                    <p className="text-sm">{cta.registration_deadline}</p>
                  </div>
                </div>
                <div className="sm:col-span-2 flex items-start gap-2">
                  <Image src="/icons/reward.gif" alt="Rewards" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
                  <div>
                    <p className="font-semibold">Rewards:</p>
                    <p className="text-sm">{cta.rewards}</p>
                  </div>
                </div>
              </div>
              <a
                href={cta.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-black border border-black transition-all duration-200 text-base sm:text-xl font-semibold"
              >
                {cta.buttontext}
              </a>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="hidden lg:block w-full aspect-video relative mb-6">
                <Image
                  src={cta.imagepath}
                  alt="CTA Image"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="w-full mt-16 relative flex items-center">
        <div className="container mx-auto py-16 px-4 md:px-6">
          <div className="text-center mb-12">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800">OUR IMPACT</h4>
            <p className="mt-2 text-gray-600 text-sm md:text-base">The difference we&apos;ve made together</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
            {[
              { icon: '/icons/helped.gif', number: 1000, label: 'Lives Impacted', description: 'Through various community initiatives', suffix: '+' },
              { icon: '/icons/fundsr.gif', number: 50000, label: 'Funds Raised', description: 'For community development', suffix: '+' },
              { icon: '/icons/projects.gif', number: 10, label: 'Ongoing Projects', description: 'Active community initiatives', suffix: '+' }
            ].map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
          <div className="text-2xl text-gray-900 max-w-none mx-auto font-[CinzelDecorative] font-black before:content-['|'] before:mr-4 before:text-blue-600 mt-12">
            We believe in fostering humanity through compassionate actions, social service, and collective empowerment.
          </div>
        </div>
      </div>

      <div className="w-full mt-16 relative flex items-center bg-white rounded-lg shadow-sm min-h-[200px] md:min-h-[250px] lg:min-h-[300px]">
        <div className="container mx-auto py-6 md:py-8 lg:py-12 space-y-6 md:space-y-8 lg:space-y-12 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-start px-4 md:px-0">
            <div className="rounded-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 max-w-2xl">
              <div className="w-16 h-16 md:w-24 md:h-24 relative flex-shrink-0">
                <Image
                  src="/icons/vision.gif"
                  alt="Vision Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Our Vision</h4>
                <p className="text-base md:text-lg text-gray-700">To create a world where compassion drives change, where every individual has the opportunity to thrive, and where community service becomes a way of life.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-end px-4 md:px-0">
            <div className="rounded-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 max-w-2xl">
              <div className="text-center md:text-right order-1 md:order-1">
                <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Our Mission</h4>
                <p className="text-base md:text-lg text-gray-700">To empower communities through sustainable initiatives, foster social responsibility, and create lasting positive impact through collaborative efforts and innovative solutions.</p>
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 relative flex-shrink-0 order-2 md:order-2">
                <Image
                  src="/icons/mission.gif"
                  alt="Mission Icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full mt-16 relative flex items-center bg-white rounded-lg shadow-sm">
        <div className="container mx-auto py-8 md:py-12 lg:py-16 px-4 md:px-6">
          <div className="text-center">
            <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Sustainable Development Goals</h4>
            <p className="text-gray-600 mb-6">Our work naturally aligns with these global objectives for a better world</p>
            <div className="flex justify-between items-center max-w-7xl mx-auto overflow-x-auto py-4">
              {[1, 2, 3, 4, 5, 10, 13, 15, 17].map((num) => (
                <div key={num} className="relative w-20 h-20 md:w-28 md:h-28 hover:scale-105 transition-transform duration-300 flex-shrink-0 mx-2 group">
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


      <div className="w-full mt-16 relative flex items-center">
        <div className="container mx-auto py-16 px-4 md:px-6">
          <div className="text-center mb-12">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800">GET INVOLVED</h4>
            <p className="mt-2 text-gray-600 text-sm md:text-base">Join us in our mission to make a difference in the world.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4 md:px-0">
            {[{
              image: '/images/people.png',
              text: 'Transform compassion into action uplift lives and inspire change with us!',
              button: 'Join Now',
              link: '#con'
            },
            {
              image: '/images/donate.png',
              text: 'Your support is more than a donation it&apos;s a powerful act of hope. Donate now and create a ripple effect of change',
              button: 'Donate Now',
              link: '../charity page/index.html'
            },
            {
              image: '/images/partner.png',
              text: 'Explore the journey of compassion uncover our mission, impact, and stories of lives transformed',
              button: 'Learn more',
              link: '../explore/explore.html'
            }].map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={card.image}
                    alt="Card image"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-6 text-center">
                  <p className="mb-4 text-gray-700">{card.text}</p>
                  <a
                    href={card.link}
                    className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-white hover:text-blue-700 border-2 border-blue-700 transition-colors"
                  >
                    {card.button}
                  </a>
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
