import React, { useCallback, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './index.modules.css'

const objects = [
  { id: 1, question: 'розовый', answer: 'pink' },
  { id: 2, question: 'зеленый', answer: 'green' },
  { id: 3, question: 'синий', answer: 'blue' },
  { id: 4, question: 'черный', answer: 'black' },
  { id: 5, question: 'белый', answer: 'white' },
  { id: 6, question: 'оранжевый', answer: 'orange' },
  { id: 7, question: 'желтый', answer: 'yellow' },
  { id: 8, question: 'серый', answer: 'gray' },
  { id: 9, question: 'фиолетовый', answer: 'purple' },
  { id: 10, question: 'красный', answer: 'red' },
];

const EnglishCards: React.FC = () => {
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
    if (started && !listening && transcript && transcript.toLowerCase() === objects[currentIndex].answer) {
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
        <button onClick={handleStart}>start english</button>
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

export default EnglishCards;
