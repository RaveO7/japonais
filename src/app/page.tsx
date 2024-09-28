'use client'
import { useState } from 'react';

import Romanji from './test';
import Kana from './test2';
import Kanji from './kanji';
import Number from './number';
import Korean from './korean';

import { Home } from 'lucide-react';

export default function App() {
  const [choise, setChoise] = useState(''); // Stocke le caractère kana actuel

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center relative">
      <Home strokeWidth={2} size={34} color='#FFFFFF' onClick={() => setChoise('')} className='absolute top-5 right-10 hover:cursor-pointer hover:size-9' />

      {choise.length !== 0 ?
        (choise === "kanaRomanji" ? <Romanji /> : choise === "kanji" ? <Kanji /> : choise == "number" ? <Number /> : choise == "korean" ? <Korean /> : <Kana />)
        :
        <>
          <div className="w-full text-center pt-8">
            <h1 className="text-4xl text-white">Apprendre les Kana</h1>
          </div>
          <div className="flex flex-grow items-center justify-center w-full">
            <div className="flex space-x-4">
              <button onClick={() => setChoise('kanaRomanji')} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
                Kana -{'>'} Romanji
              </button>
              <button onClick={() => setChoise('romanjiKana')} className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
                Romanji -{'>'} Kana
              </button>
              <button onClick={() => setChoise('kanji')} className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
                Kanji
              </button>
              <button onClick={() => setChoise('number')} className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
                Number
              </button>
              <button onClick={() => setChoise('korean')} className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
                Coréen
              </button>
            </div>
          </div>
        </>
      }
    </div>
  );
}
// https://gist.githubusercontent.com/mdzhang/53b362cadebf2785ca43/raw/98c597f16604b7e53539105e081de31c86a72f2c/katakana.json
// https://gist.github.com/mdzhang/899a427eb3d0181cd762