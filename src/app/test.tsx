'use client'
import { useState, useEffect } from 'react';

// Importez les fichiers JSON pour Hiragana et Katakana
import hiraganaData from './hiragana.json';
import katakanaData from './katakana.json';

export default function Romanji() {
    const [kana, setKana] = useState<any>(); // Stocke le caractère kana actuel
    const [input, setInput] = useState(''); // Stocke la saisie de l'utilisateur
    const [correct, setCorrect] = useState<any>(null); // Indique si la réponse est correcte
    const [kanaTypes, setKanaTypes] = useState<string[]>([]); // Stocke les types de kana sélectionnés
    const [clicked, setClicked] = useState<any>(null); // Stocke l'état du clic (pour vérifier ou passer au suivant)
    const [selectedHiraganaOptions, setSelectedHiraganaOptions] = useState<string[]>([]); // Stocke les options hiragana sélectionnées
    const [selectedKatakanaOptions, setSelectedKatakanaOptions] = useState<string[]>([]); // Stocke les options katakana sélectionnées
    const [points, setPoints] = useState(0); // Stocke les options katakana sélectionnées
    const [nbrQuestion, setNbrQuestions] = useState(-1); // Stocke les options katakana sélectionnées

    // Utilise useEffect pour redémarrer quand correct change
    useEffect(() => {
        if (correct) {
            setPoints(points + 1)
            setCorrect(null);
            start();
        }
    }, [correct]);

    // Gère les changements d'options hiragana
    const handleHiraganaOptionsChange = (event: any) => {
        const { value, checked } = event.target;
        const family = getFamily(value);
        if (checked) {
            setSelectedHiraganaOptions([...selectedHiraganaOptions, ...family]);
        } else {
            setSelectedHiraganaOptions(selectedHiraganaOptions.filter((option) => !family.includes(option)));
        }
    };

    // Gère les changements d'options katakana
    const handleKatakanaOptionsChange = (event: any) => {
        const { value, checked } = event.target;
        const family = getFamily(value);
        if (checked) {
            setSelectedKatakanaOptions([...selectedKatakanaOptions, ...family]);
        } else {
            setSelectedKatakanaOptions(selectedKatakanaOptions.filter((option) => !family.includes(option)));
        }
    };

    // Fonction pour obtenir les kana de la famille sélectionnée
    const getFamily = (family: string) => {
        const families: { [key: string]: string[] } = {
            'a': ['a', 'i', 'u', 'e', 'o'],
            'ka': ['ka', 'ki', 'ku', 'ke', 'ko'],
            'sa': ['sa', 'shi', 'su', 'se', 'so'],
            'ta': ['ta', 'chi', 'tsu', 'te', 'to'],
            'na': ['na', 'ni', 'nu', 'ne', 'no'],
            'ha': ['ha', 'hi', 'fu', 'he', 'ho'],
            'ma': ['ma', 'mi', 'mu', 'me', 'mo'],
            'ya': ['ya', 'yu', 'yo'],
            'ra': ['ra', 'ri', 'ru', 're', 'ro'],
            'wa': ['wa', 'wo'],
            'n': ['n'],
            'ga':['ga', 'gi', 'gu', 'ge', 'go'],
            'za':['za', 'ji', 'zu', 'ze', 'zo'],
            'da':['da', 'ji', 'du', 'de', 'do'],
            'ba':['ba', 'bi', 'bu', 'be', 'bo'],
            'pa':['pa', 'pi', 'pu', 'pe', 'po'],
            'kya':['kya', 'kyu', 'kyo', 'sha', 'shu', 'sho', 'cha', 'chu', 'cho', 'nya', 'nyu', 'nyo', 'hya', 'hyu', 'hyo', 'mya', 'myu', 'myo', 'rya', 'ryu', 'ryo', 'gya', 'gyu', 'gyo', 'ja', 'ju', 'jo', 'bya', 'byu', 'byo', 'pya', 'pyu', 'pyo'],
            'all': ['all'] // this represents selecting all kana
        };
        return families[family] || [];
    };

    // Fonction pour démarrer le quiz avec un caractère aléatoire
    const start = () => {
        let data: any[] = [];
        setNbrQuestions(nbrQuestion + 1)
        // Inclure les hiraganas sélectionnés
        if (kanaTypes.includes('hiragana') || kanaTypes.includes('both') || kanaTypes.length === 0) {
            if (selectedHiraganaOptions.includes('all') || selectedHiraganaOptions.length === 0) {
                data = data.concat(hiraganaData);
            } else {
                data = data.concat(hiraganaData.filter((kana) =>
                    selectedHiraganaOptions.includes(kana.roumaji)
                ));
            }
        }

        // Inclure les katakanas sélectionnés
        if (kanaTypes.includes('katakana') || kanaTypes.includes('both') || kanaTypes.length === 0) {
            if (selectedKatakanaOptions.includes('all') || selectedKatakanaOptions.length === 0) {
                data = data.concat(katakanaData);
            } else {
                data = data.concat(katakanaData.filter((kana) =>
                    selectedKatakanaOptions.includes(kana.roumaji)
                ));
            }
        }

        // Sélectionner un caractère aléatoire
        const randomIndex = Math.floor(Math.random() * data.length);
        setKana(data[randomIndex]);
        setInput('');
    };

    // Gère la sélection des types de kana
    const handleKanaTypeChange = (type: string) => {
        if (type === 'both') {
            if (kanaTypes.includes('both')) {
                setKanaTypes([]);
                setSelectedHiraganaOptions([]);
                setSelectedKatakanaOptions([]);
            } else {
                setKanaTypes(['both']);
                setSelectedHiraganaOptions(['all']);
                setSelectedKatakanaOptions(['all']);
            }
        } else {
            if (kanaTypes.includes(type)) {
                setKanaTypes(kanaTypes.filter((t) => t !== type));
            } else {
                setKanaTypes([...kanaTypes.filter((t) => t !== 'both'), type]);
            }
        }
    };

    // Vérifie la réponse de l'utilisateur
    const checkAnswer = (event: any) => {
        event.preventDefault();
        if (clicked == 0) {
            setCorrect(input === kana.roumaji);
        } else {
            setCorrect(null);
            start();
        }
    };


    return (
        <div className="bg-gray-900 w-full min-h-screen flex justify-center items-center">
            {kana ? (
                <div className="flex flex-col items-center">
                    <h1 className="text-9xl mb-4 text-white">{kana.kana}</h1>
                    <form onSubmit={checkAnswer} className="flex flex-col items-center w-full">
                        <input
                            className="border-2 border-gray-300 p-2 rounded mb-4 w-3/4 max-w-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Entrez la réponse en romanji"
                        />
                        {correct === false ? (
                            <button
                                type="submit"
                                onClick={() => setClicked(1)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-3/4 max-w-md"
                            >
                                Suivant
                            </button>
                        ) : (
                            <button
                                type="submit"
                                onClick={() => setClicked(0)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-3/4 max-w-md"
                            >
                                Vérifier
                            </button>
                        )}
                    </form>
                    {correct === false && (
                        <div className="w-full flex justify-center bg-blue-500">
                            <p className="text-red-500 mt-4 absolute">{`La bonne réponse était ${kana.roumaji}`}</p>
                        </div>
                    )}
                    <div className='absolute text-2xl bottom-10 sm:right-10'>{points}/{nbrQuestion}</div>

                </div>
            ) : (
                <div className="flex flex-col items-center gap-6 w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg min-h-[500px]">
                    <h1 className="text-4xl text-white mb-4 text-center">Sélectionnez le type de Kana</h1>
                    <div className="flex flex-col items-center space-y-6 w-full mb-8">
                        <button
                            onClick={() => handleKanaTypeChange('hiragana')}
                            className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${kanaTypes.includes('hiragana') ? 'bg-green-500' : 'hover:bg-blue-600'} transition`}
                        >
                            Hiragana
                        </button>
                        {kanaTypes.includes('hiragana') && (
                            <div className="flex flex-wrap gap-2 my-4 justify-center w-full transition-all duration-300">
                                {['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'n', 'ga', 'za', 'da', 'ba', 'pa','kya','all'].map(option => (
                                    <label key={option} className="flex items-center space-x-2 text-white">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            onChange={handleHiraganaOptionsChange}
                                            checked={selectedHiraganaOptions.includes(option)}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => handleKanaTypeChange('katakana')}
                            className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${kanaTypes.includes('katakana') ? 'bg-green-500' : 'hover:bg-blue-600'} transition`}
                        >
                            Katakana
                        </button>
                        {kanaTypes.includes('katakana') && (
                            <div className="flex flex-wrap gap-2 my-4 justify-center w-full transition-all duration-300">
                                {['a', 'ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ya', 'ra', 'wa', 'n', 'ga', 'za', 'da', 'ba', 'pa','kya','all'].map(option => (
                                    <label key={option} className="flex items-center space-x-2 text-white">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            onChange={handleKatakanaOptionsChange}
                                            checked={selectedKatakanaOptions.includes(option)}
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => handleKanaTypeChange('both')}
                            className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${kanaTypes.includes('both') ? 'bg-green-500' : 'hover:bg-blue-600'} transition`}
                        >
                            Les deux
                        </button>
                    </div>
                    <button
                        onClick={start}
                        disabled={kanaTypes.length > 0 ? false : true}
                        className={`${kanaTypes.length > 0 ? ' hover:bg-blue-600' : 'opacity-50'} bg-blue-500 text-white text-xl px-4 py-2 rounded w-full  transition`}
                    >
                        Démarrer
                    </button>
                </div>
            )}
        </div>

    );
}