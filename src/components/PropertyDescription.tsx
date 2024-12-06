import { Property } from '../types/property';
import { generateDescription } from '../utils/description';
import { Copy } from 'lucide-react';
import { useState } from 'react';

interface PropertyDescriptionProps {
  property: Property;
}

export function PropertyDescription({ property }: PropertyDescriptionProps) {
  const [copied, setCopied] = useState(false);
  const description = generateDescription(property);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Descrição do Imóvel</h2>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copiado!' : 'Copiar Descrição'}
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="whitespace-pre-wrap text-gray-700">{description}</p>
      </div>
    </div>
  );
}