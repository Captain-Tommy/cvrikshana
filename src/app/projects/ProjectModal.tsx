'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';

interface Project {
  image: string;
  title: string;
  description: string;
  impact: string;
  status: string;
  gallery?: string;
}

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all mx-2 sm:mx-0">
                <div className="relative h-64 sm:h-80 md:h-96 w-full mb-4 sm:mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-xl sm:text-2xl font-bold leading-6 text-gray-900 mb-3 sm:mb-4"
                >
                  {project.title}
                </Dialog.Title>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                    Impact: {project.impact}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full w-fit">
                    {project.status}
                  </span>
                </div>

                <div className="mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg leading-relaxed text-gray-600">
                    {project.description}
                  </p>
                </div>

                {project.gallery && (
                  <div className="mt-4 sm:mt-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Gallery</h4>
                    <div 
                      className="w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg" 
                      dangerouslySetInnerHTML={{ __html: project.gallery }}
                      style={{ 
                        minHeight: '16rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    />
                  </div>
                )}

                <div className="mt-6 sm:mt-8 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}