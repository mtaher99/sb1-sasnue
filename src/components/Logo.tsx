import React from 'react';
import { Calculator } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary-600 dark:bg-primary-500 p-2 rounded-lg">
        <Calculator className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-tight text-gray-900 dark:text-white">
          VATCalc
        </span>
        <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
          Professional
        </span>
      </div>
    </div>
  );
}