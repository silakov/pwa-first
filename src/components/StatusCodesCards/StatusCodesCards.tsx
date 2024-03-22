import React, { useCallback, useState } from 'react';
import './index.modules.css'

const objects = [
  { 
    id: 1,
    question: '200 OK',
    answer: 'The request has succeeded. This status is typically returned for successful requests to a resource.',
    translate: 'Запрос успешно выполнен. Этот статус обычно возвращается для успешных запросов к ресурсу.'
  },
  { 
    id: 2,
    question: '404 Not Found',
    answer: 'The requested resource could not be found on the server. This status is used when the server cannot find the requested URL.',
    translate: 'Запрошенный ресурс не найден на сервере. Этот статус используется, когда сервер не может найти запрошенный URL.'
  },
  { 
    id: 3,
    question: '403 Forbidden',
    answer: 'The server understands the request, but refuses to authorize it due to lack of access rights. This status is typically returned when the user does not have access rights to the resource.',
    translate: 'Сервер понимает запрос, но отказывается его обрабатывать из-за отсутствия прав доступа. Этот статус обычно возвращается, когда у пользователя нет прав доступа к ресурсу.'
  },
  { 
    id: 4,
    question: '500 Internal Server Error',
    answer: 'A generic server error. This status is returned when the server encounters an internal error that prevents it from fulfilling the request.',
    translate: 'Общая ошибка сервера. Этот статус возвращается, когда сервер столкнулся с внутренней ошибкой, которая не позволяет ему выполнить запрос.'
  },
  { 
    id: 5,
    question: '401 Unauthorized',
    answer: 'The client is not authenticated and must log in to gain access to the resource. This status is used for protected resources that require authentication.',
    translate: 'Клиент не аутентифицирован и должен войти в систему, чтобы получить доступ к ресурсу. Этот статус используется для защищенных ресурсов, требующих аутентификации.'
  },
  { 
    id: 6,
    question: '302 Found (Moved Temporarily)',
    answer: 'The resource is temporarily located at a different URL. The client should issue a new request to the new URL.',
    translate: 'Ресурс временно перемещен в другое местоположение. Клиент должен выполнить новый запрос по новому URL.'
  },
  { 
    id: 7,
    question: '304 Not Modified',
    answer: 'The resource has not been modified since the last request by the client. This status is used for cached data to save network bandwidth.',
    translate: 'Ресурс не был изменен с момента последнего запроса клиента. Этот статус используется для кэшированных данных и помогает сэкономить пропускную способность сети.'
  },
  { 
    id: 8,
    question: '400 Bad Request',
    answer: 'The request is malformed or contains invalid parameters. The server cannot process the request due to a syntax error, invalid parameters, or incorrect request format.',
    translate: 'Некорректный запрос. Сервер не может обработать запрос из-за синтаксической ошибки, неверных параметров или неправильного формата запроса.'
  },
  { 
    id: 9,
    question: '503 Service Unavailable',
    answer: 'The server is temporarily unavailable due to overload or technical issues. The client should retry the request later.',
    translate: 'Сервер временно недоступен из-за перегрузки или технических проблем. Клиент должен повторить запрос позже.'
  },
  { 
    id: 10,
    question: '201 Created',
    answer: 'The request has successfully created a new resource. This status is typically used after successfully creating an object on the server.',
    translate: 'Запрос успешно создал новый ресурс. Этот статус обычно используется после успешного создания объекта на сервере.'
  },
];

const StatusCodesCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * objects.length));
  const [started, setStart] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('default');

  const next = useCallback(() => {
    setCurrentIndex(Math.floor(Math.random() * objects.length));
    setAnswer('default');
  }, []);

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
    setCurrentIndex(Math.floor(Math.random() * objects.length));
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
    <div className="content light">
      {!started ?
        <button onClick={handleStart}>start status codes</button>
        :
        <div className={setClass()}>
          <div className="card-content">
            <div className="front">
                <button onClick={handleStop}>end</button>
                <p>{objects[currentIndex].question}</p>
                <button onClick={show}>show</button>
            </div>
            <div className="left" style={{ '--bg': 'lightgreen' } as React.CSSProperties}>
                <p>{objects[currentIndex].translate}</p>
                <button onClick={next}>next</button>
            </div>
            <div className="right" style={{ '--bg': 'lightgreen' } as React.CSSProperties}>
                <p>{objects[currentIndex].answer}</p>
                <button onClick={next}>next</button>
                <button onClick={translate}>translate</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default StatusCodesCards;
