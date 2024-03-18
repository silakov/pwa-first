import React, { useCallback, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './index.modules.css'

const objects = [
  { id: 1, question: '2 * 0', answer: 'zero', alt: '0' },
  { id: 2, question: '2 * 1', answer: 'two', alt: '2' },
  { id: 3, question: '2 * 2', answer: 'four', alt: '4' },
  { id: 3, question: '2 * 3', answer: 'six', alt: '6' },
  { id: 3, question: '2 * 4', answer: 'eight', alt: '8' },
  { id: 3, question: '2 * 5', answer: 'ten', alt: '10' },
  { id: 3, question: '2 * 6', answer: 'twelve', alt: '12' },
  { id: 3, question: '2 * 7', answer: 'fourteen', alt: '14' },
  { id: 3, question: '2 * 8', answer: 'sixteen', alt: '16' },
  { id: 3, question: '2 * 9', answer: 'eighteen', alt: '18' },
  { id: 3, question: '2 * 10', answer: 'twenty', alt: '20' },
  { id: 1, question: '3 * 0', answer: 'zero', alt: '0' },
  { id: 2, question: '3 * 1', answer: 'three', alt: '3' },
  { id: 3, question: '3 * 2', answer: 'six', alt: '6' },
  { id: 3, question: '3 * 3', answer: 'nine', alt: '9' },
  { id: 3, question: '3 * 4', answer: 'twelve', alt: '12' },
  { id: 3, question: '3 * 5', answer: 'fithteen', alt: '15' },
  { id: 3, question: '3 * 6', answer: 'eighteen', alt: '18' },
  { id: 3, question: '3 * 7', answer: 'twenty one', alt: '21' },
  { id: 3, question: '3 * 8', answer: 'twenty four', alt: '24' },
  { id: 3, question: '3 * 9', answer: 'twenty seven', alt: '27' },
  { id: 3, question: '3 * 10', answer: 'thirty', alt: '30' },
  { id: 1, question: '4 * 0', answer: 'zero', alt: '0' },
  { id: 2, question: '4 * 1', answer: 'four', alt: '4' },
  { id: 3, question: '4 * 2', answer: 'eight', alt: '8' },
  { id: 3, question: '4 * 3', answer: 'twelve', alt: '12' },
  { id: 3, question: '4 * 4', answer: 'sixteen', alt: '16' },
  { id: 3, question: '4 * 5', answer: 'twenty', alt: '20' },
  { id: 3, question: '4 * 6', answer: 'twenty four', alt: '24' },
  { id: 3, question: '4 * 7', answer: 'twenty eight', alt: '28' },
  { id: 3, question: '4 * 8', answer: 'thirty two', alt: '32' },
  { id: 3, question: '4 * 9', answer: 'thirty six', alt: '36' },
  { id: 3, question: '4 * 10', answer: 'fourty', alt: '40' },
  { id: 1, question: '5 * 0', answer: 'zero', alt: '0' },
  { id: 2, question: '5 * 1', answer: 'five', alt: '5' },
  { id: 3, question: '5 * 2', answer: 'ten', alt: '10' },
  { id: 3, question: '5 * 3', answer: 'fithteen', alt: '15' },
  { id: 3, question: '5 * 4', answer: 'twenty', alt: '20' },
  { id: 3, question: '5 * 5', answer: 'twenty five', alt: '25' },
  { id: 3, question: '5 * 6', answer: 'thirty', alt: '30' },
  { id: 3, question: '5 * 7', answer: 'twenty five', alt: '35' },
  { id: 3, question: '5 * 8', answer: 'fourty', alt: '40' },
  { id: 3, question: '5 * 9', answer: 'fourty five', alt: '45' },
  { id: 3, question: '5 * 10', answer: 'fithty', alt: '50' },
  { id: 1, question: '6 * 0', answer: 'zero', alt: '0' },
  { id: 2, question: '6 * 1', answer: 'six', alt: '6' },
  { id: 3, question: '6 * 2', answer: 'twelve', alt: '12' },
  { id: 3, question: '6 * 3', answer: 'eighteen', alt: '18' },
  { id: 3, question: '6 * 4', answer: 'twenty four', alt: '24' },
  { id: 3, question: '6 * 5', answer: 'thirty', alt: '30' },
  { id: 3, question: '6 * 6', answer: 'thirty six', alt: '36' },
  { id: 3, question: '6 * 7', answer: 'fourty two', alt: '42' },
  { id: 3, question: '6 * 8', answer: 'fourty eight', alt: '48' },
  { id: 3, question: '6 * 9', answer: 'fithty four', alt: '54' },
  { id: 3, question: '6 * 10', answer: 'sixty', alt: '60' },
  { id: 1, question: '7 * 0', answer: 'zero', alt: '0' },
  { id: 2, question: '7 * 1', answer: 'seven', alt: '7' },
  { id: 3, question: '7 * 2', answer: 'fourteen', alt: '14' },
  { id: 3, question: '7 * 3', answer: 'twenty one', alt: '21' },
  { id: 3, question: '7 * 4', answer: 'twenty eight', alt: '28' },
  { id: 3, question: '7 * 5', answer: 'thirty five', alt: '35' },
  { id: 3, question: '7 * 6', answer: 'fourty two', alt: '42' },
  { id: 3, question: '7 * 7', answer: 'fourty nine', alt: '49' },
  { id: 3, question: '7 * 8', answer: 'fithty six', alt: '56' },
  { id: 3, question: '7 * 9', answer: 'sixty three', alt: '63' },
  { id: 3, question: '7 * 10', answer: 'seventy', alt: '70' },
  { id: 1, question: '8 * 0', answer: 'zero', alt: '0' },
  { id: 2, question: '8 * 1', answer: 'eight', alt: '8' },
  { id: 3, question: '8 * 2', answer: 'sixteen', alt: '16' },
  { id: 3, question: '8 * 3', answer: 'twenty four', alt: '24' },
  { id: 3, question: '8 * 4', answer: 'thirty two', alt: '32' },
  { id: 3, question: '8 * 5', answer: 'fourty', alt: '40' },
  { id: 3, question: '8 * 6', answer: 'fourty eight', alt: '48' },
  { id: 3, question: '8 * 7', answer: 'fithty six', alt: '56' },
  { id: 3, question: '8 * 8', answer: 'sixty four', alt: '64' },
  { id: 3, question: '8 * 9', answer: 'seventy two', alt: '72' },
  { id: 3, question: '8 * 10', answer: 'eighty', alt: '80' },
  { id: 1, question: '9 * 0', answer: 'zero', alt: '0' },
  { id: 2, question: '9 * 1', answer: 'nine', alt: '9' },
  { id: 3, question: '9 * 2', answer: 'eighteen', alt: '18' },
  { id: 3, question: '9 * 3', answer: 'twenty seven', alt: '27' },
  { id: 3, question: '9 * 4', answer: 'thirty six', alt: '36' },
  { id: 3, question: '9 * 5', answer: 'fourty five', alt: '45' },
  { id: 3, question: '9 * 6', answer: 'fithty four', alt: '54' },
  { id: 3, question: '9 * 7', answer: 'sixty three', alt: '63' },
  { id: 3, question: '9 * 8', answer: 'seventy two', alt: '72' },
  { id: 3, question: '9 * 9', answer: 'eighty one', alt: '81' },
  { id: 3, question: '9 * 10', answer: 'ninety', alt: '90' },
  { id: 1, question: '10 * 0', answer: 'zero', alt: '0' },
  { id: 2, question: '10 * 1', answer: 'ten', alt: '10' },
  { id: 3, question: '10 * 2', answer: 'twenty', alt: '20' },
  { id: 3, question: '10 * 3', answer: 'thirty', alt: '30' },
  { id: 3, question: '10 * 4', answer: 'fourty', alt: '40' },
  { id: 3, question: '10 * 5', answer: 'fithty', alt: '50' },
  { id: 3, question: '10 * 6', answer: 'sixty', alt: '60' },
  { id: 3, question: '10 * 7', answer: 'seventy', alt: '70' },
  { id: 3, question: '10 * 8', answer: 'eighty', alt: '80' },
  { id: 3, question: '10 * 9', answer: 'ninety', alt: '90' },
  { id: 3, question: '10 * 10', answer: 'one hundred', alt: '100' },
];

const TimesTableCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * objects.length));
  const [started, setStart] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('default');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const next = useCallback(() => {
    setCurrentIndex(Math.floor(Math.random() * objects.length));
    resetTranscript();
    handleListen();
    setAnswer('default');
  }, [resetTranscript])

  const handleListen = () => {
    SpeechRecognition.startListening({ language: 'en-GB'});
  };

  const handleStart = () => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      handleListen();
      setStart(true);
    } else {
      alert('Распознавание речи не поддерживается вашим браузером');
    }
  };

  const handleStop = () => {
    setCurrentIndex(Math.floor(Math.random() * objects.length));
    SpeechRecognition.stopListening();
    setStart(false);
  };

  useEffect(() => {
    console.log(transcript, transcript);
    if (!listening && (transcript.toLowerCase().includes(objects[currentIndex].answer) || transcript.toLowerCase().includes(objects[currentIndex].alt))) {
      setAnswer('good');
      setTimeout(() => {
        next();
      }, 2000);
    } else if (started && !listening && transcript && transcript.toLowerCase() !== objects[currentIndex].answer) {
      setAnswer('bad');
      setTimeout(() => {
        resetTranscript();
        handleListen();
        setAnswer('default');
      }, 2000);
    }
  }, [currentIndex, listening, next, resetTranscript, started, transcript]);

  const setClass = () => {
    switch (answer) {
      case 'default':
        return 'card';
      case 'bad':
        return 'card bad';
      case 'good':
        return 'card good';
      default:
        return 'card'
    }
  }

  return (
    <div className="content light">
      {!started ?
        <button onClick={handleStart}>start multiplications</button>
        :
        <div className={started && !listening ? setClass() : 'card' }>
          <div className="card-content">
            <div className="front">
                {started && !listening && answer === 'default' && <button onClick={handleListen}>repeat</button>}
                {started ? <button onClick={handleStop}>end</button> : <button onClick={handleStart}>start english</button>}
                {started && !listening && answer === 'default' && <button onClick={next}>next</button>}
                <p>{started && objects[currentIndex].question}</p>
            </div>
            <div className="left" style={{ '--bg': 'pink' } as React.CSSProperties}>
                <p>you say:</p>
                <p>{transcript}</p>
                <p>it is incorrect!!!</p>
            </div>
            <div className="right" style={{ '--bg': 'lightgreen' } as React.CSSProperties}>
                <p>you say:</p>
                <p>{transcript}</p>
                <p>it is correct!!!</p>
            </div>
            <div className="back">
            </div>
            <div className="top">
            </div>
            <div className="bottom">
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default TimesTableCards;
