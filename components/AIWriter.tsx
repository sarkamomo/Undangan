import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { generateInvitationMessage } from '../services/gemini';

interface AIWriterProps {
  groomName: string;
  brideName: string;
  onSelect: (text: string) => void;
}

const AIWriter: React.FC<AIWriterProps> = ({ groomName, brideName, onSelect }) => {
  const [tone, setTone] = useState<'formal' | 'casual' | 'islamic' | 'poetic'>('formal');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerate = async () => {
    if (!groomName || !brideName) {
      alert("Mohon isi nama mempelai pria dan wanita terlebih dahulu.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await generateInvitationMessage(groomName, brideName, tone);
      setGeneratedText(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 mb-4">
      <div className="flex items-center gap-2 mb-3 text-indigo-700 font-semibold">
        <Sparkles size={18} />
        <span>AI Assistant Penulis</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        Bingung merangkai kata? Biarkan AI membantu membuatkan pesan undangan yang indah.
      </p>

      <div className="flex gap-2 mb-3 overflow-x-auto pb-2 no-scrollbar">
        {(['formal', 'casual', 'islamic', 'poetic'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTone(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-colors ${
              tone === t 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sedang Berpikir...
          </>
        ) : (
          <>
            <RefreshCw size={16} />
            Buat Kata-Kata
          </>
        )}
      </button>

      {generatedText && (
        <div className="mt-4 bg-white p-3 rounded-lg border border-indigo-100 shadow-sm animate-fade-in">
          <p className="text-gray-700 text-sm italic mb-2">"{generatedText}"</p>
          <button
            onClick={() => onSelect(generatedText)}
            className="text-xs text-indigo-600 font-bold hover:underline"
          >
            Gunakan Teks Ini
          </button>
        </div>
      )}
    </div>
  );
};

export default AIWriter;