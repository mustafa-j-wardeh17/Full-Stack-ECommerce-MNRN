'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ProductSkuForm = ({ productId }: { productId: string }) => {
  const [skuDetails, setSkuDetails] = useState([
    { skuName: '', price: 0, validity: 0, lifetime: false },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSkuChange = <T extends keyof typeof skuDetails[number]>(
    index: number,
    field: T,
    value: typeof skuDetails[number][T]
  ) => {
    const updatedSkus = [...skuDetails];
    updatedSkus[index][field] = value;
    setSkuDetails(updatedSkus);
  };


  const addSku = () => {
    setSkuDetails([...skuDetails, { skuName: '', price: 0, validity: 0, lifetime: false }]);
  };

  const removeSku = (index: number) => {
    const updatedSkus = skuDetails.filter((_, i) => i !== index);
    setSkuDetails(updatedSkus);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}/skus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skuDetails }),
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('SKUs added successfully!');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to add SKUs: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting SKUs:', error);
      toast.error('An error occurred while adding SKUs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-hidden bg-primary-foreground p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add Product SKUs</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {skuDetails.map((sku, index) => (
          <div key={index} className="space-y-4 border-b pb-4 mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">SKU {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeSku(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`skuName-${index}`} className="block text-sm font-medium text-gray-700">
                  SKU Name
                </label>
                <input
                  type="text"
                  id={`skuName-${index}`}
                  value={sku.skuName}
                  onChange={(e) => handleSkuChange(index, 'skuName', e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  id={`price-${index}`}
                  value={sku.price}
                  onChange={(e) => handleSkuChange(index, 'price', parseFloat(e.target.value))}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor={`validity-${index}`} className="block text-sm font-medium text-gray-700">
                  Validity (days)
                </label>
                <input
                  type="number"
                  id={`validity-${index}`}
                  value={sku.validity}
                  onChange={(e) => handleSkuChange(index, 'validity', parseInt(e.target.value, 10))}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                  disabled={sku.lifetime}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`lifetime-${index}`}
                  checked={sku.lifetime}
                  onChange={(e) => handleSkuChange(index, 'lifetime', e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor={`lifetime-${index}`} className="text-sm font-medium text-gray-700">
                  Lifetime
                </label>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addSku}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Another SKU
        </button>

        <button
          type="submit"
          className="w-full bg-primary text-secondary hover:bg-primary/80 font-semibold py-3 rounded-lg shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit SKUs'}
        </button>
      </form>
    </div>
  );
};

export default ProductSkuForm;