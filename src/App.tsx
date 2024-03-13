import React, { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import TimesTableCards from "./components/TimesTableCards/TimesTableCards";
import EnglishCards from "./components/EnglishCards/EnglishCards";
import FrontendCards from "./components/FrontendCards/FrontendCards";
import AdSense from 'react-adsense-ad';
import './App.css'

const App: React.FC = () => (
  <div className="wrapper">
    <div className="header">
      <AdSense.Google
        client='ca-pub-1224813934765676'
        slot='1'
        style={{ display: 'block' }}
        format='auto'
        responsive='true'
      />
    </div>
    <main className="main">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="multiplications" element={<TimesTableCards />} />
            <Route path="english" element={<EnglishCards />} />
            <Route path="frontend" element={<FrontendCards />} />
        </Routes>
      </Suspense>
    </main>
    <nav className="nav">
      <ul>
        <li>
          <Link to="/multiplications">times table</Link>
        </li>
        <li>
          <Link to="/english">english</Link>
        </li>
        <li>
          <Link to="/frontend">frontend</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default App;
