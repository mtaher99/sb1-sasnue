import React from 'react';
import { Receipt } from 'lucide-react';
import { translations } from '../translations';

interface VATResultsProps {
  results: {
    original: number;
    vat: number;
    total: number;
  };
  vatRate: number;
  t: typeof translations.ar | typeof translations.en;
}

function formatNumber(value: number, lang: keyof typeof translations) {
  const formatter = new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 
    lang === 'ur' ? 'ur-PK' : 
    lang === 'hi' ? 'hi-IN' : 
    lang === 'bn' ? 'bn-BD' : 
    lang === 'fil' ? 'fil-PH' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export function VATResults({ results, vatRate, t }: VATResultsProps) {
  const lang = Object.entries(translations).find(([_, value]) => value === t)?.[0] as keyof typeof translations;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mt-8">
      <div className="flex items-center gap-3 mb-4">
        <Receipt className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {t.results}
        </h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300">{t.originalAmount}:</span>
          <span className="font-semibold dark:text-white" dir="ltr">
            {formatNumber(results.original, lang)} {t.currency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300">
            {t.vatAmount} ({vatRate}%):
          </span>
          <span className="font-semibold text-primary-600 dark:text-primary-400" dir="ltr">
            {formatNumber(results.vat, lang)} {t.currency}
          </span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-gray-800 dark:text-white font-medium">
            {t.totalAmount}:
          </span>
          <span className="text-xl font-bold text-primary-800 dark:text-primary-200" dir="ltr">
            {formatNumber(results.total, lang)} {t.currency}
          </span>
        </div>
      </div>
    </div>
  );
}