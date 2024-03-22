import React, { useCallback, useState } from 'react';
import data from '../../data/frontend.json';
import './index.modules.css'

const FrontendCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * data.list.length));
  const [started, setStart] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('default');

  const next = useCallback(() => {
    setCurrentIndex(Math.floor(Math.random() * data.list.length));
    setAnswer('default');
  }, []);

  const show = useCallback(() => {
    setAnswer('answer');
  }, []);

  const translate = useCallback(() => {
    setAnswer('translate');
  }, []);

  const links = useCallback(() => {
    setAnswer('links');
  }, []);

  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setCurrentIndex(Math.floor(Math.random() * data.list.length));
    setStart(false);
  };

  const setClass = () => {
    switch (answer) {
      case 'default':
        return 'item';
      case 'answer':
        return 'item answer';
      case 'translate':
        return 'item translate';
      case 'links':
        return 'item links';
      default:
        return 'item'
    }
  }

  return (
    <div className="content">
      {!started ?
        <button onClick={handleStart}>start {data.name}</button>
        :
        <div className={setClass()}>
          <div className="item-content light">
            <div className="item-question">
                <p>{data.list[currentIndex].question}</p>
                <div className="buttons">
                  <button onClick={show}>show</button>
                  <button onClick={handleStop}>end</button>
                </div>
            </div>
            <div className="item-translate">
                <p>{data.list[currentIndex].translate}</p>
                <div className="buttons">
                  <button onClick={next}>next</button>
                </div>
            </div>
            <div className="item-answer">
                <p>{data.list[currentIndex].answer}</p>
                <div className="buttons">
                  <button onClick={next}>next</button>
                  {data.list[currentIndex].additional.length > 0 && <button onClick={links}>show links</button>}
                  {data.list[currentIndex].translate.length > 0 && <button onClick={translate}>translate</button>}
                  <button onClick={handleStop}>end</button>
                </div>
            </div>
            <div className="item-links">
                <ul>{data.list[currentIndex].additional.map(item => <li><a href={item}>{item}</a></li>)}</ul>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default FrontendCards;
