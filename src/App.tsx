import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Card from './components/Card';
import { shuffleArray } from './utils/shuffle';

const CARD_PAIRS = ['🍜', '🍱', '🍣', '🍙', '🍡', '🎎', '🗼', '🎌'];
const INITIAL_CARDS = [...CARD_PAIRS, ...CARD_PAIRS];

function App() {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setCards(shuffleArray(INITIAL_CARDS));
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedPairs.includes(index)) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(m => m + 1);
      
      if (cards[newFlippedIndices[0]] === cards[newFlippedIndices[1]]) {
        setMatchedPairs([...matchedPairs, ...newFlippedIndices]);
        setFlippedIndices([]);
        
        if (matchedPairs.length + 2 === cards.length) {
          setGameComplete(true);
        }
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8" />
            神経衰弱
            <Sparkles className="w-8 h-8" />
          </h1>
          <div className="flex justify-center gap-8 text-white mb-4">
            <p className="text-xl">手数: {moves}</p>
            <button
              onClick={startNewGame}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              新しいゲーム
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 md:grid-cols-4 max-w-2xl mx-auto">
          {cards.map((card, index) => (
            <Card
              key={index}
              content={card}
              isFlipped={flippedIndices.includes(index) || matchedPairs.includes(index)}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        {gameComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">おめでとうございます！</h2>
              <p className="mb-4">手数: {moves}回でクリアしました！</p>
              <button
                onClick={startNewGame}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                もう一度プレイ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;