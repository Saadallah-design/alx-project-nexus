import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProducts } from '../../store/slices/productsSlice';

import ProductCard from '../common/ProductCard';

export default function ProductList() {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-primary">Loading products...</div>
            </div>
        );
    }

    // error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    // success state
    return (
        <div id="products" className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-secondary">Our Collection</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>


            {/* if no items / products found show this */}
            {items.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No products found.
                </div>
            )}
        </div>
    );
}
