import React from 'react';
import type { Product } from '../../types/product';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addToCart, toggleCart } from '../../store/slices/cartSlice';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();

    // Helper to get the primary image or the first one
    const getProductImage = (product: Product) => {
        // 1. Try to find the primary image in the images array
        if (product.images && product.images.length > 0) {
            const primary = product.images.find(img => img.is_primary);
            if (primary) return primary.image_url;
            return product.images[0].image_url;
        }

        // 2. Fallback to the old 'image' field if it exists (backward compatibility)
        if (product.image) return product.image;

        // 3. Fallback placeholder
        return 'https://placehold.co/300x400?text=No+Image';
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if wrapped in a link
        dispatch(addToCart(product));
        dispatch(toggleCart(true)); // Open cart drawer to show feedback
    };

    return (
        <div className="group relative flex flex-col h-full">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 relative">
                <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                {/* Category Badge */}
                <span className="absolute top-2 right-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider text-left">
                    {product.category.name}
                </span>
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href="#">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 text-left">{product.category.name}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{parseFloat(product.sale_price).toFixed(2)} MAD</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-2 z-10 relative">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    Add to Cart
                </button>
                <button
                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    View Product
                </button>
            </div>
        </div>
    );
}