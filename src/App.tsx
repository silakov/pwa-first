import React, { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SpeechToTextButton from "./SpeechToText";
const About = lazy(() => delayForDemo(import('./About')));
const Home = lazy(() => import('./Home'));

const App: React.FC = () => (
  <div style={{width: '200px', margin: '100px auto', textAlign: 'center'}}>
    {/* <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
    <p>serviceWorkerRegistration.register</p>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
      </Routes>
    </Suspense> */}
    <SpeechToTextButton />
  </div>
);

function delayForDemo(promise: Promise<typeof import("./About")>) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

export default App;
