import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { INITIAL_DATA, TEMPLATES, InvitationData } from '../types';
import { ArrowLeft, Eye, Edit3, Smartphone, Calendar, MapPin, Users, Type, CheckCircle, Save } from 'lucide-react';
import AIWriter from '../components/AIWriter';

const Create = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  
  // Data State
  const [formData, setFormData] = useState<InvitationData>(INITIAL_DATA);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(searchParams.get('template') || TEMPLATES[0].id);

  const currentTemplate = TEMPLATES.find(t => t.id === selectedTemplateId) || TEMPLATES[0];

  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam) {
      setSelectedTemplateId(templateParam);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAISelect = (text: string) => {
    setFormData(prev => ({ ...prev, message: text }));
  };

  // Sections for the form
  const FormSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center gap-2 mb-4 text-gray-800 border-b border-gray-100 pb-3">
        <div className="bg-primary/10 p-2 rounded-lg text-primary">
          <Icon size={18} />
        </div>
        <h3 className="font-bold text-lg font-serif">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const InputGroup = ({ label, name, type = "text", placeholder, value, onChange }: any) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white z-40 px-4 flex items-center justify-between border-b shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <span className="font-serif font-bold text-lg">Edit Undangan</span>
        <button 
          onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
          className="text-primary font-medium text-sm flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full"
        >
          {activeTab === 'edit' ? <><Eye size={16}/> Preview</> : <><Edit3 size={16}/> Edit</>}
        </button>
      </div>

      {/* Editor Panel (Left/Main on Mobile) */}
      <div className={`flex-1 pt-20 md:pt-6 pb-24 md:pb-6 px-4 md:px-8 overflow-y-auto h-screen scroll-smooth ${activeTab === 'preview' ? 'hidden md:block' : 'block'}`}>
        
        <div className="max-w-2xl mx-auto">
          {/* Progress / Title Desktop */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold font-serif text-dark">Detail Undangan</h1>
              <p className="text-gray-500 text-sm">Lengkapi data untuk undangan pernikahanmu</p>
            </div>
            <button className="bg-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
              <Save size={18} /> Simpan Draft
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            
            {/* Template Selection Mini */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Tema Dipilih</label>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {TEMPLATES.map(t => (
                  <div 
                    key={t.id}
                    onClick={() => setSelectedTemplateId(t.id)}
                    className={`flex-shrink-0 w-24 cursor-pointer transition-all ${selectedTemplateId === t.id ? 'opacity-100 scale-105' : 'opacity-60 grayscale'}`}
                  >
                    <div className={`aspect-[3/4] rounded-lg overflow-hidden border-2 mb-1 ${selectedTemplateId === t.id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}`}>
                      <img src={t.thumbnailUrl} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] text-center font-bold truncate">{t.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <FormSection title="Mempelai" icon={Users}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <InputGroup label="Nama Panggilan Pria" name="groomName" value={formData.groomName} onChange={handleChange} />
                 <InputGroup label="Nama Panggilan Wanita" name="brideName" value={formData.brideName} onChange={handleChange} />
               </div>
               <InputGroup label="Orang Tua Pria" name="groomParents" value={formData.groomParents} onChange={handleChange} placeholder="Bpk... & Ibu..." />
               <InputGroup label="Orang Tua Wanita" name="brideParents" value={formData.brideParents} onChange={handleChange} placeholder="Bpk... & Ibu..." />
            </FormSection>

            <FormSection title="Waktu & Lokasi" icon={Calendar}>
               <InputGroup label="Tanggal Resepsi" name="date" type="date" value={formData.date} onChange={handleChange} />
               <div className="grid grid-cols-2 gap-4">
                 <InputGroup label="Jam Mulai" name="timeStart" type="time" value={formData.timeStart} onChange={handleChange} />
                 <InputGroup label="Jam Selesai" name="timeEnd" type="time" value={formData.timeEnd} onChange={handleChange} />
               </div>
               <InputGroup label="Nama Gedung / Lokasi" name="venueName" value={formData.venueName} onChange={handleChange} />
               <InputGroup label="Alamat Lengkap" name="venueAddress" value={formData.venueAddress} onChange={handleChange} />
               <InputGroup label="Link Google Maps" name="mapUrl" value={formData.mapUrl} onChange={handleChange} placeholder="https://maps.google.com/..." />
            </FormSection>

            <FormSection title="Pesan & Doa" icon={Type}>
               <AIWriter 
                  groomName={formData.groomName} 
                  brideName={formData.brideName} 
                  onSelect={handleAISelect}
               />
               <div className="relative">
                 <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
                    placeholder="Tulis pesan pembuka..."
                 />
               </div>
            </FormSection>

            <div className="h-20 md:hidden" /> {/* Spacer for mobile bottom nav */}
          </form>
        </div>
      </div>

      {/* Preview Panel (Right on Desktop, Full on Mobile Tab) */}
      <div className={`bg-gray-200 w-full md:w-[450px] lg:w-[500px] flex items-center justify-center relative md:border-l border-gray-300 ${activeTab === 'edit' ? 'hidden md:flex' : 'flex fixed inset-0 z-30 pt-16 md:static md:pt-0'}`}>
        
        {/* Mobile Mockup Device */}
        <div className="relative w-[340px] h-[700px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-gray-800 overflow-hidden md:scale-90 lg:scale-100 transition-transform">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-800 rounded-b-2xl z-20"></div>
           
           {/* Preview Content */}
           <div className={`w-full h-full overflow-y-auto no-scrollbar relative ${currentTemplate.themeColor}`}>
              {/* Cover */}
              <div className="h-full flex flex-col justify-center items-center text-center p-8 relative">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                 <div className="border-2 border-dark/20 p-6 w-full h-full flex flex-col justify-center items-center relative z-10">
                   <p className="tracking-[0.3em] text-xs uppercase mb-4 text-gray-600">The Wedding Of</p>
                   <h1 className="font-serif text-5xl text-primary mb-2 font-bold leading-tight">
                     {formData.groomName || "Groom"} <br /> <span className="text-3xl text-dark/50">&</span> <br /> {formData.brideName || "Bride"}
                   </h1>
                   <div className="h-px w-20 bg-dark/20 my-6"></div>
                   <p className="font-serif italic text-lg text-gray-700">
                     {new Date(formData.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                   </p>
                 </div>
              </div>

              {/* Details */}
              <div className="p-8 bg-white rounded-t-3xl -mt-10 relative z-20 shadow-lg min-h-screen">
                 <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-8"></div>
                 
                 <div className="text-center mb-10">
                   <p className="text-sm text-gray-600 italic leading-relaxed mb-6">"{formData.message}"</p>
                   <div className="flex justify-center gap-2 mb-2">
                      <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center text-primary font-bold font-serif">
                        {formData.groomName.charAt(0)}
                      </div>
                       <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center text-primary font-bold font-serif">
                        {formData.brideName.charAt(0)}
                      </div>
                   </div>
                   <p className="text-xs text-gray-400">Putra-putri dari</p>
                   <p className="text-xs text-gray-500 font-semibold mt-1">{formData.groomParents} <br/> & <br/> {formData.brideParents}</p>
                 </div>

                 <div className="space-y-4 mb-8">
                   <div className="border border-gray-100 p-4 rounded-xl flex items-start gap-4 shadow-sm">
                      <Calendar className="text-primary shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">Resepsi Pernikahan</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {formData.timeStart} - {formData.timeEnd} WIB
                        </p>
                      </div>
                   </div>
                   <div className="border border-gray-100 p-4 rounded-xl flex items-start gap-4 shadow-sm">
                      <MapPin className="text-primary shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">Lokasi</h4>
                        <p className="text-xs text-gray-500 mt-1">{formData.venueName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formData.venueAddress}</p>
                      </div>
                   </div>
                 </div>

                 <button className="w-full bg-primary text-white py-3 rounded-full shadow-lg shadow-primary/30 font-bold text-sm flex items-center justify-center gap-2">
                   <CheckCircle size={16} /> Konfirmasi Kehadiran
                 </button>
              </div>
           </div>
        </div>

        {/* Floating Actions for Preview Mode (Mobile) */}
        {activeTab === 'preview' && (
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden flex gap-4">
             <button className="bg-dark text-white px-6 py-3 rounded-full shadow-xl font-bold text-sm">
               Simpan Desain
             </button>
           </div>
        )}
      </div>

    </div>
  );
};

export default Create;