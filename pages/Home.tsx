import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Zap, ChevronRight } from 'lucide-react';
import TemplateCard from '../components/TemplateCard';
import { TEMPLATES } from '../types';

const Home = () => {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-end md:items-center">
        <img 
          src="https://picsum.photos/seed/wedding_hero/800/1200" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Wedding Header"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        
        <div className="relative z-10 p-6 md:p-12 w-full max-w-2xl mx-auto text-center md:text-left text-white">
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider mb-4 border border-white/30">
            PLATFORM UNDANGAN NO. #1
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
            Bagikan Kebahagiaan <br />
            <span className="text-secondary italic">Tanpa Batas</span>
          </h1>
          <p className="text-gray-200 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
            Buat undangan pernikahan digital yang elegan dalam hitungan menit. Dilengkapi fitur AI untuk merangkai kata-kata indah.
          </p>
          <div className="flex flex-col gap-3">
            <Link 
              to="/create" 
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-primary/30 transition-all active:scale-95 text-center flex items-center justify-center gap-2"
            >
              <Zap size={18} />
              Buat Undangan Sekarang
            </Link>
            <Link 
              to="/templates"
              className="w-full md:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-3.5 px-8 rounded-full transition-all text-center"
            >
              Lihat Katalog Desain
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6">
        <h2 className="text-center text-2xl font-serif font-bold mb-8 text-dark">Mengapa UndanganKita?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="bg-rose-50 p-3 rounded-lg text-rose-500">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Cepat & Mudah</h3>
              <p className="text-gray-500 text-sm">Proses pembuatan kurang dari 5 menit dengan editor intuitif.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="bg-indigo-50 p-3 rounded-lg text-indigo-500">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Bantuan AI</h3>
              <p className="text-gray-500 text-sm">Gunakan kecerdasan buatan untuk membuat kata-kata yang menyentuh.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="bg-emerald-50 p-3 rounded-lg text-emerald-500">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Harga Terjangkau</h3>
              <p className="text-gray-500 text-sm">Mulai dari Rp 75rb untuk masa aktif selamanya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Templates */}
      <section className="py-8 px-6 bg-gray-100">
        <div className="flex justify-between items-end mb-6 max-w-5xl mx-auto">
          <div>
            <span className="text-primary font-bold tracking-wider text-xs uppercase">Pilihan Editor</span>
            <h2 className="text-2xl font-serif font-bold text-dark mt-1">Desain Terpopuler</h2>
          </div>
          <Link to="/templates" className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
            Lihat Semua <ChevronRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {TEMPLATES.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;