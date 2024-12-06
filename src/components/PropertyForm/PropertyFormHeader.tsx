import { useState } from 'react';

interface PropertyFormHeaderProps {
  loading: boolean;
  error: string | null;
  onParse: (text: string) => Promise<void>;
}

export function PropertyFormHeader({ loading, error, onParse }: PropertyFormHeaderProps) {
  const [propertyText, setPropertyText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (propertyText) {
      onParse(propertyText);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">
        Texto do Imóvel
      </label>
      <div className="mt-1 space-y-2">
        <textarea
          value={propertyText}
          onChange={(e) => setPropertyText(e.target.value)}
          rows={5}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Cole aqui o texto com as informações do imóvel..."
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Carregando...' : 'Extrair Informações'}
        </button>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}