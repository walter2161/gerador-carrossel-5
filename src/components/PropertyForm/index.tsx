import { useState } from 'react';
import { Property } from '../../types/property';
import { PropertyFormFields } from './PropertyFormFields';
import { PropertyFormImages } from './PropertyFormImages';
import { PropertyFormHeader } from './PropertyFormHeader';
import { usePropertyForm } from './usePropertyForm';

interface PropertyFormProps {
  onSubmit: (property: Property) => void;
}

export function PropertyForm({ onSubmit }: PropertyFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [imageInputType, setImageInputType] = useState<'file' | 'url'>('file');
  const {
    loading,
    error,
    handleParseText,
    handleSubmit,
    formRef,
  } = usePropertyForm({
    onSubmit,
    setImages,
    setImageInputType,
    images,
  });

  return (
    <div className="space-y-6">
      <PropertyFormHeader 
        loading={loading}
        error={error}
        onParse={handleParseText}
      />
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <PropertyFormFields />
        
        <PropertyFormImages
          images={images}
          imageInputType={imageInputType}
          setImageInputType={setImageInputType}
          setImages={setImages}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Gerar Carrossel
        </button>
      </form>
    </div>
  );
}