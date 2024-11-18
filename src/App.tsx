import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSelector } from './components/LanguageSelector';
import { translations, type Language } from './translations';
import { VATCalculator } from './components/VATCalculator';
import { VATResults } from './components/VATResults';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  const [amount, setAmount] = useState<string>('');
  const [vatRate, setVatRate] = useState<number>(15);
  const [calculationType, setCalculationType] = useState<'inclusive' | 'exclusive'>('exclusive');
  const [isDark, setIsDark] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [lang, setLang] = useState<Language>('ar');

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('dark', isDark);
    document.title = `${t.title} - VATCalc Professional`;
  }, [lang, isDark, t.title]);

  const results = VATCalculator.calculate(amount, vatRate, calculationType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 transition-colors flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 transition-colors">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Calculator className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{t.title}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <LanguageSelector currentLang={lang} onLanguageChange={setLang} />
                  <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t.amount}
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        setAmount(value);
                      }
                    }}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-left ltr"
                    placeholder={t.enterAmount}
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t.vatRate}
                  </label>
                  <select
                    value={vatRate}
                    onChange={(e) => setVatRate(Number(e.target.value))}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none text-left ltr"
                    dir="ltr"
                  >
                    <option value={15}>15%</option>
                    <option value={5}>5%</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t.calculationType}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setCalculationType('exclusive')}
                      className={`px-4 py-3 rounded-lg text-center transition-colors ${
                        calculationType === 'exclusive'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {t.exclusive}
                    </button>
                    <button
                      onClick={() => setCalculationType('inclusive')}
                      className={`px-4 py-3 rounded-lg text-center transition-colors ${
                        calculationType === 'inclusive'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {t.inclusive}
                    </button>
                  </div>
                </div>

                <VATResults results={results} vatRate={vatRate} t={t} />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}