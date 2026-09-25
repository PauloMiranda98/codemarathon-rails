import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { SubjectDetail } from './pages/SubjectDetail';
import { UpsolvingCodeforces } from './pages/UpsolvingCodeforces';
import { About } from './pages/About';

export const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conteudos" element={<Categories />} />
            <Route path="/conteudos/:categoryId" element={<Categories />} />
            <Route path="/conteudos/:categoryId/:subjectId" element={<SubjectDetail />} />
            <Route path="/upsolving-codeforces" element={<UpsolvingCodeforces />} />
            <Route path="/sobre" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
