import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Constants (Static Data) ---
const WORD_LIST = [
    {
        word: 'acting',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 22, Chapter 4'
    },
    {
        word: 'aqua',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 2, Chapter 2'
    },
    {
        word: 'asiatic',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 12, Chapter 5'
    },
    {
        word: 'society',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 12, Chapter 5'
    },
    {
        word: 'boot',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 11, Chapter 1'
    },
    {
        word: 'box',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 16, Chapter 3'
    },
    {
        word: 'behead',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 23, Chapter 2'
    },
    {
        word: 'building',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 3, Chapter 2'
    },
    {
        word: 'beautiful',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 12, Chapter 2'
    },
    {
        word: 'bank',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 9, Chapter 2'
    },
    {
        word: 'comforter',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 27, Chapter 1'
    },
    {
        word: 'company',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 2, Chapter 8'
    },
    {
        word: 'cross',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 5, Chapter 2'
    },
    {
        word: 'care',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 7, Chapter 6'
    },
    {
        word: 'college',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 13, Chapter 5'
    },
    {
        word: 'captain',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 13, Chapter 5'
    },
    {
        word: 'cock',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Parishisht, Chapter 2'
    },
    {
        word: 'cheque',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 9, Chapter 2'
    },
    {
        word: 'coach',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 13, Chapter 1'
    },
    {
        word: 'circus',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 2, Chapter 2'
    },
    {
        word: 'deputy',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 18, Chapter 4'
    },
    {
        word: 'dispensary',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 2, Chapter 9'
    },
    {
        word: 'doctor',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 13, Chapter 5'
    },
    {
        word: 'damn',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Parishisht, Chapter 1'
    },
    {
        word: 'dilute',
        reference: 'Sri Ramakrishna Kathamrita, Part 3, Khand 9, Chapter 6'
    },
    {
        word: 'englishman',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 9, Chapter 3'
    },
    {
        word: 'engineer',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 31, Chapter 1'
    },
    {
        word: 'exhibition',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 11, Chapter 1'
    },
    {
        word: 'fever',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 16, Chapter 2'
    },
    {
        word: 'mixture',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 16, Chapter 2'
    },
    {
        word: 'footpath',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 2, Chapter 3'
    },
    {
        word: 'fit',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 12, Chapter 2'
    },
    {
        word: 'babu',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 12, Chapter 2'
    },
    {
        word: 'floor',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 16, Chapter 2'
    },
    {
        word: 'gas',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 3, Chapter 3'
    },
    {
        word: 'god',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 30, Chapter 2'
    },
    {
        word: 'house',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 16, Chapter 3'
    },
    {
        word: 'headmaster',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 10, Chapter 2'
    },
    {
        word: 'hospital',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 14, Chapter 1'
    },
    {
        word: 'honorary',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 22, Chapter 5'
    },
    {
        word: 'jail',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 6, Chapter 3'
    },
    {
        word: 'judge',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 16, Chapter 3'
    },
    {
        word: 'sahib',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 16, Chapter 3'
    },
    {
        word: 'lecture',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 15, Chapter 4'
    },
    {
        word: 'like',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 1, Chapter 1'
    },
    {
        word: 'monument',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 12, Chapter 4'
    },
    {
        word: 'meeting',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 12, Chapter 3'
    },
    {
        word: 'medical',
        reference: 'Sri Ramakrishna Kathamrita, Part 3, Khand 8, Chapter 1'
    },
    {
        word: 'magistrate',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 13, Chapter 5'
    },
    {
        word: 'master',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 10, Chapter 2'
    },
    {
        word: 'museum',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 14, Chapter 1'
    },
    {
        word: 'notice',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 4, Chapter 5'
    },
    {
        word: 'office',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 1, Chapter 2'
    },
    {
        word: 'police',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 4, Chapter 5'
    },
    {
        word: 'plate',
        reference: 'Sri Ramakrishna Kathamrita, Part 3, Khand 20, Chapter 5'
    },
    {
        word: 'philosophy',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 2, Chapter 1'
    },
    {
        word: 'pension',
        reference: 'Sri Ramakrishna Kathamrita, Part 2, Khand 3, Chapter 6'
    },
    {
        word: 'photography',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 4, Chapter 7'
    },
    {
        word: 'quinine',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 16, Chapter 2'
    },
    {
        word: 'queen',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 22, Chapter 4'
    },
    {
        word: 'registry',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 9, Chapter 3'
    },
    {
        word: 'register',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 9, Chapter 3'
    },
    {
        word: 'refine',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 12, Chapter 2'
    },
    {
        word: 'school',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 12, Chapter 3'
    },
    {
        word: 'screw',
        reference: 'Sri Ramakrishna Kathamrita, Part 3, Khand 8, Chapter 1'
    },
    {
        word: 'society',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 27, Chapter 1'
    },
    {
        word: 'signboard',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 31, Chapter 1'
    },
    {
        word: 'sergeant',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 4, Chapter 7'
    },
    {
        word: 'stick',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 12, Chapter 2'
    },
    {
        word: 'steamboat',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 12, Chapter 6'
    },
    {
        word: 'science',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 13, Chapter 3'
    },
    {
        word: 'theatre',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 13, Chapter 4'
    },
    {
        word: 'thank',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 7, Chapter 5'
    },
    {
        word: 'you',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 7, Chapter 5'
    },
    {
        word: 'telegraph',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 19, Chapter 6'
    },
    {
        word: 'train',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 21, Chapter 3'
    },
    {
        word: 'tax',
        reference: 'Sri Ramakrishna Kathamrita, Part 2, Khand 1, Chapter 1'
    },
    {
        word: 'under',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 14, Chapter 1'
    },
    {
        word: 'vakil',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 22, Chapter 5'
    },
    {
        word: 'will',
        reference: 'Sri Ramakrishna Kathamrita, Part 5, Khand 11, Chapter 2'
    },
    {
        word: 'water',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 30, Chapter 2'
    },
    {
        word: 'yea',
        reference: 'Sri Ramakrishna Kathamrita, Part 4, Khand 7, Chapter 4'
    },
    {
        word: 'zoo',
        reference: 'Sri Ramakrishna Kathamrita, Part 1, Khand 1, Chapter 1'
    }
    // More words with references can be added here
];
const MAX_ATTEMPTS = 6;

