import { neighborhoods, propertyTypes, propertyConditions, propertyStates } from '../../types/property';

export function PropertyFormFields() {
  return (
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

      {/* Rest of the fields */}
      {/* ... */}
    </div>
  );
}