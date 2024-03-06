import React, { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import TimesTableCards from "./components/TimesTableCards/TimesTableCards";
import EnglishCards from "./components/EnglishCards/EnglishCards";
import FrontendCards from "./components/FrontendCards/FrontendCards";
import './App.css'

const App: React.FC = () => (
  <div>
    <nav className="header">
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
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          <Route path="multiplications" element={<TimesTableCards />} />
          <Route path="english" element={<EnglishCards />} />
          <Route path="frontend" element={<FrontendCards />} />
      </Routes>
    </Suspense>
  </div>
);

export default App;
