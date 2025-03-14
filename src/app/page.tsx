'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([
    {
      image: '/images/hero/banner.jpg',
      title: 'Welcome to Ikshana',
      description: 'Join us in making a difference in our community'
    }
  ]);

  useEffect(() => {
    async function loadHeroContent() {
      try {
        const response = await fetch('/data/hero-content.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n').filter(line => line.trim());
        const [headers, ...rows] = lines;
        
        const heroSlides = rows.map(row => {
          let fields = [];
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen pt-16 px-5 bg-gray-50">
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


      <div className="container mx-auto mt-16 relative h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] flex items-center">
        <div className="w-full">
          <div className="text-center mb-12">
            <h4 className="text-2xl md:text-3xl font-bold text-gray-800">OUR IMPACT</h4>
            <p className="mt-2 text-gray-600 text-sm md:text-base">The difference we've made together</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
            {[
              { icon: '/icons/helped.gif', number: 1000, label: 'Lives Impacted', description: 'Through various community initiatives', suffix: '+' },
              { icon: '/icons/fundsr.gif', number: 50000, label: 'Funds Raised', description: 'For community development', suffix: '+' },
              { icon: '/icons/projects.gif', number: 10, label: 'Ongoing Projects', description: 'Active community initiatives', suffix: '+' }
            ].map((stat, index) => {
              const [count, setCount] = useState(0);
              const countRef = useRef(null);
              
              useEffect(() => {
                const observer = new IntersectionObserver(
                  ([entry]) => {
                    if (entry.isIntersecting) {
                      let start = 0;
                      const end = stat.number;
                      const duration = 500;
                      const startTime = performance.now();

                      const animate = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        const currentCount = Math.floor(progress * end);
                        setCount(currentCount);

                        if (progress < 1) {
                          requestAnimationFrame(animate);
                        }
                      };

                      requestAnimationFrame(animate);
                      observer.disconnect();
                    }
                  },
                  { threshold: 0.5 }
                );

                if (countRef.current) {
                  observer.observe(countRef.current);
                }

                return () => observer.disconnect();
              }, [stat.number]);

              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center" ref={countRef}>
                  <div className="flex justify-center mb-4">
                    <Image src={stat.icon} alt={stat.label} width={64} height={64} className="w-16 h-16" unoptimized />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{count}{stat.suffix}</div>
                  <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-16 relative h-[450px] sm:h-[550px] md:h-[650px] lg:h-[750px] flex items-center">
        <div className="w-full">
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
              text: 'Your support is more than a donation it\'s a powerful act of hope. Donate now and create a ripple effect of change',
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
