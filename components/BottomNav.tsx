import React from 'react';
import { Home, Grid, PlusCircle, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 h-16 z-50 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
      <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary' : 'text-gray-400'}`}>
        <Home size={20} />
        <span className="text-[10px] font-medium">Beranda</span>
      </Link>
      
      <Link to="/templates" className={`flex flex-col items-center gap-1 ${isActive('/templates') ? 'text-primary' : 'text-gray-400'}`}>
        <Grid size={20} />
        <span className="text-[10px] font-medium">Katalog</span>
      </Link>
      
      <Link to="/create" className="flex flex-col items-center -mt-6">
        <div className="bg-primary text-white p-3 rounded-full shadow-lg shadow-primary/40 transform transition-transform hover:scale-105 active:scale-95">
           <PlusCircle size={28} />
        </div>
        <span className="text-[10px] font-medium mt-1 text-primary">Buat</span>
      </Link>

      <Link to="/account" className={`flex flex-col items-center gap-1 ${isActive('/account') ? 'text-primary' : 'text-gray-400'}`}>
        <User size={20} />
        <span className="text-[10px] font-medium">Akun</span>
      </Link>
    </div>
  );
};

export default BottomNav;