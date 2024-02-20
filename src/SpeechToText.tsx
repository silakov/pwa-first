import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToTextButton: React.FC = () => {
  const [objects] = useState([
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
    { id: 3, question: '4 * 10', answer: 'fourty', alt: '40' }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStart] = useState<boolean>(false);
  const { transcript, listening } = useSpeechRecognition();

  const handleStart = () => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.startListening({ language: 'en-GB'});
      setStart(true);
    } else {
      alert('Распознавание речи не поддерживается вашим браузером');
    }
  };

  const handleListen = () => {
    SpeechRecognition.startListening();
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    setStart(false);
  };

  useEffect(() => {
    console.log(transcript);
    if (!listening && (transcript.toLowerCase().includes(objects[currentIndex].answer) || transcript.toLowerCase().includes(objects[currentIndex].alt))) {
      setTimeout(() => setCurrentIndex(prevIndex => (prevIndex + 1) % objects.length), 10000)
    }
  }, [currentIndex, listening, objects, transcript])

  return (
    <div>
      {started ? <button onClick={handleStop}>end</button> : <button onClick={handleStart}>start</button>}
      {started && !listening && <button onClick={handleListen}>repeat</button>}
      {started && objects[currentIndex].question}
      <p>you say: {transcript}</p>
      {/* <p>({result ? 'правильный' : 'неправильный'})</p>
      <p>ответ</p> */}
    </div>
  );
};

export default SpeechToTextButton;
