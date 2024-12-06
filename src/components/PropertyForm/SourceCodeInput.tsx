import { useState } from 'react';

interface SourceCodeInputProps {
  loading: boolean;
  error: string | null;
  onScrape: (sourceCode: string) => Promise<void>;
}

export function SourceCodeInput({ loading, error, onScrape }: SourceCodeInputProps) {
  const [sourceCode, setSourceCode] = useState('');

  const handleSubmit = () => {
    if (sourceCode) {
      onScrape(sourceCode);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700">
        Código Fonte da Página
      </label>
      <div className="mt-1 space-y-2">
        <textarea
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
          rows={5}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Cole aqui o código fonte da página do imóvel..."
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