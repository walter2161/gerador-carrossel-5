import { Link } from 'lucide-react';

interface PropertyFormImagesProps {
  images: string[];
  imageInputType: 'file' | 'url';
  setImageInputType: (type: 'file' | 'url') => void;
  setImages: (images: string[]) => void;
}

export function PropertyFormImages({
  images,
  imageInputType,
  setImageInputType,
  setImages,
}: PropertyFormImagesProps) {
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

  return (
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
  );
}