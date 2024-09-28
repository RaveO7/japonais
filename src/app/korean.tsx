'use client'
import { useState, useEffect } from 'react';

// Importez les fichiers JSON pour Hiragana et Katakana
import korean from './korean.json';

export default function Romanji() {
    const [kana, setKana] = useState({ letter: '', pronunciation: '' }); // Stocke le caractère kana actuel
    const [clicked, setClicked] = useState<any>(null); // Stocke l'état du clic (pour vérifier ou passer au suivant)

    // Lance start à la création de la page
    useEffect(() => { start(); }, []);

    // Fonction pour démarrer le quiz avec un caractère aléatoire
    const start = () => {
        // Sélectionner un caractère aléatoire
        const randomIndex = Math.floor(Math.random() * korean.length);
        setKana(korean[randomIndex]);
    };

    // Vérifie la réponse de l'utilisateur
    const checkAnswer = (event: any) => {
        event.preventDefault();
        if (clicked !== 0) { start(); }
    };


    return (
        <div className="p-10 bg-gray-900 min-h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-9xl mb-4 text-white">{clicked == 0 ?
                    <div className='text-center'>
                        {kana.pronunciation}
                    </div>
                    :
                    kana.letter
                }</h1>
                <form onSubmit={checkAnswer} className="flex flex-col items-center">
                    {clicked == 0 ? (
                        <button
                            type="submit"
                            onClick={() => setClicked(1)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Suivant
                        </button>
                    ) : (
                        <button
                            type="submit"
                            onClick={() => setClicked(0)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            Vérifier
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
