import React from 'react';
import TemplateCard from '../components/TemplateCard';
import { TEMPLATES } from '../types';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    navigate(`/create?template=${id}`);
  };

  return (
    <div className="pt-20 pb-24 px-6 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-2">Katalog Undangan</h1>
        <p className="text-gray-500 mb-8">Pilih desain yang paling menggambarkan cerita cintamu.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {TEMPLATES.map(template => (
            <div key={template.id} onClick={() => handleSelect(template.id)}>
              <TemplateCard template={template} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;