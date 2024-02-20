import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToTextButton: React.FC = () => {
  const [result, setResult] = useState<boolean>(false);
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
    if (!listening && transcript.toLowerCase().includes('strawberry')) {
      setResult(true);
      setStart(false);
    } else {
      setResult(false);
    }
  }, [listening, transcript])

  return (
    <div>
      {started ? <button onClick={handleStop}>закончить</button> : <button onClick={handleStart}>начать</button>}
      {started && !listening && <button onClick={handleListen}>продолжить</button>}
      <p>you say: {transcript} и это</p>
      <p>({result ? 'правильный' : 'неправильный'})</p>
      <p>ответ</p>
    </div>
  );
};

export default SpeechToTextButton;
