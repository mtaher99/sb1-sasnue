import React from 'react';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: 'ar' | 'en';
  onToggle: () => void;
}

export function LanguageToggle({ currentLang, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5 text-gray-600 dark:text-gray-200" />
      <span className="text-sm font-medium text-gray-600 dark:text-gray-200">
        {currentLang === 'ar' ? 'English' : 'عربي'}
      </span>
    </button>
  );
}