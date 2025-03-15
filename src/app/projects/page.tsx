'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import DonateButton from '../components/DonateButton';
import Footer from '../components/Footer';

type Project = {
  image: string;
  title: string;
  description: string;
  impact: string;
  status: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadProjectsContent() {
      try {
        const response = await fetch('/data/projects-content.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n').filter(line => line.trim());
        const rows = lines.slice(1);
        
        const projectData = rows.map(row => {
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
          
          const [image, title, description, impact, status] = fields.map(field =>
            field.startsWith('"') && field.endsWith('"') ? field.slice(1, -1) : field
          );
          
          return { image, title, description, impact, status };
        });

        if (projectData.length > 0) {
          setProjects(projectData);
        }
      } catch (error) {
        console.error('Error loading project content:', error);
      }
    }

    loadProjectsContent();
  }, []);

  return (
    <main className="min-h-screen pt-16 px-4 sm:px-5 bg-gray-50">
      <Header />
      <DonateButton />
      <div className="container mx-auto mt-8 sm:mt-12 md:mt-16">
        <div className="text-center mb-8 sm:mb-12">
          <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">OUR PROJECTS</h4>
          <p className="mt-2 text-gray-600 text-xs sm:text-sm md:text-base">Making a difference through meaningful initiatives</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-0">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="relative h-48 sm:h-56 md:h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h5 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{project.title}</h5>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium text-blue-600">Impact: {project.impact}</span>
                  <span className="text-xs sm:text-sm text-gray-500">{project.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">Want to contribute to our projects?</p>
          <a 
            href="../charity page/index.html" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-200 ease-in-out"
          >
            Donate Now
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}