// --- Helper Function for Styling ---
// Moved outside component as it doesn't rely on component state directly,
// but receives necessary data as arguments.
const getLetterStyle = (guess: string, targetWord: string, attemptMade: boolean) => {
    if (!attemptMade || !guess) {
        return 'bg-white border-gray-300'; // Default empty/future guess
    }

    const letterStyles = Array(targetWord.length).fill('bg-gray-300 text-gray-800 border-gray-400'); // Default: Not in word
    const targetArray = targetWord.split('');
    const guessArray = guess.toLowerCase().split('');
    const targetLetterCounts = {};

    // Count letters in target word for accurate yellow checking
    targetArray.forEach((letter: string) => {
        targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1;
    });

    // First pass: Check for correct letters in the correct position (Green)
    guessArray.forEach((letter: string, index: number) => {
        if (letter === targetArray[index]) {
            letterStyles[index] = 'bg-green-500 text-white border-green-600';
            targetLetterCounts[letter]--; // Decrement count for used green letters
        }
    });

    // Second pass: Check for correct letters in the wrong position (Yellow)
    guessArray.forEach((letter: string, index: number) => {
        // Only check if not already green and the letter exists in the target word with remaining count
        if (letterStyles[index] !== 'bg-green-500 text-white border-green-600' && targetLetterCounts[letter] > 0) {
            letterStyles[index] = 'bg-yellow-500 text-white border-yellow-600';
            targetLetterCounts[letter]--; // Decrement count for used yellow letters
        }
    });

    return letterStyles; // Return array of styles for the row
};


