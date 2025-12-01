import React from 'react';
import { Star, Check } from 'lucide-react';
import { Template } from '../types';

interface TemplateCardProps {
  template: Template;
  isSelected?: boolean;
  onSelect?: (template: Template) => void;
  compact?: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect, compact }) => {
  return (
    <div 
      onClick={() => onSelect && onSelect(template)}
      className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border-2 ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}`}
    >
      <div className={`relative overflow-hidden ${compact ? 'aspect-square' : 'aspect-[3/4]'}`}>
        <img 
          src={template.thumbnailUrl} 
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full shadow-lg">
            <Check size={16} />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 className={`font-serif font-bold ${compact ? 'text-sm' : 'text-lg'}`}>{template.name}</h3>
          {!compact && (
             <div className="flex items-center gap-1 text-xs text-secondary mt-1">
               <Star size={12} fill="currentColor" />
               <span>4.9 (120+ Ulasan)</span>
             </div>
          )}
        </div>
      </div>
      
      {!compact && (
        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-primary font-bold">
              Rp {template.price.toLocaleString('id-ID')}
            </p>
            <div className="flex gap-1">
              {template.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCard;