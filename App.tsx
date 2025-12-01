import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Create from './pages/Create';
import BottomNav from './components/BottomNav';

// Layout component to conditionally render BottomNav
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // Don't show bottom nav on Create page to give more screen real estate
  const showBottomNav = location.pathname !== '/create';

  return (
    <>
       {/* Desktop Header */}
       <header className="hidden md:flex fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 h-16 items-center px-8 justify-between">
         <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-serif font-bold italic">
             U
           </div>
           <span className="font-serif font-bold text-xl tracking-tight">UndanganKita</span>
         </div>
         
         <nav className="flex items-center gap-8 text-sm font-medium text-gray-600">
           <a href="#/" className="hover:text-primary transition-colors">Beranda</a>
           <a href="#/templates" className="hover:text-primary transition-colors">Katalog</a>
           <a href="#/features" className="hover:text-primary transition-colors">Fitur</a>
         </nav>

         <div className="flex items-center gap-4">
            <a href="#/templates" className="text-sm font-bold text-dark hover:underline">Masuk</a>
            <a href="#/create" className="bg-dark text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-all">Buat Undangan</a>
         </div>
       </header>

       <main className="md:pt-16 min-h-screen">
         {children}
       </main>

       {showBottomNav && <BottomNav />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/create" element={<Create />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;