// --- React Component ---
function MastersWordsGame() {
    // --- State ---
    const [targetWord, setTargetWord] = useState('');
    const [currentReference, setCurrentReference] = useState('');
    const [wordLength, setWordLength] = useState(0); // Store length explicitly
    const [guesses, setGuesses] = useState(() => Array(MAX_ATTEMPTS).fill(''));
    const [currentGuess, setCurrentGuess] = useState('');
    const [attempt, setAttempt] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');
    const [showReference, setShowReference] = useState(false);
    // Pre-calculate styles for performance? Memoize if grid rendering becomes slow.
    // const [letterStylesGrid, setLetterStylesGrid] = useState(() => Array(MAX_ATTEMPTS).fill([]));

    // --- Initialize Game ---
    const initializeGame = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
        const selectedWordObj = WORD_LIST[randomIndex];
        const newWord = selectedWordObj.word.toLowerCase();
        setTargetWord(newWord);
        setCurrentReference(selectedWordObj.reference);
        setWordLength(newWord.length); // Set word length based on the chosen word
        setGuesses(Array(MAX_ATTEMPTS).fill(''));
        setCurrentGuess('');
        setAttempt(0);
        setGameOver(false);
        setMessage('');
        setShowReference(false);
        // setLetterStylesGrid(Array(MAX_ATTEMPTS).fill([])); // Reset styles
        console.log('Game initialized/reset - New Target Word:', newWord);
    }, []); // Empty dependency array means this function itself doesn't change

    // Run initializeGame once on component mount
    useEffect(() => {
        initializeGame();
    }, [initializeGame]); // Depend on initializeGame


    // --- Computed Styles (Memoized) ---
    // Calculate styles for the entire grid, only recalculating when guesses or attempt changes.
    const letterStylesGrid = useMemo(() => {
        return guesses.map((guess, rowIndex) => {
            const attemptMade = rowIndex < attempt;
            return getLetterStyle(guess, targetWord, attemptMade);
        });
    }, [guesses, targetWord, attempt]);


    // --- Event Handlers ---
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Allow only letters and limit length
        const value = event.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
        if (value.length <= wordLength) {
            setCurrentGuess(value);
        }
    };

    const submitGuess = useCallback(() => {
        if (gameOver || attempt >= MAX_ATTEMPTS) return;

        const guess = currentGuess.trim().toLowerCase();

        if (guess.length !== wordLength) {
            setMessage(`Please enter a ${wordLength}-letter word!`);
            return;
        }

        // Optional: Check if the word is in a valid dictionary if you have one
        // if (!VALID_WORDS.includes(guess)) {
        //     setMessage("Not a valid word!");
        //     return;
        // }

        // Update guesses immutably
        const newGuesses = [...guesses];
        newGuesses[attempt] = guess;
        setGuesses(newGuesses);

        const newAttempt = attempt + 1;
        setAttempt(newAttempt);

        // Check for win/loss
        if (guess === targetWord) {
            setGameOver(true);
            setMessage("Congratulations! You've found the Master's word!");
            setShowReference(true); // Show reference on win
        } else if (newAttempt === MAX_ATTEMPTS) {
            setGameOver(true);
            setMessage(`Game Over! The word was "${targetWord.toUpperCase()}".`);
            setShowReference(true); // Show reference on loss
        } else {
            setMessage(''); // Clear previous messages
        }

        setCurrentGuess(''); // Clear input field

    }, [currentGuess, wordLength, gameOver, attempt, guesses, targetWord, currentReference]); // Dependencies for useCallback

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            submitGuess();
        }
    };

    // --- Render ---
    return (
        <div className="min-h-screen bg-gradient-to-r from-indian-cream to-white flex flex-col items-center p-4 sm:p-8 pt-6 sm:pt-8 text-center relative z-10">
            <div className="text-center mb-2">
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-spiritual-600 mb-1">Word Master</h1>
                {wordLength > 0 && <p className="text-sm text-gray-600 mb-2">Guess the {wordLength}-letter English word that Sri Ramakrishna used</p>}

                {wordLength > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs text-gray-600 bg-gradient-to-r from-spiritual-50/30 to-white p-1.5 rounded-md shadow-sm max-w-md mx-auto">
                        <span className="inline-flex items-center"><span className="inline-block w-3 h-3 bg-green-500 mr-1 border border-green-600 rounded"></span> = Right spot</span>
                        <span className="inline-flex items-center"><span className="inline-block w-3 h-3 bg-yellow-500 mr-1 border border-yellow-600 rounded"></span> = Wrong spot</span>
                        <span className="inline-flex items-center"><span className="inline-block w-3 h-3 bg-gray-300 mr-1 border border-gray-400 rounded"></span> = Not in word</span>
                    </div>
                )}
            </div>

            {wordLength > 0 && ( // Only render instructions etc. once word is loaded
                <>

                    {/* Guess Grid */}
                    <div className="mb-4 sm:mb-6">
                        {guesses.map((_, row) => (
                            <div key={`row-${row}`} className="flex justify-center gap-1 mb-1">
                                {[...Array(wordLength)].map((_, col) => {
                                     const style = letterStylesGrid[row]?.[col] ?? 'bg-white border-gray-300'; // Fallback style
                                     const letter = guesses[row]?.[col] ?? '';
                                     return (
                                        <div
                                            key={`col-${row}-${col}`}
                                            className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl font-bold uppercase border-2 rounded transition-colors duration-300 ${style}`}
                                        >
                                            {letter}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    {!gameOver && (
                        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                            <input
                                type="text"
                                value={currentGuess}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                maxLength={wordLength}
                                placeholder="Enter guess"
                                className="w-56 sm:w-64 p-2 border-2 border-spiritual-600 rounded text-center text-xl uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-spiritual-500 bg-gradient-to-r from-spiritual-50/50 to-white"
                                disabled={gameOver || attempt >= MAX_ATTEMPTS}
                                autoFocus // Focus input on load/reset
                            />
                            <button
                                onClick={submitGuess}
                                disabled={gameOver || attempt >= MAX_ATTEMPTS || currentGuess.length !== wordLength}
                                className="bg-indian-saffron text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-indian-saffron/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                                Enter Guess
                            </button>
                        </div>
                    )}

                    {/* Message Area */}
                    {message && (
                        <div className="text-lg sm:text-xl text-spiritual-600 font-semibold mb-4 px-3 min-h-[2.5rem] flex items-center justify-center bg-gradient-to-r from-spiritual-50/50 to-white rounded-lg shadow-sm py-1">
                           <p>{message}</p>
                        </div>
                    )}

                    {/* Reference Area */}
                    {showReference && currentReference && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-spiritual-50 to-white rounded-lg border border-spiritual-300 shadow-md">
                            <h3 className="text-lg font-semibold mb-2 text-spiritual-700">Reference:</h3>
                            <p className="text-gray-700 italic">{currentReference}</p>
                        </div>
                    )}

                    {/* Control Buttons */}
                    <div className="space-x-3 mt-2">
                        {gameOver && !showReference && (
                            <button
                                onClick={() => setShowReference(true)}
                                className="bg-spiritual-500 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-spiritual-600 transition-colors duration-300 shadow-md"
                            >
                                Show Reference
                            </button>
                        )}
                         {gameOver && (
                            <button
                                onClick={initializeGame} // Use initializeGame for reset
                                className="bg-indian-saffron text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-indian-saffron/80 transition-colors duration-300 shadow-md"
                            >
                                Play Again
                            </button>
                         )}
                        {/* Replace NuxtLink with a standard anchor or React Router Link if applicable */}
                        <a
                            href="/learn/games" // Correct path to games page
                            className="bg-gray-600 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-300 shadow-md"
                        >
                            Back to Games
                        </a>
                    </div>
                </>
            )}
            {wordLength === 0 && (
                <p className="text-lg text-gray-600">Loading game...</p> // Loading indicator
            )}
        </div>
    );
}

export default MastersWordsGame;
