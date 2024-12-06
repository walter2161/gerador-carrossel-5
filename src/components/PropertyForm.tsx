import { useState, useRef } from 'react';
import { Property, neighborhoods, propertyTypes, propertyConditions, propertyStates } from '../types/property';
import { formatCurrency } from '../utils/format';
import { Link } from 'lucide-react';
import { parsePropertyText } from '../utils/parser';

interface PropertyFormProps {
  onSubmit: (property: Property) => void;
}

export function PropertyForm({ onSubmit }: PropertyFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [imageInputType, setImageInputType] = useState<'file' | 'url'>('file');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [propertyText, setPropertyText] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleParseText = async () => {
    if (!propertyText || !formRef.current) return;

    setLoading(true);
    setError(null);

    try {
      const data = parsePropertyText(propertyText);
      const form = formRef.current;

      // Update form fields with parsed data
      const fields = {
        type: data.type,
        reference: data.reference,
        neighborhood: data.neighborhood,
        area: data.area.toString(),
        bedrooms: data.bedrooms.toString(),
        parkingSpots: data.parkingSpots.toString(),
        suites: data.suites.toString(),
        bathrooms: data.bathrooms.toString(),
        price: data.price,
        condition: data.condition,
        state: data.state
      };

      // Update each form field
      Object.entries(fields).forEach(([key, value]) => {
        const element = form.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLSelectElement;
        if (element) {
          element.value = value;
        }
      });

    } catch (err) {
      setError('Erro ao extrair dados do texto. Verifique se o formato está correto e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const url = e.target.value;
    const newImages = [...images];
    newImages[index] = url;
    setImages(newImages);
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

  return (
    <div className="space-y-6">
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
            onClick={handleParseText}
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

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Imóvel
            </label>
            <select
              name="type"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condição
            </label>
            <select
              name="condition"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              {propertyConditions.map((condition) => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              name="state"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              {propertyStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Referência
            </label>
            <input
              type="text"
              name="reference"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bairro
            </label>
            <select
              name="neighborhood"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              {neighborhoods.map((neighborhood) => (
                <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Área (m²)
            </label>
            <input
              type="number"
              name="area"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quartos
            </label>
            <input
              type="number"
              name="bedrooms"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vagas
            </label>
            <input
              type="number"
              name="parkingSpots"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Suítes
            </label>
            <input
              type="number"
              name="suites"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Banheiros
            </label>
            <input
              type="number"
              name="bathrooms"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Valor
            </label>
            <input
              type="text"
              name="price"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distância da Praia (metros)
            </label>
            <input
              type="number"
              name="beachDistance"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Comércios Próximos
            </label>
            <textarea
              name="nearbyCommerce"
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: supermercados, farmácias, padarias..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Serviços Próximos
            </label>
            <textarea
              name="nearbyServices"
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: escolas, hospitais, academias..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Imagens do Imóvel</h3>
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-700">Método de Upload:</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setImageInputType('file')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    imageInputType === 'file'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Arquivo
                </button>
                <button
                  type="button"
                  onClick={() => setImageInputType('url')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    imageInputType === 'url'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  URL
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Imagem {index + 1}
                </label>
                
                {imageInputType === 'file' ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                    required={index === 0}
                  />
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://"
                      value={images[index] || ''}
                      onChange={(e) => handleImageUrlChange(e, index)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                        focus:border-blue-500 focus:ring-blue-500 text-sm"
                      required={index === 0}
                    />
                    {images[index] && (
                      <button
                        type="button"
                        onClick={() => window.open(images[index], '_blank')}
                        className="mt-1 p-2 text-blue-600 hover:text-blue-700"
                        title="Abrir imagem"
                      >
                        <Link className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {images[index] && (
                  <img
                    src={images[index]}
                    alt={`Preview ${index + 1}`}
                    className="mt-2 w-full h-32 object-cover rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

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