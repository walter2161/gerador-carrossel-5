import { useState, useRef } from 'react';
import { Property } from '../../types/property';
import { formatCurrency } from '../../utils/format';
import { parsePropertyText } from '../../utils/parser';

interface UsePropertyFormProps {
  onSubmit: (property: Property) => void;
  setImages: (images: string[]) => void;
  setImageInputType: (type: 'file' | 'url') => void;
  images: string[];
}

export function usePropertyForm({
  onSubmit,
  setImages,
  setImageInputType,
  images,
}: UsePropertyFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleParseText = async (text: string) => {
    if (!formRef.current) return;
    
    setLoading(true);
    setError(null);

    try {
      const data = parsePropertyText(text);
      
      // Update form fields with parsed data
      const form = formRef.current;
      (form.querySelector('[name="type"]') as HTMLSelectElement).value = data.type;
      (form.querySelector('[name="reference"]') as HTMLInputElement).value = data.reference;
      (form.querySelector('[name="neighborhood"]') as HTMLSelectElement).value = data.neighborhood;
      (form.querySelector('[name="area"]') as HTMLInputElement).value = data.area.toString();
      (form.querySelector('[name="bedrooms"]') as HTMLInputElement).value = data.bedrooms.toString();
      (form.querySelector('[name="parkingSpots"]') as HTMLInputElement).value = data.parkingSpots.toString();
      (form.querySelector('[name="suites"]') as HTMLInputElement).value = data.suites.toString();
      (form.querySelector('[name="bathrooms"]') as HTMLInputElement).value = data.bathrooms.toString();
      (form.querySelector('[name="price"]') as HTMLInputElement).value = data.price;

    } catch (err) {
      setError('Erro ao extrair dados do texto. Verifique se o formato está correto e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const property: Property = {
      type: formData.get('type') as Property['type'],
      reference: formData.get('reference') as string,
      neighborhood: formData.get('neighborhood') as string,
      area: Number(formData.get('area')),
      bedrooms: Number(formData.get('bedrooms')),
      parkingSpots: Number(formData.get('parkingSpots')),
      suites: Number(formData.get('suites')),
      bathrooms: Number(formData.get('bathrooms')),
      price: formatCurrency(formData.get('price') as string),
      condition: formData.get('condition') as Property['condition'],
      state: formData.get('state') as Property['state'],
      nearbyCommerce: formData.get('nearbyCommerce') as string,
      nearbyServices: formData.get('nearbyServices') as string,
      beachDistance: Number(formData.get('beachDistance')),
      images: images.filter(Boolean)
    };

    onSubmit(property);
  };

  return {
    loading,
    error,
    handleParseText,
    handleSubmit,
    formRef,
  };
}