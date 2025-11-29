// src/components/common/ProductCard.tsx

import React from 'react';
import type { Product } from '../../types/product';

// Define props for type safety
interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name, sale_price, images, category } = product;

    // Use the first image or a placeholder
    const displayImage = images && images.length > 0 ? images[0] : 'https://placehold.co/400x400?text=No+Image';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-100 hover:shadow-xl group">

            {/* 🏞️ Image Section */}
            <div className="relative h-64 overflow-hidden bg-gray-50">
                <img
                    src={displayImage}
                    alt={name}
                    className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-90"
                />

                {/* 🏷️ Category Badge */}
                <span className="absolute top-2 right-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider">
                    {category.name}
                </span>
            </div>

            {/* 📝 Details Section */}
            <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-bold text-secondary truncate mb-2" title={name}>
                    {name}
                </h3>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mb-3">
                    <p className="text-2xl font-extrabold text-primary">
                        {parseFloat(sale_price).toFixed(2)} MAD
                    </p>
                    {/* Placeholder for a star rating */}
                    <div className="text-gray-400 text-sm">★★★★★</div>
                </div>

                {/* 🛍️ Action Buttons */}
                <div className="flex space-x-2 mt-2">
                    {/* Add to Cart Button */}
                    <button
                        className="flex-1 bg-gray-100 text-secondary border border-primary hover:bg-primary hover:text-white transition-colors duration-200 py-2 rounded-lg font-semibold text-sm cursor-pointer"
                        onClick={() => console.log('Dispatch addToCart action for ID:', product.id)}
                    >
                        Add to Cart
                    </button>

                    {/* Wishlist Button */}
                    <button
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-200 text-secondary transition-colors duration-200 cursor-pointer"
                        onClick={() => console.log('Dispatch toggleWishlist action for ID:', product.id)}
                        aria-label="Add to Wishlist"
                    >
                        🤍
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;