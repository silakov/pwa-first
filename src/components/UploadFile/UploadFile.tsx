import React, { useCallback, useState } from 'react';
import './index.modules.css'

interface Item {
  id: number;
  question: string;
  answer: string;
  translate: string;
}

const example = `{
  "name": "test",
  "list": [
    { 
      "id": 1,
      "question": "200 OK",
      "answer": "The request has succeeded."
    }
  ]
}`;

const UploadFile: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [jsonData, setJsonData] = useState<Item[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target?.result as string;
      try {
        const parsedData = JSON.parse(fileContent).list as Item[];
        setTitle(JSON.parse(fileContent).name);
        setJsonData(parsedData);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };

    reader.readAsText(file);
  };

  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * jsonData.length));
  const [started, setStart] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('default');

  const next = useCallback(() => {
    const test = Math.floor(Math.random() * jsonData.length);
    console.log(test);
    setCurrentIndex(test);
    setAnswer('default');
  }, [jsonData.length]);

  const show = useCallback(() => {
    setAnswer('answer');
  }, []);

  const translate = useCallback(() => {
    setAnswer('translate');
  }, []);

  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setCurrentIndex(Math.floor(Math.random() * jsonData.length));
    setStart(false);
  };

  const setClass = () => {
    switch (answer) {
      case 'default':
        return 'card';
      case 'answer':
        return 'card answer';
      case 'translate':
        return 'card translate';
      default:
        return 'card'
    }
  }

  return (
    <div className="content">
      {!jsonData.length ? (
        <>
          <div className="example">
            <p>upload json. for now it must be in next format</p>
            <code>
              <pre>
                {example}
              </pre>
            </code>
          </div>
          <input type="file" onChange={handleFileChange} />
          <ul>
            {jsonData.map((item, index) => (
              <li key={index}>
                <p>{item.question}</p>
                <p>{item.answer}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="light">
          {!started ?
            <button onClick={handleStart}>start {title}</button>
            :
            <div className={setClass()}>
              <div className="card-content">
                <div className="front">
                    <button onClick={handleStop}>end</button>
                    <p>{jsonData[currentIndex].question}</p>
                    <button onClick={show}>show</button>
                </div>
                <div className="left" style={{ '--bg': 'lightgreen' } as React.CSSProperties}>
                    <p>{jsonData[currentIndex].translate}</p>
                    <button onClick={next}>next</button>
                </div>
                <div className="right" style={{ '--bg': 'lightgreen' } as React.CSSProperties}>
                    <p>{jsonData[currentIndex].answer}</p>
                    <button onClick={next}>next</button>
                    <button onClick={translate}>translate</button>
                </div>
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default UploadFile;
