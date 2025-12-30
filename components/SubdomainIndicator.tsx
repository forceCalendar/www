"use client";

import { useEffect, useState } from "react";
import { detectSection, Section, URLS } from "@/lib/utils/navigation";
import { usePathname } from "next/navigation";

export default function SubdomainIndicator() {
  const pathname = usePathname();
  const [currentSection, setCurrentSection] = useState<Section>('main');
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    const host = window.location.hostname;
    const section = detectSection(host, pathname);
    setCurrentSection(section);

    // Set the display URL based on section
    if (host === 'localhost') {
      setCurrentUrl('localhost:3000' + (section !== 'main' ? `/${section}` : ''));
    } else {
      const urls = {
        main: 'www.forcecalendar.org',
        core: 'core.forcecalendar.org',
        interface: 'interface.forcecalendar.org'
      };
      setCurrentUrl(urls[section]);
    }
  }, [pathname]);

  const sectionInfo = {
    main: {
      label: 'Main Site',
      description: 'Marketing & Documentation Hub',
      color: 'text-gray-400'
    },
    core: {
      label: 'Core Engine',
      description: 'JavaScript Calendar Engine',
      color: 'text-blue-400'
    },
    interface: {
      label: 'Interface',
      description: 'Web Components Library',
      color: 'text-green-400'
    }
  };

  const info = sectionInfo[currentSection];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="glass px-4 py-3 rounded-lg shadow-xl max-w-xs">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className={`w-2 h-2 rounded-full ${info.color} mt-1 animate-pulse`} />
          </div>
          <div className="flex-grow">
            <div className="text-xs font-mono text-gray-500 mb-1">{currentUrl}</div>
            <div className={`font-semibold ${info.color} mb-1`}>{info.label}</div>
            <div className="text-xs text-gray-400">{info.description}</div>
          </div>
        </div>

        {/* Quick Switch Links */}
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="text-xs text-gray-500 mb-2">Quick Switch:</div>
          <div className="flex space-x-2">
            {Object.entries(sectionInfo).map(([key, value]) => {
              const sectionKey = key as Section;
              const isActive = currentSection === sectionKey;

              return (
                <a
                  key={key}
                  href={URLS[sectionKey]}
                  className={`text-xs px-2 py-1 rounded ${
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  } transition-colors`}
                >
                  {key === 'main' ? 'Main' : key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}